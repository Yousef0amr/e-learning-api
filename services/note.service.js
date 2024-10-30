import { Op } from 'sequelize';
import model from './../models/index.js';
const { Note } = model;

const getNote = async (id) => {
    return await Note.findByPk(id);
};

const getAllNotes = async (id, user_id) => {
    return await Note.findAll({
        attributes: ['note_id', 'title', 'content', 'lesson_id'],
        where: {
            [Op.and]: [{
                lesson_id: {
                    [Op.eq]: id
                }
            }, {
                user_id: {
                    [Op.eq]: user_id
                }
            }]
        }
    });
};

const addNote = async (noteDto) => {
    return await Note.create({ ...noteDto });
};

const updateNote = async (updateNoteDto, id, user_id) => {
    return await Note.update(
        {
            ...updateNoteDto
        },
        {
            where: {
                [Op.and]: [
                    {
                        user_id: {
                            [Op.eq]: user_id
                        }
                    },
                    {
                        note_id: {
                            [Op.eq]: id
                        }
                    }
                ]
            }
        }
    );
};

const deleteNote = async (id, user_id) => {
    return await Note.destroy({
        where: {
            [Op.and]: [
                {
                    user_id: {
                        [Op.eq]: user_id
                    }
                },
                {
                    note_id: {
                        [Op.eq]: id
                    }
                }
            ]
        }
    });
};

const noteService = {
    getAllNotes,
    getNote,
    addNote,
    updateNote,
    deleteNote
};

export default noteService;
