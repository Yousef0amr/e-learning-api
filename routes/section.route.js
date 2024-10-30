import { Router } from "express";

import validateRequest from "../middlewares/validateRequest.js";
import { addSectionSchema, updateSectionSchema } from "../validators/section.validator.js";
import { addSection, deleteSection, getAllSections, getSection, updateSection } from "../controllers/section.controller.js";



const sectionRouter = Router()


sectionRouter.route('/')
    .post(validateRequest(addSectionSchema), addSection)

sectionRouter.route('/:id')
    .get(getAllSections)
    .patch(validateRequest(updateSectionSchema), updateSection)
    .delete(deleteSection)




export default sectionRouter