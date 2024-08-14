import Joi from "joi";

const addLessonSchema = Joi.object({
    section_id: Joi.number().integer().positive(),
    title: Joi.string().min(1).max(255).required(),
})











export {
    addLessonSchema
}