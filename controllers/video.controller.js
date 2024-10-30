import videoService from '../services/video.service.js';
import ApiError, { success } from '../utils/apiResponse.js';
import wrap from 'express-async-wrap';
import uploadMedia from '../utils/uploadMedia.js';  // Cloudinary upload helper
import cloudinary from '../config/cloudinary.js';  // Import Cloudinary config
import endpoints from '../utils/endpoints.js';  // Cloudinary folder for videos

const addVideo = wrap(async (req, res, next) => {
    const { file } = req;

    if (!file) {
        return next(new ApiError('No file was uploaded.', 400));
    }

    // Upload video to Cloudinary
    req.body.video_url = await uploadMedia(file.path, endpoints.COURSESVIDEOS, 'video');

    const video = await videoService.addVideo(req.body);
    return success(res, video, 201, 'Video created successfully');
});

const updateVideo = wrap(async (req, res, next) => {
    const video = await videoService.getVideo(req.params.id);
    if (!video) {
        return next(new ApiError('Video not found', 404));
    }

    if (req.file) {
        // Delete the existing video from Cloudinary
        const publicId = video.video_url
        await cloudinary.uploader.destroy(publicId, { resource_type: 'video' });

        // Upload new video to Cloudinary
        req.body.video_url = await uploadMedia(req.file.path, endpoints.COURSESVIDEOS, 'video');
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
        // Delete the video from Cloudinary
        const publicId = video.video_url
        await cloudinary.uploader.destroy(publicId, { resource_type: 'video' });
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
