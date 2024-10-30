import Joi from "joi";

const addSectionSchema = Joi.object({
    course_id: Joi.number().required(),
    title: Joi.string().required()
})

const updateSectionSchema = Joi.object({
    title: Joi.string().required()
})



export {
    addSectionSchema,
    updateSectionSchema
}