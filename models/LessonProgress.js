
import { DataTypes, Model } from "sequelize";

class LessonProgress extends Model {

}

const LessonProgressModel = (sequelize) => LessonProgress.init({
    lesson_progress_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'lesson_progress_id',
    },
    watch_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    is_completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    sequelize,
    modelName: "lesson_progress",
    timestamps: true
})


export default LessonProgressModel;


