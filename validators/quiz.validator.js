import Joi from "joi";

const addQuizSchema = Joi.object({
    title: Joi.string().required(),
    duration: Joi.number().required(),
    lesson_id: Joi.number().required()
})

const addQuestionSchema = Joi.object({
    question_text: Joi.string().required(),
    options: Joi.array().max(4).required(),
    correct_answer: Joi.string().required(),
    quiz_id: Joi.number().required()
})


const addQuizResultSchema = Joi.object({
    score: Joi.number().required(),
    totalQuestions: Joi.number().required(),
    correctAnswers: Joi.number().required(),
    incorrectAnswers: Joi.number().required(),
    completionTime: Joi.number().required(),
})



export {
    addQuizSchema,
    addQuestionSchema,
    addQuizResultSchema
}