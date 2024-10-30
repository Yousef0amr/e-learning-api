import levelService from '../services/level.service.js';
import ApiError, { success } from '../utils/apiResponse.js';
import wrap from 'express-async-wrap';
import uploadMedia from '../utils/uploadMedia.js';
import cloudinary from '../config/cloudinary.js';  // Import Cloudinary config
import endpoints from '../utils/endpoints.js';  // Folder for Level posters

const addLevel = wrap(async (req, res, next) => {
    if (!req.file) {
        return next(new ApiError('Please upload an image', 400));
    }

    // Upload to Cloudinary
    req.body.poster_url = await uploadMedia(req.file.path, endpoints.LEVELSPOSTERS);

    const level = await levelService.addLevel(req.body);

    return success(res, level, 201, 'Level created successfully');
});

const updateLevel = wrap(async (req, res, next) => {
    const level = await levelService.getLevel(req.params.id);
    if (!level) {
        return next(new ApiError('Level not found', 404));
    }

    if (req.file) {
        // Delete the existing poster from Cloudinary
        const publicId = level.poster_url
        await cloudinary.uploader.destroy(publicId);

        // Upload new poster to Cloudinary
        req.body.poster_url = await uploadMedia(req.file.path, endpoints.LEVELSPOSTERS);
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
        // Delete the poster from Cloudinary
        const publicId = level.poster_url
        await cloudinary.uploader.destroy(publicId);
    }

    return success(res, { deletedLevel }, 200);
});

const getLevel = wrap(async (req, res, next) => {
    const level = await levelService.getLevel(req.params.id, req.user_id);
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
