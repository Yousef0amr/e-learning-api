
import { Op } from 'sequelize';
import model from './../models/index.js';
const { Quiz, Question, QuizResult } = model

const getQuiz = async (id) => {
    return await Quiz.findByPk(id, {
        include: [{
            model: Question,
            as: 'questions'
        }]
    })
}

const getAllQuizzes = async (id, user_id) => {
    return await Quiz.findAll({
        where: {
            lesson_id: {
                [Op.eq]: id
            }
        },
        include: {
            model: QuizResult,
            as: 'quizResults',
            required: false,
            where: {
                user_id: {
                    [Op.eq]: user_id
                }

            },
            attributes: { exclude: ['user_id', 'quiz_id'] }
        }
    })
}

const addQuiz = async (quizDto) => {
    return await Quiz.create({ ...quizDto })
}

const addQuizResult = async (quizResultDto) => {

    const quizResult = await QuizResult.findOne({
        where: {
            user_id: {
                [Op.eq]: quizResultDto.user_id
            },
            quiz_id: {
                [Op.eq]: quizResultDto.quiz_id
            }
        }
    })

    if (quizResult) {
        quizResult.update({ ...quizResultDto })
        return await quizResult.save()
    }

    return await QuizResult.create({ ...quizResultDto })
}

const getAllQuizzesResults = async (id) => {
    return await QuizResult.findAll({
        where: {
            user_id: {
                [Op.eq]: id
            }
        }
    })
}


const updateQuiz = async (updateQuizDto, id) => {
    return await Quiz.update(
        {
            ...updateQuizDto
        }
        , {
            where: {
                quiz_id: {
                    [Op.eq]: id
                }
            }
        })
}



const deleteQuiz = async (id) => {
    return await Quiz.destroy({
        where: {
            quiz_id: {
                [Op.eq]: id
            }
        }
    })
}


const addQuestion = async (questionDto) => {
    return await Question.create({ ...questionDto })
}

const updateQuestion = async (updateQuestionDto, id) => {
    return await Question.update(
        {
            ...updateQuestionDto
        }
        , {
            where: {
                question_id: {
                    [Op.eq]: id
                }
            }
        })
}



const deleteQuestion = async (id) => {
    return await Question.destroy({
        where: {
            question_id: {
                [Op.eq]: id
            }
        }
    })
}








const quizService = {
    addQuiz,
    getAllQuizzes,
    getQuiz,
    updateQuiz,
    deleteQuiz,
    addQuestion,
    updateQuestion,
    deleteQuestion,
    addQuizResult
}

export default quizService




