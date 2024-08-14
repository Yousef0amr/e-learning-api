import courseService from '../services/course.service.js';
import ApiError, { success } from '../utils/apiResponse.js';
import wrap from 'express-async-wrap'
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const addCourse = wrap(async (req, res, next) => {
    if (req.file) {
        req.body.poster_url = req.file.path
    }
    const course = await courseService.addCourse(req.body)

    if (req.body.category_id) {
        await course.setCategories(req.body.category_id);
    }
    return success(res, course, 201, 'course created successfully')
})

const updateCourse = wrap(async (req, res, next) => {
    const course = await courseService.getCourse(req.params.id)
    if (!course)
        return next(new ApiError('course not found', 404))

    if (req.file) {
        const filePath = path.join(__dirname, '../', course.poster_url.split('/').pop());
        fs.unlink(filePath, (err) => {
            if (err) {
                return next(new ApiError('Failed to delete image file', 500));
            }
        });
        req.body.poster_url = req.file.path
    }

    const updatedCourse = await courseService.updateCourse(req.body, req.params.id)

    if (req.body.category_id) {
        await course.setCategories(req.body.category_id);
    }
    return success(res, { course: updatedCourse }, 200)
})

const deleteCourse = wrap(async (req, res, next) => {
    const course = await courseService.getCourse(req.params.id)
    if (!course)
        return next(new ApiError('course not found', 404))
    const deletedCourse = await courseService.deleteCourse(req.params.id)
    if (deletedCourse) {
        const filePath = path.join(__dirname, '../', course.poster_url.split('/').pop());

        fs.unlink(filePath, (err) => {
            if (err) {
                return next(new ApiError('Failed to delete image file', 500));
            }
        });
    }
    return success(res, { deletedCourse }, 200)
})

const getCourse = wrap(async (req, res, next) => {
    const course = await courseService.getCourse(req.params.id)
    if (!course)
        return next(new ApiError('course not found', 404))
    return success(res, { course }, 200)
})

const getAllCourses = wrap(async (req, res, next) => {
    const courses = await courseService.getAllCourses()
    return success(res, { courses }, 200)
})



export {
    addCourse,
    updateCourse,
    deleteCourse,
    getCourse,
    getAllCourses
}

