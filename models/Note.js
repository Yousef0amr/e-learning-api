import { DataTypes, Model } from "sequelize";

class Note extends Model {

}



const NoteModel = (sequelize) => Note.init({
    note_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: "notes",
    timestamps: true
})



export default NoteModel