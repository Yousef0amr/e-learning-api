
import { Op } from 'sequelize';
import model from './../models/index.js';
const { LessonQuestion, LessonAnswer, User } = model

const getQuestion = async (id) => {
    return await LessonQuestion.findByPk(id)

}


const getAnswer = async (id) => {
    return await LessonAnswer.findByPk(id)

}

const getAllQuestions = async (id, page = 1, limit = 5) => {
    const offset = (page - 1) * limit;

    // Fetch the total count of questions
    const totalQuestions = await LessonQuestion.count({
        where: {
            lesson_id: {
                [Op.eq]: id
            }
        }
    });

    // Calculate the total number of pages
    const totalPages = Math.ceil(totalQuestions / limit);

    // Check if there are more pages
    const hasMore = page < totalPages;

    // Fetch the paginated questions
    const questions = await LessonQuestion.findAll({
        limit,
        offset,
        where: {
            lesson_id: {
                [Op.eq]: id
            }
        },
        attributes: { exclude: ['updatedAt', 'lesson_id', 'user_id'] },
        include: [
            {
                model: User,
                as: 'user',
                attributes: ['userName'],
            }
        ],
        order: [['createdAt', 'DESC']]
    });

    return {
        questions,
        pagination: {
            page,
            totalPages,
            hasMore,
        }
    };
};


const getAllAnswers = async (id, page = 1, limit = 5) => {
    const offset = (page - 1) * limit;

    // Fetch the total count of questions
    const totalQuestions = await LessonAnswer.count({
        where: {
            lesson_question_id: {
                [Op.eq]: id
            }
        }
    });

    // Calculate the total number of pages
    const totalPages = Math.ceil(totalQuestions / limit);

    // Check if there are more pages
    const hasMore = page < totalPages;

    const answers = await LessonAnswer.findAll({
        limit,
        offset,
        where: {
            lesson_question_id: {
                [Op.eq]: id
            }
        },
        attributes: { exclude: ['updatedAt', 'user_id'] },
        include: [
            {
                model: User,
                as: 'user',
                attributes: ['userName'],
            }
        ],
        order: [['createdAt', 'DESC']]
    })

    return {
        answers,
        pagination: {
            page,
            totalPages,
            hasMore,
        }
    };
}

const addQuestion = async (QuestionDto) => {
    return await LessonQuestion.create({ ...QuestionDto }, {
        include: [{
            model: LessonAnswer,
            required: false,
            as: 'lesson_answers'
        }],
        attributes: { exclude: ['udaptedAt', 'lesson_id', 'user_id'] }
    })
}

const addAnswer = async (AnswerDto) => {
    return await LessonAnswer.create({ ...AnswerDto }, { attributes: { exclude: ['udaptedAt', 'user_id'] } })
}

const updateQuestion = async (updateDto, id) => {
    return await LessonQuestion.update(
        {
            ...updateDto
        }
        , {
            where: {
                lesson_question_id: {
                    [Op.eq]: id
                }
            },

        })
}



const deleteQuestion = async (id) => {
    return await LessonQuestion.destroy({
        where: {
            lesson_question_id: {
                [Op.eq]: id
            }
        }
    })
}

const updateAnswer = async (updateDto, id) => {
    return await LessonAnswer.update(
        {
            ...updateDto
        }
        , {
            where: {
                lesson_answer_id: {
                    [Op.eq]: id
                }
            },

        })
}



const deleteAnswer = async (id) => {
    return await LessonAnswer.destroy({
        where: {
            lesson_answer_id: {
                [Op.eq]: id
            }
        }
    })
}


const QAService = {
    getQuestion,
    getAnswer,
    addQuestion,
    addAnswer,
    updateQuestion,
    deleteQuestion,
    updateAnswer,
    deleteAnswer,
    getAllQuestions,
    getAllAnswers
}

export default QAService




