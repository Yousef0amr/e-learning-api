import { DataTypes, Model } from "sequelize";

class Coupon extends Model {

}



const CouponModel = (sequelize) => Coupon.init({
    coupon_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    code: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false
    },
    discountPercentage: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    expiry_date: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    sequelize,
    modelName: "coupons",
    timestamps: true
})



export default CouponModel