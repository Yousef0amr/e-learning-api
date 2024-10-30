
import { DataTypes, Model } from "sequelize";

class Document extends Model { }

const DocumentModel = (sequelize) => Document.init({
    document_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'document_id',
    },
    file_url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    file_name: {
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
    modelName: 'Document',
    tableName: 'documents',
    timestamps: false,
});

export default DocumentModel;
