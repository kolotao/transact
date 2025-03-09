import Account from '#models/account'
import Transaction from '#models/transaction'
import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class StatsController {
  /**
   * Return statistics about the application
   * GET /api/stats
   */
  async index({}: HttpContext) {
    const totalUsers = await User.query().count('* as total')
    const totalTransactions = await Transaction.query().count('* as total')
    const totalAccounts = await Account.query().count('* as total')

    const numUsers = totalUsers[0].$extras.total
    const numTx = totalTransactions[0].$extras.total
    const numAccounts = totalAccounts[0].$extras.total

    return {
      totalUsers: Number(numUsers),
      totalTransactions: Number(numTx),
      totalAccounts: Number(numAccounts),
    }
  }
}
