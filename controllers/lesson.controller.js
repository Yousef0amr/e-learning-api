import lessonService from '../services/lesson.service.js';
import ApiError, { success } from '../utils/apiResponse.js';
import wrap from 'express-async-wrap'
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const addLesson = wrap(async (req, res, next) => {
    const lesson = await lessonService.addLesson(req.body)
    return success(res, lesson, 201, 'lesson created successfully')
})

const updateLesson = wrap(async (req, res, next) => {
    const lesson = await lessonService.getLesson(req.params.id)
    if (!lesson)
        return next(new ApiError('lesson not found', 404))
    const updatedLesson = await lessonService.updateLesson(req.body, req.params.id)

    return success(res, { lesson: updatedLesson }, 200)
})

const deleteLesson = wrap(async (req, res, next) => {
    const lesson = await lessonService.getLesson(req.params.id)
    if (!lesson)
        return next(new ApiError('lesson not found', 404))

    if (lesson.videos.length > 0) {
        const filePath = path.join(__dirname, '../', lesson.videos[0].video_url.split('/').pop());
        fs.unlink(filePath, (err) => {
            if (err) {
                return next(new ApiError('Failed to delete video file', 400));
            }
        });
    }
    if (lesson.documents.length > 0) {
        const filePath = path.join(__dirname, '../', lesson.documents[0].file_url.split('/').pop());
        fs.unlink(filePath, (err) => {
            if (err) {
                return next(new ApiError('Failed to delete document file', 400));
            }
        });
    }
    await lessonService.deleteLesson(req.params.id)
    return success(res, { lesson }, 200)
})

const getLesson = wrap(async (req, res, next) => {
    const lesson = await lessonService.getLesson(req.params.id)
    if (!lesson)
        return next(new ApiError('lesson not found', 404))
    return success(res, { lesson }, 200)
})

const getAllLessons = wrap(async (req, res, next) => {
    const id = req.params.id
    const lessons = await lessonService.getAllLessons(id)
    return success(res, { lessons }, 200)
})



export {
    addLesson,
    updateLesson,
    deleteLesson,
    getLesson,
    getAllLessons
}

