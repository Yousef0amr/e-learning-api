// models/Question.js

import { Model, DataTypes } from 'sequelize';



class Question extends Model { }

const QuestionModel = (sequelize) => Question.init({
    question_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'question_id',
    },
    question_text: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    options: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
    },
    correct_answer: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Question',
    tableName: 'questions',
    timestamps: true,

});

export default QuestionModel;
