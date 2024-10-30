import { v4 as uuidv4 } from 'uuid'
import cloudnairy from './../config/cloudinary.js'
import wrap from 'express-async-wrap'

const uploadMedia = wrap(
    async (media, folder) => {
        const file = await cloudnairy.uploader.upload(
            media, {
            folder,
            public_id: uuidv4(),
            use_filename: true,
            unique_filename: true,
            resource_type: "auto"
        }
        )
        return file.public_id
    }
)


export default uploadMedia