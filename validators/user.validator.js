import Joi from 'joi'




const updateUserSchema = Joi.object({
    userName: Joi.string().optional(),
    phone: Joi.string().min(10).max(11).optional()
})







export {
    updateUserSchema
}