import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column } from '@adonisjs/lucid/orm'
import { v4 as uuidv4 } from 'uuid'

type Model = ExchangeRate

export default class ExchangeRate extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  public fromCurrency!: string

  @column()
  public toCurrency!: string

  @column()
  public rate!: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

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
