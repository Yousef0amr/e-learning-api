import { DataTypes, Model } from "sequelize";

// Define CourseCategory Model
class CourseCategory extends Model { }

const CourseCategoryModel = (sequelize) => CourseCategory.init(
    {
        course_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'courses',
                key: 'course_id'
            },
            onDelete: 'CASCADE'
        },
        category_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'categories',
                key: 'category_id'
            },
            onDelete: 'CASCADE'
        }
    }, {
    sequelize,
    timestamps: false,
    tableName: 'course_categories'
});

export default CourseCategoryModel;
