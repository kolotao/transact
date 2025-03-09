import Account from '#models/account'
import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

/**
 * Seeder for the main user
 * This user is used to create accounts for the bank system and transfer money for the users
 */
export default class extends BaseSeeder {
  async run() {
    const existingBank = await User.findBy('email', 'bank@example.com')
    if (!existingBank) {
      await User.create({
        email: 'bank@example.com',
        password: 'secret',
        firstName: 'Bank',
        lastName: 'System',
      })

      const user = await User.findBy('email', 'bank@example.com')

      if (!user) return

      await Account.create({
        ownerId: user.id,
        currency: 'EUR',
        balance: 10000000000,
      })

      await Account.create({
        ownerId: user.id,
        currency: 'USD',
        balance: 10000000000,
      })

      await Account.create({
        ownerId: user.id,
        currency: 'JPY',
        balance: 10000000000,
      })
    }
  }
}
