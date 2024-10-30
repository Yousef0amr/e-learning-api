import multer from 'multer';
import ApiError from './apiResponse.js';

const multerConfig = (fileType = 'image') => {
    const storage = multer.diskStorage({

    });

    const fileFilter = (req, file, cb) => {
        let allowedTypes = [];
        if (fileType === 'image') {
            allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        } else if (fileType === 'video') {
            allowedTypes = ['video/mp4', 'video/mpeg', 'video/ogg'];
        } else if (fileType === 'document') {
            allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        }

        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new ApiError(`Only ${fileType} format allowed!`, 400), false);
        }
    };

    return multer({
        storage,
        fileFilter
    });
};

export default multerConfig;
