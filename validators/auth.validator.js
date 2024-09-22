import Joi from 'joi'


const registerSchema = Joi.object({
    userName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    phone: Joi.string().min(10).max(11).required(),
    role: Joi.string().valid('User', 'Admin').optional()
})

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
})

const loginAdminSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    role: Joi.string().valid('Admin').required()
})


const checkEmailSchema = Joi.object({
    email: Joi.string().email().required()
})

const verifyEmailSchema = Joi.object({
    secret: Joi.string().required(),
    token: Joi.string().length(6).required()
})

const resetPasswordSchema = Joi.object({
    email: Joi.string().email().required(),
    newPassword: Joi.string().required()
})


const changePasswordSchema = Joi.object({
    newPassword: Joi.string().required(),
    oldPassword: Joi.string().required()
})



export {
    registerSchema,
    loginSchema,
    checkEmailSchema,
    verifyEmailSchema,
    resetPasswordSchema,
    changePasswordSchema,
    loginAdminSchema
}