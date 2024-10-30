import Joi from 'joi'




const updateUserSchema = Joi.object({
    userName: Joi.string().optional(),
    phone: Joi.string().min(10).max(11).optional()
})

const chargeCodeSchema = Joi.object({
    code: Joi.string().min(11).max(11).required()
})

const addChargeCodeSchema = Joi.object({
    chargeAmount: Joi.number().required()
})

const payWithWalletSchema = Joi.object({
    amount: Joi.number().required(),
    course_id: Joi.number().required()
})


export {
    updateUserSchema,
    chargeCodeSchema,
    addChargeCodeSchema,
    payWithWalletSchema
}