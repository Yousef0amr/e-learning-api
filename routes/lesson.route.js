import { Router } from "express";
import { addLesson, deleteLesson, getAllLessons, getLesson, updateLesson } from "../controllers/lesson.controller.js";
import validateRequest from "../middlewares/validateRequest.js";
import { addLessonSchema } from "../validators/lesson.validator.js";


const lessonRouter = Router()


lessonRouter.route('/')
    .post(validateRequest(addLessonSchema), addLesson)


lessonRouter.route('/:id')
    .get(getAllLessons)
    .patch(validateRequest(addLessonSchema), updateLesson)
    .delete(deleteLesson);


export default lessonRouter