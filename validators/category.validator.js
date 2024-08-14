import Joi from "joi";

const addCategorySchema = Joi.object({
    name: Joi.string().required(),
    level_id: Joi.number().required()
})











export {
    addCategorySchema
}