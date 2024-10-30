import courseService from '../services/course.service.js';
import ApiError, { success } from '../utils/apiResponse.js';
import wrap from 'express-async-wrap'
import uploadMedia from '../utils/uploadMedia.js';
import endpoints from "../utils/endpoints.js";




const addCourse = wrap(async (req, res, next) => {
    if (!req.file) {
        return next(new ApiError('Please upload image', 400));
    }
    req.body.poster_url = await uploadMedia(req.file.path, endpoints.COURSES_POSTERS)
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
        // Delete the existing poster from Cloudinary
        const publicId = course.poster_url
        await cloudinary.uploader.destroy(publicId);

        // Upload new poster to Cloudinary
        req.body.poster_url = await uploadMedia(req.file.path, endpoints.COURSES_POSTERS);
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
        // Delete the poster from Cloudinary
        const publicId = course.poster_url
        await cloudinary.uploader.destroy(publicId);
    }
    return success(res, { deletedCourse }, 200)
})

const getCourse = wrap(async (req, res, next) => {
    const course = await courseService.getCourse(req.params.id, req.user_id)
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

