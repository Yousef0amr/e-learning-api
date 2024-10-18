import { Router } from "express";
import { addLesson, deleteLesson, getAllLessons, getLesson, updateLesson } from "../controllers/lesson.controller.js";
import validateRequest from "../middlewares/validateRequest.js";
import { addLessonSchema, addNoteSchema, } from "../validators/lesson.validator.js";
import { addNote, deleteNote, getAllNotes, updateNote } from "../controllers/note.controller.js";


const lessonRouter = Router()


lessonRouter.route('/')
    .post(validateRequest(addLessonSchema), addLesson)


lessonRouter.route('/:id')
    .get(getAllLessons)
    .patch(validateRequest(addLessonSchema), updateLesson)
    .delete(deleteLesson);

lessonRouter.route('/:id/notes')
    .post(validateRequest(addNoteSchema), addNote)
    .get(getAllNotes)

lessonRouter.route('/notes/:id')
    .delete(deleteNote)
    .patch(updateNote)


export default lessonRouter