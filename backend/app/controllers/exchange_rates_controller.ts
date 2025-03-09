import ExchangeRate from '#models/exchange_rate'
import type { HttpContext } from '@adonisjs/core/http'

export default class ExchangeRatesController {
  /**
   * GET /api/exchange-rates
   * @description Returns the entire list of exchange rates
   * @noAuth
   */
  public async index({}: HttpContext) {
    const rates = await ExchangeRate.all()
    return rates
  }
}
