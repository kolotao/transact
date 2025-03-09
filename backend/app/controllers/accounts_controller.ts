import Account from '#models/account'
import Transaction from '#models/transaction'
import User from '#models/user'
import { storeValidator, updateValidator } from '#validators/account'
import { ResponseStatus, type HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'
import { v4 as uuidv4 } from 'uuid'

export default class AccountsController {
  /**
   * /accounts
   * @description Get all accounts for the authenticated user
   * @get accounts
   * @success 200 {accounts: Account[]}
   */
  public async index({ auth, response }: HttpContext) {
    const user = auth.user

    if (!user) return response.status(ResponseStatus.NotFound).json({ error: 'USER_NOT_FOUND' })
    await user.load('accounts')
    return user.accounts
  }

  /**
   * /accounts
   * @description Create a new account
   * @post accounts
   * @success 201 {account: Account}
   * @error 400 VALIDATION_FAILURE
   * @error 404 USER_NOT_FOUND
   * @error 500 INTERNAL_SERVER_ERROR
   */
  public async store({ request, auth, response }: HttpContext) {
    const user = auth.user
    if (!user) return response.status(ResponseStatus.NotFound).json({ error: 'USER_NOT_FOUND' })

    const { currency } = await request.validateUsing(storeValidator)

    const trx = await db.transaction()
    try {
      const newAccountId = uuidv4()
      const newAccount = await Account.create(
        {
          id: newAccountId,
          ownerId: user.id,
          currency,
          balance: 0,
        },
        { client: trx }
      )

      const bankUser = await User.findBy('email', 'bank@example.com')
      if (!bankUser) {
        await trx.commit()
        return newAccount
      }
      const bankAccount = await Account.query({ client: trx })
        .where('owner_id', bankUser.id)
        .where('currency', currency)
        .first()

      const amount = 100

      if (!bankAccount || bankAccount.balance < amount) {
        await trx.commit()
        return newAccount
      }

      bankAccount.balance -= amount
      await bankAccount.save()

      const toAccount = await Account.query({ client: trx }).where('id', newAccountId).first()
      if (toAccount) {
        toAccount.balance += amount
        await toAccount.save()
      }

      await Transaction.create(
        {
          fromAccountId: bankAccount.id,
          toAccountId: newAccountId,
          amount,
          currency,
          description: 'Initial deposit from Bank Account',
        },
        { client: trx }
      )

      await trx.commit()

      return toAccount || newAccount
    } catch (error) {
      console.log('error', error)
      await trx.rollback()
      return response
        .status(ResponseStatus.InternalServerError)
        .json({ error: 'INTERNAL_SERVER_ERROR' })
    }
  }

  /**
   * /accounts/:id
   * @description Get an account by ID
   * @get accounts
   * @success 200 {account: Account}
   * @error 404 ACCOUNT_NOT_FOUND
   */
  public async show({ params, auth, response }: HttpContext) {
    const user = auth.user!
    const account = await Account.query()
      .where('id', params.id)
      .andWhere('ownerId', user.id)
      .preload('outgoingTransactions')
      .preload('incomingTransactions')
      .firstOrFail()

    if (!account)
      return response.status(ResponseStatus.NotFound).json({ error: 'ACCOUNT_NOT_FOUND' })

    return account
  }
  /**
   * /accounts/:id
   * @description Update an account by ID
   * @put accounts
   * @success 200 {account: Account}
   * @error 404 ACCOUNT_NOT_FOUND
   */
  public async update({ params, request, auth }: HttpContext) {
    const user = auth.user!
    const account = await Account.query()
      .where('id', params.id)
      .andWhere('ownerId', user.id)
      .firstOrFail()

    if (!account) return ['ACCOUNT_NOT_FOUND', ResponseStatus.NotFound]
    const { currency } = await request.validateUsing(updateValidator)

    account.merge({ currency })
    await account.save()
    return account
  }

  /**
   * /accounts/:id
   * @description Delete an account by ID
   * @delete accounts
   * @success 204
   * @error 404 ACCOUNT_NOT_FOUND
   */
  public async destroy({ params, auth }: HttpContext) {
    const user = auth.user!
    const account = await Account.query()
      .where('id', params.id)
      .andWhere('ownerId', user.id)
      .firstOrFail()

    if (!account) return ['ACCOUNT_NOT_FOUND', ResponseStatus.NotFound]

    await account.delete()
    return null
  }
}
