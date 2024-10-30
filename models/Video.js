
import { DataTypes, Model } from "sequelize";


class Video extends Model { }


const VideoModel = (sequelize) => Video.init({
    video_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'video_id',
    },
    video_url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    duration: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    resolution: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    file_size: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lesson_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'lessons',
            key: 'lesson_id',
        },
        onDelete: 'CASCADE',
    },

}, {
    sequelize,
    modelName: 'Video',
    tableName: 'videos',
    timestamps: false,
})


export default VideoModel;
