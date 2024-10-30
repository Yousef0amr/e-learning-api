import { Router } from "express";
import { addQuestion, addQuiz, addQuizResult, deleteQuestion, deleteQuiz, getAllQuizzes, getQuiz, updateQuestion, updateQuiz, } from "../controllers/quiz.controller.js";
import validateRequest from "../middlewares/validateRequest.js";
import { addQuestionSchema, addQuizSchema, addQuizResultSchema } from "../validators/quiz.validator.js";

const quizRouter = Router();

quizRouter.route('/')
    .post(validateRequest(addQuizSchema), addQuiz)
    .get(getAllQuizzes)

quizRouter.route('/results/:id')
    .post(validateRequest(addQuizResultSchema), addQuizResult)

quizRouter.route('/:id')
    .get(getQuiz)
    .patch(validateRequest(addQuizSchema), updateQuiz)

    .delete(deleteQuiz);

quizRouter.route('/questions')
    .post(validateRequest(addQuestionSchema), addQuestion);

quizRouter.route('/questions/:id')
    .delete(deleteQuestion)
    .patch(updateQuestion);


export default quizRouter;
