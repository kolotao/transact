import Account from '#models/account'
import ExchangeRate from '#models/exchange_rate'
import Transaction from '#models/transaction'
import User from '#models/user'
import { transferValidator } from '#validators/transaction'
import { ResponseStatus, type HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class TransactionsController {
  /**
   * /transactions
   * @description Get all transactions for the authenticated user
   * @get transactions
   * @success 200 {transactions: Transaction[]}
   */
  public async index({ auth }: HttpContext) {
    const userId = auth.user!.id
    const userAccounts = await Account.query().where('owner_id', userId).select('id')
    const userAccountIds = userAccounts.map((account) => account.id)

    const transactions = await Transaction.query()
      .whereIn('from_account_id', userAccountIds)
      .orWhereIn('to_account_id', userAccountIds)
      .preload('fromAccount')
      .preload('toAccount')
      .orderBy('created_at', 'desc')

    return transactions
  }

  /**
   * /transactions/:id
   * @description Get a transaction by ID
   * @get transactions
   * @success 200 {transaction: Transaction}
   * @error 404 TRANSACTION_NOT_FOUND
   */
  public async show({ params }: HttpContext) {
    const transaction = await Transaction.query()
      .where('id', params.id)
      .preload('fromAccount')
      .preload('toAccount')
      .first()

    if (!transaction) return ['TRANSACTION_NOT_FOUND', ResponseStatus.NotFound]

    return transaction
  }

  /**
   * /transactions/get-by-user/:id
   * @description Get a transactions by user ID
   * @get transactions
   * @success 200 {transactions: Transaction[]}
   * @error 404 TRANSACTIONS_NOT_FOUND
   * @error 404 USER_NOT_FOUND
   */
  public async getByUser({ params }: HttpContext) {
    const user = await User.query().where('id', params.id).first()

    if (!user) return ['USER_NOT_FOUND', ResponseStatus.NotFound]

    const userAccounts = await Account.query().where('owner_id', params.id).select('id')
    const userAccountIds = userAccounts.map((account) => account.id)

    if (userAccountIds.length === 0) return ['TRANSACTIONS_NOT_FOUND', ResponseStatus.NotFound]

    const transactions = await Transaction.query()
      .whereIn('from_account_id', userAccountIds)
      .orWhereIn('to_account_id', userAccountIds)
      .preload('fromAccount')
      .preload('toAccount')
      .orderBy('created_at', 'desc')

    if (transactions.length === 0) return ['TRANSACTIONS_NOT_FOUND', ResponseStatus.NotFound]

    return transactions
  }

  /**
   * /transactions/transfer
   * @description Transfer funds between two accounts
   * @post transactions
   * @success 200 {transaction: Transaction}
   * @error 400 SAME_ACCOUNT
   * @error 400 ACCOUNT_NOT_FOUND
   * @error 400 INSUFFICIENT_FUNDS
   * @error 500 INTERNAL_SERVER_ERROR
   */
  public async transfer({ request, auth }: HttpContext) {
    const userId = auth.user!.id
    const { fromAccountId, toAccountId, amount, description } =
      await request.validateUsing(transferValidator)

    if (fromAccountId === toAccountId) return ['SAME_ACCOUNT', ResponseStatus.BadRequest]

    const trx = await db.transaction()

    try {
      const fromAccount = await Account.query({ client: trx })
        .where('id', fromAccountId)
        .where('owner_id', userId)
        .forUpdate()
        .first()

      const toAccount = await Account.query({ client: trx }).where('id', toAccountId).first()

      if (!fromAccount || !toAccount) {
        await trx.rollback()
        return ['ACCOUNT_NOT_FOUND', ResponseStatus.NotFound]
      }

      if (Number(fromAccount.balance) < Number(amount)) {
        await trx.rollback()
        return ['INSUFFICIENT_FUNDS', ResponseStatus.BadRequest]
      }

      // Convert the amount to the target currency
      let creditedAmount = Number(amount)
      if (fromAccount.currency !== toAccount.currency) {
        const fromCur = fromAccount.currency
        const toCur = toAccount.currency

        // Search e.g. EUR->USD
        const exchange = await ExchangeRate.query({ client: trx })
          .where('from_currency', fromCur)
          .where('to_currency', toCur)
          .first()

        if (!exchange) {
          await trx.rollback()
          return ['RATE_NOT_FOUND', ResponseStatus.BadRequest]
        }

        creditedAmount = Number(amount) * Number(exchange.rate)
      }

      fromAccount.balance = Number(fromAccount.balance) - Number(amount)
      toAccount.balance = Number(toAccount.balance) + Number(creditedAmount)

      await fromAccount.save()
      await toAccount.save()

      const transaction = await Transaction.create(
        {
          fromAccountId,
          toAccountId,
          amount,
          currency: fromAccount.currency,
          description,
        },
        { client: trx }
      )

      await trx.commit()
      return transaction
    } catch (error) {
      await trx.rollback()
      return ['INTERNAL_SERVER_ERROR', ResponseStatus.InternalServerError]
    }
  }
}
