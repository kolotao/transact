import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  /**
   * Display a list of Users.
   * GET /api/users
   */
  async index({}: HttpContext) {
    const users = await User.query().preload('accounts')
    return users
  }
}
