import { Router } from "express";

import validateRequest from "../middlewares/validateRequest.js";
import { addVideoSchema, updateVideoSchema } from "../validators/video.validator.js";
import { addVideo, deleteVideo, getAllVideos, getVideo, updateVideo } from "../controllers/video.controller.js";
import multerConfig from "../utils/multer.js";
import multer from "multer";


const upload = multer({ dest: 'uploads/' })
const videoRouter = Router();

videoRouter.route('/')
    .post(multerConfig('video').single('video_file'), validateRequest(addVideoSchema), addVideo);

videoRouter.route('/:id')
    .get(getAllVideos)
    .patch((req, res, next) => {
        if (req.headers['content-type'] && req.headers['content-type'].includes('multipart/form-data')) {
            multerConfig('video').single('video_file')(req, res, (err) => {
                if (err) {
                    return next(err);
                }
                return next();
            });
        } else {
            return next();
        }
    }, (req, res, next) => {
        if (req.file) {
            return next();
        } else {
            delete req.body.video_file;
            return next();
        }
    }, validateRequest(updateVideoSchema), updateVideo)
    .delete(deleteVideo);

export default videoRouter;
