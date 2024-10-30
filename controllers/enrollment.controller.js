import enrollmentService from '../services/enrollment.service.js';
import ApiError, { success } from '../utils/apiResponse.js';
import wrap from 'express-async-wrap';


const deleteEnrollment = wrap(async (req, res, next) => {
    const enrollment = await enrollmentService.getEnrollment(req.params.id);
    if (!enrollment) {
        return next(new ApiError('Enrollment not found', 404));
    }
    await enrollmentService.deleteEnrollment(req.params.id);
    return success(res, { enrollment }, 200);
});

const getAllEnrollments = wrap(async (req, res, next) => {
    const enrollments = await enrollmentService.getAllEnrollments();
    return success(res, { enrollments }, 200);
});

const getEnrollment = wrap(async (req, res, next) => {
    const enrollment = await enrollmentService.getEnrollment(req.params.id, req.user_id);
    return success(res, { enrollment }, 200);
});
const getUserEnrollments = wrap(async (req, res, next) => {
    const enrollments = await enrollmentService.getUserEnrollments(req.user_id);
    return success(res, { enrollments }, 200);
});



export {
    deleteEnrollment,
    getAllEnrollments,
    getEnrollment,
    getUserEnrollments
};
