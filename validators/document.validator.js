import Joi from "joi";

// Schema for adding a video
const addDocumentSchema = Joi.object({
    lesson_id: Joi.number().required(),
    file_name: Joi.string(),
    file_size: Joi.string(),
    document_file: Joi.string().optional()
});


const updateDocumentSchema = Joi.object({
    file_name: Joi.string(),
    file_size: Joi.string()
});

export {
    addDocumentSchema,
    updateDocumentSchema
};
