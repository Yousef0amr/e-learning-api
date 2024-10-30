
import { DataTypes, Model } from "sequelize";

class LessonQuestion extends Model {

}

const LessonQuestionModel = (sequelize) => LessonQuestion.init({
    lesson_question_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'lesson_question_id',
    },
    question: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: "lesson_questions",
    timestamps: true
})


export default LessonQuestionModel;


