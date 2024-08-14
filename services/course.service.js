
import { Op } from 'sequelize';
import model from './../models/index.js';
const { Course, Category, CourseCategory, Section, Lesson } = model

const getCourse = async (id) => {
    return await Course.findByPk(id, {
        include: {
            model: Section,
            include: {
                model: Lesson
            }
        }
    })
}

const getAllCourses = async () => {
    return await Course.findAll({
        include: {
            model: Category,
            as: 'categories',
            through: { attributes: [] }  // Exclude the join table data
        }
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




