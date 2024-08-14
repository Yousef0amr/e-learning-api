import Joi from "joi";

const addCourseSchema = Joi.object({
    category_id: Joi.number().required(),
    title: Joi.string().min(1).max(255).required(),
    description: Joi.string().required(),
    price: Joi.number().positive().required(),
    poster_img: Joi.string().optional()
})











export {
    addCourseSchema
}