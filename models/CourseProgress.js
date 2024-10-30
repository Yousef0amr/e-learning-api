
import { DataTypes, Model } from "sequelize";

class CourseProgress extends Model {

}



const CourseProgressModel = (sequelize) => CourseProgress.init({
    course_progress_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'course_progress_id',
    },
    progress_percentage: {
        type: DataTypes.FLOAT,
        defaultValue: 0.0,
    },
    is_completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    sequelize,
    modelName: "course_progress",
    timestamps: true,
    indexes: [
        {
            unique: true,
            fields: ["enrollment_id", "user_id"]
        }
    ]
})


export default CourseProgressModel;
