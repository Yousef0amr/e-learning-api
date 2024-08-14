import { DataTypes, Model } from "sequelize";

class Level extends Model {

}



const LevelModel = (sequelize) => Level.init({
    level_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    poster_url: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: "levels",
    timestamps: false
})


export default LevelModel