import quizService from '../services/quiz.service.js';
import ApiError, { success } from '../utils/apiResponse.js';
import wrap from 'express-async-wrap';

const addQuiz = wrap(async (req, res, next) => {
    const quiz = await quizService.addQuiz(req.body);
    return success(res, quiz, 201, 'Quiz created successfully');
});


const addQuizResult = wrap(async (req, res, next) => {
    const quizReultDto = {
        ...req.body,
        quiz_id: req.params.id,
        user_id: req.user_id
    }
    const quizReult = await quizService.addQuizResult(quizReultDto);
    return success(res, quizReult, 201, 'quizReult created successfully');
});


const addQuestion = wrap(async (req, res, next) => {
    const quiz = await quizService.addQuestion(req.body);
    return success(res, quiz, 201, 'Question created successfully');
});

const updateQuiz = wrap(async (req, res, next) => {
    const quiz = await quizService.getQuiz(req.params.id);
    if (!quiz) return next(new ApiError('Quiz not found', 404));
    const updatedQuiz = await quizService.updateQuiz(req.body, req.params.id);
    return success(res, { quiz: updatedQuiz }, 200);
});

const updateQuestion = wrap(async (req, res, next) => {
    const updatedQuiz = await quizService.updateQuestion(req.body, req.params.id);
    return success(res, { quiz: updatedQuiz }, 200);
});

const deleteQuiz = wrap(async (req, res, next) => {
    const quiz = await quizService.getQuiz(req.params.id);
    if (!quiz) return next(new ApiError('Quiz not found', 404));
    await quizService.deleteQuiz(req.params.id);
    return success(res, { quiz }, 200);
});


const deleteQuestion = wrap(async (req, res, next) => {
    await quizService.deleteQuestion(req.params.id);
    return success(res, { quiz }, 200);
});

const getQuiz = wrap(async (req, res, next) => {
    const quiz = await quizService.getQuiz(req.params.id);
    return success(res, { quiz }, 200);
});


const getAllQuizzes = wrap(async (req, res, next) => {
    const quizzes = await quizService.getAllQuizzes(req.query.id, req.user_id);
    return success(res, { quizzes }, 200);
});

export {
    addQuiz,
    updateQuiz,
    deleteQuiz,
    getAllQuizzes,
    addQuestion,
    deleteQuestion,
    updateQuestion,
    getQuiz,
    addQuizResult

};
