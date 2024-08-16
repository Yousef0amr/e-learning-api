import { DataTypes, Model } from "sequelize";

class Enrollment extends Model {

}





const EnrollmentModel = (sequelize) => Enrollment.init({
    enrollment_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    enrollment_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
}, {
    sequelize,
    timestamps: false,
    tableName: 'enrollments'
})

export default EnrollmentModel;
