
import { Op } from 'sequelize';
import model from './../models/index.js';
const { Lesson, Video, Document } = model

const getLesson = async (id) => {
    return await Lesson.findByPk(id, {
        include: [
            {
                model: Video,
                as: 'videos'
            },
            {
                model: Document,
                as: 'documents'
            }
        ]
    })

}

const getAllLessons = async (id) => {
    return await Lesson.findAll(
        {
            where: {
                section_id: {
                    [Op.eq]: id
                }
            },
            include: [
                {
                    model: Video,
                    as: 'videos'
                },
                {
                    model: Document,
                    as: 'documents'
                }
            ]
        }
    )
}

const addLesson = async (LessonDto) => {
    return await Lesson.create({ ...LessonDto })
}

const updateLesson = async (updateLessonDto, id) => {
    return await Lesson.update(
        {
            ...updateLessonDto
        }
        , {
            where: {
                lesson_id: {
                    [Op.eq]: id
                }
            }
        })
}



const deleteLesson = async (id) => {
    return await Lesson.destroy({
        where: {
            lesson_id: {
                [Op.eq]: id
            }
        }
    })
}


const lessonService = {
    getAllLessons,
    getLesson,
    addLesson,
    updateLesson,
    deleteLesson
}

export default lessonService




