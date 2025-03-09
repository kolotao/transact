import { DateTime } from 'luxon'
import { v4 as uuidv4 } from 'uuid'
import { BaseModel, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Account from './account.js'

type Model = Transaction

export default class Transaction extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  public fromAccountId!: string

  @column()
  public toAccountId!: string

  @column()
  public amount!: number

  @column()
  public currency!: string

  @column()
  public description?: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Account, {
    foreignKey: 'fromAccountId',
  })
  public fromAccount!: BelongsTo<typeof Account>

  @belongsTo(() => Account, {
    foreignKey: 'toAccountId',
  })
  public toAccount!: BelongsTo<typeof Account>

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
