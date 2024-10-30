import QAService from '../services/qa.service.js';
import ApiError, { success } from '../utils/apiResponse.js';
import wrap from 'express-async-wrap';

const getAllQuestions = wrap(
    async (req, res) => {
        const questions = await QAService.getAllQuestions(req.params.id, req.query.page, req.query.limit);
        return success(res, questions, 200, 'Questions fetched successfully');
    }
);

const getAllAnswers = wrap(
    async (req, res) => {
        const answers = await QAService.getAllAnswers(req.params.id, req.query.page, req.query.limit);
        return success(res, answers, 200, 'Answers fetched successfully');
    }
);

const addQuestion = wrap(
    async (req, res) => {
        // Retrieve user_id and username
        const { user_id, username } = req;

        const newQuestion = await QAService.addQuestion({
            lesson_id: req.params.id,
            user_id,
            question: req.body.question,
        });

        req.io.to(`lesson_${req.params.id}`).emit('newQuestion', { lesson_id: req.params.id, createdAt: newQuestion.createdAt, question: newQuestion.question, lesson_question_id: newQuestion.lesson_question_id, username });

        return success(res, { question: newQuestion }, 201, 'Question added successfully');
    }
);

const addAnswer = wrap(
    async (req, res) => {
        const { user_id, username } = req;

        const newAnswer = await QAService.addAnswer({
            lesson_question_id: req.params.id,
            user_id,
            answer: req.body.answer,
        });

        req.io.to(`lesson_${req.body.lesson_id}`).emit('newAnswer', {
            answer: newAnswer,
            username
        });

        return success(res, { answer: newAnswer }, 201, 'Answer added successfully');
    }
);

const updateQuestion = wrap(
    async (req, res) => {
        const updatedQuestion = await QAService.updateQuestion(req.body, req.params.id);

        req.io.to(`lesson_${req.params.id}`).emit('updateQuestion', updatedQuestion[1][0]);
        return success(res, { question: updatedQuestion[1][0] }, 200, 'Question updated successfully');
    }
);

const deleteQuestion = wrap(
    async (req, res) => {
        const deletedCount = await QAService.deleteQuestion(req.params.id);

        req.io.to(`lesson_${req.params.id}`).emit('deleteQuestion', { id: req.params.id });
        return success(res, {}, 200, 'Question deleted successfully');
    }
);

const updateAnswer = wrap(
    async (req, res) => {
        const updatedAnswer = await QAService.updateAnswer(req.body, req.params.id);

        req.io.to(`lesson_${req.params.id}`).emit('updateAnswer', updatedAnswer[1][0]);
        return success(res, { answer: updatedAnswer[1][0] }, 200, 'Answer updated successfully');
    }
);

const deleteAnswer = wrap(
    async (req, res) => {
        const deletedCount = await QAService.deleteAnswer(req.params.id);

        req.io.to(`lesson_${req.params.id}`).emit('deleteAnswer', { id: req.params.id });
        return success(res, {}, 200, 'Answer deleted successfully');
    }
);

export {
    getAllQuestions,
    addQuestion,
    addAnswer,
    updateQuestion,
    deleteQuestion,
    updateAnswer,
    deleteAnswer,
    getAllAnswers
};
