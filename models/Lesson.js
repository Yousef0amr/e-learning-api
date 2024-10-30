
import { DataTypes, Model } from "sequelize";


class Lesson extends Model { }


const LessonModel = (sequelize) => Lesson.init({
    lesson_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'lesson_id',
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'lessons',
    timestamps: false,
})


export default LessonModel;
