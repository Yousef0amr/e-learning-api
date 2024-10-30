
import { Op } from 'sequelize';
import model from './../models/index.js';
const { Course, Category, CourseCategory, Section, Lesson, Enrollment } = model

const getCourse = async (id, userId) => {
    return await Course.findByPk(id, {
        include: [{
            model: Section,
            order: [['createdAt', 'ASC']],
            include: {
                model: Lesson,
                order: [['createdAt', 'ASC']],
            }
        }, {
            model: Enrollment,
            as: 'enrollments',
            required: false,
            where: {
                user_id: {
                    [Op.eq]: userId
                }
            }
        }]
    })
}

const getAllCourses = async () => {
    return await Course.findAll({
        order: [['createdAt', 'ASC']],
        include: [{
            model: Category,
            order: [['createdAt', 'ASC']],
            as: 'categories',
            through: { attributes: [] }  // Exclude the join table data
        }
        ]
    })
}

const addCourse = async (CourseDto) => {
    return await Course.create({ ...CourseDto })
}

const updateCourse = async (updateCourseDto, id) => {

    return await Course.update(
        {
            ...updateCourseDto
        }
        , {
            where: {
                course_id: {
                    [Op.eq]: id
                }
            },

        })
}



const deleteCourse = async (id) => {
    await CourseCategory.destroy({
        where: {
            course_id: id,
        },
    });
    return await Course.destroy({
        where: {
            course_id: {
                [Op.eq]: id
            }
        }
    })

}


const courseService = {
    getAllCourses,
    getCourse,
    addCourse,
    updateCourse,
    deleteCourse
}

export default courseService




