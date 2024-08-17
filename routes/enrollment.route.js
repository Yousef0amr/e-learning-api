import { Router } from "express";
import { deleteEnrollment, getAllEnrollments, getEnrollment } from "../controllers/enrollment.controller.js";


const enrollmentRouter = Router();

enrollmentRouter.route('/')
    .get(getAllEnrollments)

enrollmentRouter.route('/:id')
    .delete(deleteEnrollment);

export default enrollmentRouter;
