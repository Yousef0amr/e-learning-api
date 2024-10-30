import { Op } from 'sequelize';
import model from './../models/index.js';
const { Video } = model

const getVideo = async (id) => {
    return await Video.findByPk(id)
}

const getAllVideos = async (id) => {
    return await Video.findAll({
        where: {
            lesson_id: {
                [Op.eq]: id
            }
        }
    })
}

const addVideo = async (videoDto) => {
    return await Video.create({ ...videoDto })
}

const updateVideo = async (updateVideoDto, id) => {
    return await Video.update(
        {
            ...updateVideoDto
        },
        {
            where: {
                video_id: {
                    [Op.eq]: id
                }
            },
            returning: true

        }
    )
}

const deleteVideo = async (id) => {
    return await Video.destroy({
        where: {
            video_id: {
                [Op.eq]: id
            }
        }
    })
}

const videoService = {
    getAllVideos,
    getVideo,
    addVideo,
    updateVideo,
    deleteVideo
}

export default videoService
