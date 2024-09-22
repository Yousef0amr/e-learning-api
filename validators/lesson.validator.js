import Joi from "joi";

const addLessonSchema = Joi.object({
    section_id: Joi.number().integer().positive(),
    title: Joi.string().min(1).max(255).required(),
})



const addNoteSchema = Joi.object({
    title: Joi.string().min(1).max(255).required(),
    content: Joi.string().required(),
    lesson_id: Joi.number().required()
})




export {
    addLessonSchema,
    addNoteSchema
}