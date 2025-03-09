/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const AuthController = () => import('#controllers/auth_controller')
const TransactionsController = () => import('#controllers/transactions_controller')
const AccountsController = () => import('#controllers/accounts_controller')
const ExchangeRatesController = () => import('#controllers/exchange_rates_controller')
const UsersController = () => import('#controllers/users_controller')
const StatsController = () => import('#controllers/stats_controller')
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

router.get('/', async () => {
  return {
    server: 'launched',
  }
})

router
  .group(() => {
    // Auth
    router.post('register', [AuthController, 'register'])
    router.post('login', [AuthController, 'login'])
    router.delete('logout', [AuthController, 'logout'])

    // Exchange rates
    router.get('exchange-rates', [ExchangeRatesController, 'index'])

    // Users
    router.get('users', [UsersController, 'index'])

    // Stats
    router.get('stats', [StatsController, 'index'])

    // Authenticated routes
    router
      .group(() => {
        router.get('me', [AuthController, 'me'])

        // Accounts
        router.get('accounts', [AccountsController, 'index'])
        router.post('accounts', [AccountsController, 'store'])
        router.get('accounts/:id', [AccountsController, 'show'])
        router.put('accounts/:id', [AccountsController, 'update'])

        // Transactions
        router.post('transactions/transfer', [TransactionsController, 'transfer'])
        router.get('transactions', [TransactionsController, 'index'])
        router.get('transactions/:id', [TransactionsController, 'show'])
        router.get('transactions/get-by-user/:id', [TransactionsController, 'getByUser'])
      })
      .middleware(middleware.auth())
  })
  .prefix('api')
