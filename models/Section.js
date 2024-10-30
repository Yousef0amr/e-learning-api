import { DataTypes, Model } from "sequelize";

class Section extends Model {

}


const SectionModel = (sequelize) => Section.init({
    section_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'section_id',
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: "sections",
    timestamps: true,
})



export default SectionModel;
