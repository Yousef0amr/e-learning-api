import { Router } from "express";
import { addLevel, deleteLevel, getAllLevels, getLevel, updateLevel } from "../controllers/level.controller.js";
import validateRequest from "../middlewares/validateRequest.js";
import { addLevelSchema } from "../validators/level.validator.js";
import multerConfig from "../utils/multer.js";

const levelRouter = Router();

levelRouter.route('/')
    .post(multerConfig().single('poster_img'), validateRequest(addLevelSchema), addLevel)
    .get(getAllLevels);

levelRouter.route('/:id')
    .get(getLevel)
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
    }, validateRequest(addLevelSchema), updateLevel)
    .delete(deleteLevel);

export default levelRouter;
