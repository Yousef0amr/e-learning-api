import { Router } from "express";
import { addCategory, deleteCategory, getAllCategories, updateCategory } from "../controllers/category.controller.js";
import validateRequest from "../middlewares/validateRequest.js";
import { addCategorySchema } from "../validators/category.validator.js";


const categoryRouter = Router()


categoryRouter.route('/')
    .post(validateRequest(addCategorySchema), addCategory)


categoryRouter.route('/:id')
    .get(getAllCategories)
    .patch(validateRequest(addCategorySchema), updateCategory)
    .delete(deleteCategory);



export default categoryRouter