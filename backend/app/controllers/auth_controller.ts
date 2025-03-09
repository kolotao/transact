import User from '#models/user'
import { loginValidator, registerValidator } from '#validators/auth'
import { ResponseStatus, type HttpContext } from '@adonisjs/core/http'
import { v4 as uuidv4 } from 'uuid'

export default class AuthController {
  /**
   * /auth/register
   * @description Register a new user
   * @post users
   * @middleware auth
   * @success 201 {user: User}
   * @error 400 VALIDATION_FAILURE
   * @error 403 USER_ALREADY_EXISTS
   */
  public async register({ request, auth, response }: HttpContext) {
    const data = await request.validateUsing(registerValidator)

    const existingUser = await User.query().where('email', data.email).first()
    if (existingUser)
      return response.status(ResponseStatus.Forbidden).json({ error: 'USER_ALREADY_EXISTS' })

    const user = await User.create({ id: uuidv4(), ...data })

    await auth.use('web').login(user)

    return {
      user,
    }
  }

  /**
   * /auth/login
   * @description Log in a user
   * @post users
   * @success 200 {user: User}
   * @error 400 VALIDATION_FAILURE
   * @error 401 INVALID_CREDENTIALS
   * @error 500 SERVER_ERROR
   */
  public async login({ request, auth, response }: HttpContext) {
    try {
      const { email, password } = await request.validateUsing(loginValidator)
      const user = await User.verifyCredentials(email, password)
      await auth.use('web').login(user)
      if (!user) return response.status(401).json({ error: 'INVALID_CREDENTIALS' })
      return { user }
    } catch (error) {
      if (error.code === 'E_INVALID_CREDENTIALS') {
        return response.status(401).json({ error: 'INVALID_CREDENTIALS' })
      }

      return response.status(500).json({ error: 'SERVER_ERROR' })
    }
  }

  /**
   * /auth/logout
   * @description Log out a user
   * @delete users
   * @success 204
   */
  public async logout({ auth }: HttpContext) {
    await auth.use('web').logout()
    return null
  }

  /**
   * /auth/me
   * @description Get the current user
   * @get users
   * @success 200 {user: User}
   */
  public async me({ auth }: HttpContext) {
    return {
      user: auth.user,
    }
  }
}
