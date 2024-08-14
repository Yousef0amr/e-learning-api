import levelService from '../services/level.service.js';
import ApiError, { success } from '../utils/apiResponse.js';
import wrap from 'express-async-wrap';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const addLevel = wrap(async (req, res, next) => {
    if (req.file) {
        req.body.poster_url = req.file.path;
    }
    const level = await levelService.addLevel(req.body);

    return success(res, level, 201, 'Level created successfully');
});

const updateLevel = wrap(async (req, res, next) => {
    const level = await levelService.getLevel(req.params.id);
    if (!level) {
        return next(new ApiError('Level not found', 404));
    }

    if (req.file) {
        const filePath = path.join(__dirname, '../', level.poster_url.split('/').pop());
        fs.unlink(filePath, (err) => {
            if (err) {
                return next(new ApiError('Failed to delete image file', 500));
            }
        });
        req.body.poster_url = req.file.path;
    }

    const updatedLevel = await levelService.updateLevel(req.body, req.params.id);

    return success(res, { level: updatedLevel }, 200);
});

const deleteLevel = wrap(async (req, res, next) => {
    const level = await levelService.getLevel(req.params.id);
    if (!level) {
        return next(new ApiError('Level not found', 404));
    }
    const deletedLevel = await levelService.deleteLevel(req.params.id);
    if (deletedLevel) {
        const filePath = path.join(__dirname, '../', level.poster_url.split('/').pop());

        fs.unlink(filePath, (err) => {
            if (err) {
                return next(new ApiError('Failed to delete image file', 500));
            }
        });
    }
    return success(res, { deletedLevel }, 200);
});

const getLevel = wrap(async (req, res, next) => {
    const level = await levelService.getLevel(req.params.id);
    if (!level) {
        return next(new ApiError('Level not found', 404));
    }
    return success(res, { level }, 200);
});

const getAllLevels = wrap(async (req, res, next) => {
    const levels = await levelService.getAllLevels();
    return success(res, { levels }, 200);
});

export {
    addLevel,
    updateLevel,
    deleteLevel,
    getLevel,
    getAllLevels
};
