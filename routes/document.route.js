import { Router } from "express";
import validateRequest from "../middlewares/validateRequest.js";
import { addDocumentSchema, updateDocumentSchema } from "../validators/document.validator.js";
import { addDocument, deleteDocument, getAllDocuments, getDocument, updateDocument } from "../controllers/document.controller.js";
import multerConfig from "../utils/multer.js";


const documentRouter = Router();



documentRouter.route('/')
    .post(multerConfig('document').single('document_file'), validateRequest(addDocumentSchema), addDocument);

documentRouter.route('/:id')
    .get(getAllDocuments)
    .patch((req, res, next) => {
        if (req.headers['content-type'] && req.headers['content-type'].includes('multipart/form-data')) {
            multerConfig('document').single('document_file')(req, res, (err) => {
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
            delete req.body.file_url;
            return next();
        }
    }, validateRequest(updateDocumentSchema), updateDocument)
    .delete(deleteDocument);

export default documentRouter;
