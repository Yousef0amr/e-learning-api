import { Op } from 'sequelize';
import model from './../models/index.js';
const { Level, Category, Course, Enrollment } = model;

const getLevel = async (id, userId) => {

    return await Level.findByPk(id, {
        include: [
            {
                model: Category,
                include: [
                    {
                        model: Course,
                        include: [
                            {
                                model: Enrollment,
                                as: 'enrollments',
                                required: false,
                                where: {
                                    user_id: {
                                        [Op.eq]: userId
                                    }
                                }
                            }
                        ]
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
