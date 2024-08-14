import { Op } from 'sequelize';
import model from './../models/index.js';
const { Level, Category, Course } = model;

const getLevel = async (id) => {

    return await Level.findByPk(id, {
        include: [
            {
                model: Category,
                include: [
                    {
                        model: Course,
                    }
                ],

            },
        ]
    });

};

const getAllLevels = async () => {
    return await Level.findAll();
};

const addLevel = async (LevelDto) => {
    return await Level.create({ ...LevelDto });
};

const updateLevel = async (updateLevelDto, id) => {
    return await Level.update(
        { ...updateLevelDto },
        {
            where: {
                level_id: {
                    [Op.eq]: id
                }
            },
        }
    );
};

const deleteLevel = async (id) => {
    return await Level.destroy({
        where: {
            level_id: {
                [Op.eq]: id
            }
        }
    });
};

const levelService = {
    getAllLevels,
    getLevel,
    addLevel,
    updateLevel,
    deleteLevel
};

export default levelService;
