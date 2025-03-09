import { DateTime } from 'luxon'
import { v4 as uuidv4 } from 'uuid'
import { BaseModel, beforeCreate, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import Transaction from './transaction.js'

type Model = Account
type Currency = 'USD' | 'EUR' | 'JPY'

export default class Account extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  public ownerId!: string

  @column()
  public currency!: Currency

  @column()
  public balance!: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User, {
    foreignKey: 'ownerId',
  })
  public owner!: BelongsTo<typeof User>

  @hasMany(() => Transaction, {
    foreignKey: 'fromAccountId',
  })
  public outgoingTransactions!: HasMany<typeof Transaction>

  @hasMany(() => Transaction, {
    foreignKey: 'toAccountId',
  })
  public incomingTransactions!: HasMany<typeof Transaction>

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
