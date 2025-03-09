import { DateTime } from 'luxon'
import { v4 as uuidv4 } from 'uuid'
import { BaseModel, beforeCreate, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import hash from '@adonisjs/core/services/hash'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { compose } from '@adonisjs/core/helpers'
import Account from './account.js'

type Model = User

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare firstName: string | null

  @column()
  declare lastName: string | null

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @hasMany(() => Account, {
    foreignKey: 'ownerId',
  })
  public accounts!: HasMany<typeof Account>

  /** * * * * * * * * * * * * * * * * * * * *
   * HOOKS
   */

  /**
   * hook before create
   * @param ressource - The instance being created.
   *
   * Desctiption: Generate a unique ID and set a default values before creating a new record.
   */
  @beforeCreate()
  public static async beforeCreateHook(ressource: Model) {
    ressource.id ??= uuidv4()
  }
}
