import { DataTypes, Model } from "sequelize";

class Category extends Model {

}



const CategoryModel = (sequelize) => Category.init({
    category_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
}, {
    sequelize,
    modelName: "categories",
    timestamps: false
})


export default CategoryModel