import { Router } from "express";
import { addLesson, deleteLesson, getAllLessons, updateLesson } from "../controllers/lesson.controller.js";
import validateRequest from "../middlewares/validateRequest.js";
import { addLessonSchema, addNoteSchema, } from "../validators/lesson.validator.js";
import { addNote, deleteNote, getAllNotes, updateNote } from "../controllers/note.controller.js";
import { addAnswer, addQuestion, deleteAnswer, deleteQuestion, getAllAnswers, getAllQuestions, updateAnswer, updateQuestion } from "../controllers/qa.controller.js";



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

lessonRouter.route('/:id/questions')
    .get(getAllQuestions)
    .post(addQuestion)

lessonRouter.route('/questions/:id')
    .put(updateQuestion)
    .delete(deleteQuestion)

lessonRouter.route('/questions/:id/answers')
    .get(getAllAnswers)
    .post(addAnswer)


lessonRouter.route('/answers/:id')
    .put(updateAnswer)
    .delete(deleteAnswer)



export default lessonRouter