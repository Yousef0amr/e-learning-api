
import videoService from '../services/video.service.js';
import ApiError, { success } from '../utils/apiResponse.js';
import wrap from 'express-async-wrap';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const addVideo = wrap(async (req, res, next) => {

    const { file } = req;

    if (!file) {
        return next(new ApiError('No file was uploaded.', 400));
    }

    req.body.video_url = req.file.path;



    const video = await videoService.addVideo(req.body);
    return success(res, video, 201, 'Video created successfully');
});

const updateVideo = wrap(async (req, res, next) => {
    const video = await videoService.getVideo(req.params.id);
    if (!video) {
        return next(new ApiError('Video not found', 404));
    }

    if (req.file) {
        const oldFilePath = path.join(__dirname, '../', video.video_url.split('/').pop());
        fs.unlink(oldFilePath, (err) => {
            if (err) {
                return next(new ApiError('Failed to delete old video file', 400));
            }
        });
        req.body.video_url = req.file.path;
    }

    const updatedVideo = await videoService.updateVideo(req.body, req.params.id);
    return success(res, { video: updatedVideo }, 200);
});

const deleteVideo = wrap(async (req, res, next) => {
    const video = await videoService.getVideo(req.params.id);
    if (!video) {
        return next(new ApiError('Video not found', 404));
    }

    if (video.video_url) {
        const filePath = path.join(__dirname, '../', video.video_url.split('/').pop());
        fs.unlink(filePath, (err) => {
            if (err) {
                return next(new ApiError('Failed to delete video file', 400));
            }
        });
    }

    await videoService.deleteVideo(req.params.id);
    return success(res, { video }, 200);
});

const getVideo = wrap(async (req, res, next) => {
    const video = await videoService.getVideo(req.params.id);
    if (!video) {
        return next(new ApiError('Video not found', 404));
    }
    return success(res, { video }, 200);
});

const getAllVideos = wrap(async (req, res, next) => {
    const id = req.params.id;
    const videos = await videoService.getAllVideos(id);
    return success(res, { videos }, 200);
});

export {
    addVideo,
    updateVideo,
    deleteVideo,
    getVideo,
    getAllVideos
};
