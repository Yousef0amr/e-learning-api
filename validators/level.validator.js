import Joi from "joi";

const addLevelSchema = Joi.object({
    name: Joi.string().min(1).max(255).required(),
    description: Joi.string().required(),
    poster_img: Joi.string().optional()
})











export {
    addLevelSchema
}