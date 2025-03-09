import ExchangeRate from '#models/exchange_rate'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await ExchangeRate.createMany([
      // USD -> USD (1.0)
      { fromCurrency: 'USD', toCurrency: 'USD', rate: 1.0 },
      // EUR -> USD. For example, 1 EUR = 1.10 USD
      { fromCurrency: 'EUR', toCurrency: 'USD', rate: 1.1 },
      // EUR -> EUR (1.0)
      { fromCurrency: 'EUR', toCurrency: 'EUR', rate: 1 },
      // USD -> EUR. Inversely, 1 USD = 0.909 EUR
      { fromCurrency: 'USD', toCurrency: 'EUR', rate: 0.909 },
      // JPY -> USD. For example, 1 JPY = 0.0074 USD
      { fromCurrency: 'JPY', toCurrency: 'USD', rate: 0.0074 },
      // JPY -> JPY (1.0)
      { fromCurrency: 'JPY', toCurrency: 'JPY', rate: 1.0 },
      // USD -> JPY. Inversely, 1 USD = 135.14 JPY
      { fromCurrency: 'USD', toCurrency: 'JPY', rate: 135.14 },
      // EUR -> JPY. For example, 1 EUR = 135.14 * 0.909
      { fromCurrency: 'EUR', toCurrency: 'JPY', rate: 135.14 * 0.909 },
      // JPY -> EUR. Inversely, 1 JPY = 1 / (135.14 * 0.909) EUR
      { fromCurrency: 'JPY', toCurrency: 'EUR', rate: 1 / (135.14 * 0.909) },
    ])
  }
}
