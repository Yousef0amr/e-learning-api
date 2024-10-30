
import { DataTypes, Model } from "sequelize";

class LessonAnswer extends Model {

}

const LessonAnswerModel = (sequelize) => LessonAnswer.init({
    lesson_answer_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'lesson_answer_id',
    },
    answer: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: "lesson_answers",
    timestamps: true
})


export default LessonAnswerModel;


