import { DataTypes, Model } from "sequelize";

class QuizResult extends Model { }

const QuizResultModel = (sequelize) => QuizResult.init({
    quiz_result_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    score: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    totalQuestions: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    correctAnswers: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    incorrectAnswers: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    completionTime: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'QuizResult',
    tableName: 'quiz_results',
    timestamps: true,
});



export default QuizResultModel;
