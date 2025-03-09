import vine from '@vinejs/vine'

export const storeValidator = vine.compile(
  vine.object({
    currency: vine.enum(['USD', 'EUR', 'JPY']),
  })
)

export const updateValidator = vine.compile(
  vine.object({
    currency: vine.enum(['USD', 'EUR', 'JPY']),
  })
)
