import vine from '@vinejs/vine'

export const transferValidator = vine.compile(
  vine.object({
    amount: vine.number().positive(),
    currency: vine.enum(['USD', 'EUR', 'JPY']).optional(),
    fromAccountId: vine.string().uuid(),
    toAccountId: vine.string().uuid(),
    description: vine.string().optional(),
  })
)
