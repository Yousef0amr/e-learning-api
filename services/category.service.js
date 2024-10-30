
import { Op, Sequelize } from 'sequelize';
import model from './../models/index.js';
const { Category, CourseCategory, Course } = model

const getCategory = async (id) => {
    return await Category.findByPk(id)

}

const getAllCategories = async (id) => {
    return await Category.findAll({
        where: {
            level_id: {
                [Op.eq]: id
            }
        }

    });
};

const addCategory = async (categoryDto) => {
    return await Category.create({ ...categoryDto })
}

const updateCategory = async (updateCategoryDto, id) => {
    return await Category.update(
        {
            ...updateCategoryDto
        }
        , {
            where: {
                category_id: {
                    [Op.eq]: id
                }
            }
        })
}



const deleteCategory = async (id) => {
    return await Category.destroy({
        where: {
            category_id: {
                [Op.eq]: id
            }
        }
    })
}


const categoryService = {
    getAllCategories,
    getCategory,
    addCategory,
    updateCategory,
    deleteCategory
}

export default categoryService




