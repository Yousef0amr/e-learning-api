import { Op } from 'sequelize';
import model from './../models/index.js';
const { Document } = model;

const getDocument = async (id) => {
    return await Document.findByPk(id);
};

const getAllDocuments = async (lessonId) => {
    return await Document.findAll({
        where: {
            lesson_id: {
                [Op.eq]: lessonId,
            },
        },
    });
};

const addDocument = async (documentDto) => {
    return await Document.create({ ...documentDto });
};

const updateDocument = async (updateDocumentDto, id) => {
    return await Document.update(
        {
            ...updateDocumentDto,
        },
        {
            where: {
                document_id: {
                    [Op.eq]: id,
                },
            },
            returning: true,
        }
    );
};

const deleteDocument = async (id) => {
    return await Document.destroy({
        where: {
            document_id: {
                [Op.eq]: id,
            },
        },
    });
};

const documentService = {
    getAllDocuments,
    getDocument,
    addDocument,
    updateDocument,
    deleteDocument,
};

export default documentService;
