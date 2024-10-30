
import { Op } from 'sequelize';
import model from './../models/index.js';
const { Section } = model

const getSection = async (id) => {
    return await Section.findByPk(id)

}

const getAllSections = async (id) => {
    return await Section.findAll({
        where: {
            course_id: {
                [Op.eq]: id
            }
        }
    })
}

const addSection = async (SectionDto) => {
    return await Section.create({ ...SectionDto })
}

const updateSection = async (updateSectionDto, id) => {
    return await Section.update(
        {
            ...updateSectionDto
        }
        , {
            where: {
                section_id: {
                    [Op.eq]: id
                }
            },

        })
}



const deleteSection = async (id) => {
    return await Section.destroy({
        where: {
            section_id: {
                [Op.eq]: id
            }
        }
    })
}


const sectionService = {
    getAllSections,
    getSection,
    addSection,
    updateSection,
    deleteSection
}

export default sectionService




