import Joi from "joi"



const fileSchema = Joi.array().items({
    fieldname: Joi.string().required(),
    originalname: Joi.string().required(),
    encoding: Joi.string().required(),
    mimetype: Joi.string().required(),
    buffer: Joi.any().required(),
    size: Joi.number().required(),
})


export default fileSchema