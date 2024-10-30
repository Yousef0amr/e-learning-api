import { Router } from "express";
import { addCourse, deleteCourse, getAllCourses, getCourse, updateCourse } from "../controllers/course.controller.js";
import validateRequest from "../middlewares/validateRequest.js";
import { addCourseSchema } from "../validators/course.validator.js";
import multerConfig from "../utils/multer.js";
import { watchLessonVideo } from "../controllers/course_progress.controller.js";
import endpoints from "../utils/endpoints.js";

const courseRouter = Router()


courseRouter.route('/')
    .post(multerConfig().single('poster_img'), validateRequest(addCourseSchema), addCourse)
    .get(getAllCourses);


courseRouter.route('/:id')
    .get(getCourse)
    .patch((req, res, next) => {
        // Use multer if a file is detected
        if (req.headers['content-type'] && req.headers['content-type'].includes('multipart/form-data')) {
            multerConfig().single('poster_img')(req, res, (err) => {
                if (err) {
                    return next(err);
                }
                return next();
            });
        } else {
            return next();
        }
    }, (req, res, next) => {
        // Check if a file is present
        if (req.file) {
            return next();
        } else {
            // Remove the poster_img field if no file is uploaded
            delete req.body.poster_img;
            return next();
        }
    }, validateRequest(addCourseSchema), updateCourse)
    .delete(deleteCourse);




// Route for watching a lesson video (increments watch count)
courseRouter.post(`${endpoints.LESSON}/watch`, multerConfig().array(''), watchLessonVideo);




export default courseRouter