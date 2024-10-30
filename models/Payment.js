import { DataTypes, Model } from "sequelize";

class Payment extends Model {

}



const PaymentModel = (sequelize) => Payment.init({
    payment_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    payment_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    payment_method: {
        type: DataTypes.ENUM(['card', 'wallet', 'cash']),
        allowNull: false,
        defaultValue: 'cash',
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    order_id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        defaultValue: DataTypes.UUIDV4
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
}, {
    sequelize,
    modelName: "payments",
    timestamps: false
})



export default PaymentModel