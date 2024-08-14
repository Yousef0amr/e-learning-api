import documentService from '../services/document.service.js';
import ApiError, { success } from '../utils/apiResponse.js';
import wrap from 'express-async-wrap';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const addDocument = wrap(async (req, res, next) => {

    const { file } = req;

    if (!file) {
        return next(new ApiError('No file was uploaded.', 400));
    }

    req.body.file_url = req.file.path;

    const document = await documentService.addDocument(req.body);
    return success(res, document, 201, 'Document created successfully');
});

const updateDocument = wrap(async (req, res, next) => {
    const document = await documentService.getDocument(req.params.id);
    if (!document) {
        return next(new ApiError('Document not found', 404));
    }

    if (req.file) {
        const oldFilePath = path.join(__dirname, '../', document.file_url.split('/').pop());
        fs.unlink(oldFilePath, (err) => {
            if (err) {
                return next(new ApiError('Failed to delete old document file', 400));
            }
        });
        req.body.file_url = req.file.path;
    }

    const updatedDocument = await documentService.updateDocument(req.body, req.params.id);
    return success(res, { document: updatedDocument }, 200);
});

const deleteDocument = wrap(async (req, res, next) => {
    const document = await documentService.getDocument(req.params.id);
    if (!document) {
        return next(new ApiError('Document not found', 404));
    }

    if (document.file_url) {
        const filePath = path.join(__dirname, '../', document.file_url.split('/').pop());
        fs.unlink(filePath, (err) => {
            if (err) {
                return next(new ApiError('Failed to delete document file', 400));
            }
        });
    }

    await documentService.deleteDocument(req.params.id);
    return success(res, { document }, 200);
});

const getDocument = wrap(async (req, res, next) => {
    const document = await documentService.getDocument(req.params.id);
    if (!document) {
        return next(new ApiError('Document not found', 404));
    }
    return success(res, { document }, 200);
});

const getAllDocuments = wrap(async (req, res, next) => {
    const id = req.params.id;
    const documents = await documentService.getAllDocuments(id);
    return success(res, { documents }, 200);
});

export {
    addDocument,
    updateDocument,
    deleteDocument,
    getDocument,
    getAllDocuments
};
