import { DataTypes, Model } from "sequelize";

class Quiz extends Model { }

const QuizModel = (sequelize) => Quiz.init({
    quiz_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'quiz_id',
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: false, // Duration in seconds
    },

}, {
    sequelize,
    modelName: 'Quiz',
    tableName: 'quizzes',
    timestamps: true,
});



export default QuizModel;
