
import { Op } from 'sequelize';
import model from './../models/index.js';
const { Enrollment, Course, Section, Lesson, Video, Document } = model

const getEnrollment = async (id) => {
    return await Enrollment.findByPk(id, {
        include: {
            model: Course, as: 'course', include: {
                model: Section,
                include: {
                    model: Lesson,
                    include: [{
                        model: Video,
                        as: 'videos'
                    }, {
                        model: Document,
                        as: 'documents'
                    }],
                }
            }
        },
        attributes: {
            exclude: ['user_id', 'course_id', 'payment_id']
        }
    })
}

const getAllEnrollments = async () => {
    return await Enrollment.findAll()
}

const getUserEnrollments = async (id) => {
    return await Enrollment.findAll({
        where: {
            user_id: {
                [Op.eq]: id
            }
        },
        include: { model: Course, as: 'course' },
        attributes: {
            exclude: ['user_id', 'course_id', 'payment_id']
        }
    })
}

const addEnrollment = async (enrollmentDto) => {
    return await Enrollment.create({ ...enrollmentDto })
}


const deleteEnrollment = async (id) => {
    return await Enrollment.destroy({
        where: {
            enrollment_id: {
                [Op.eq]: id
            }
        }
    })
}


const enrollmentService = {
    addEnrollment,
    deleteEnrollment,
    getEnrollment,
    getAllEnrollments,
    getUserEnrollments
}

export default enrollmentService




