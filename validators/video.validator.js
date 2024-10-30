import Joi from "joi";

// Schema for adding a video
const addVideoSchema = Joi.object({
    lesson_id: Joi.number().required(),
    duration: Joi.string().required(),
    resolution: Joi.string().required(),
    file_size: Joi.string().required(),
    video_file: Joi.string().optional()
});

const updateVideoSchema = Joi.object({
    duration: Joi.string(),
    resolution: Joi.string(),
    file_size: Joi.string()
});

export {
    addVideoSchema,
    updateVideoSchema
};
