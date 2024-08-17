
import { Op } from 'sequelize';
import model from './../models/index.js';
import axios from 'axios';

const { Payment } = model


const getPayment = async (id) => {
    return await Payment.findByPk(id)
}

const getAllPayments = async (id) => {
    return await Payment.findAll({
        where: {
            user_id: id
        }
    })
}

const addPayment = async (PaymentDto) => {
    return await Payment.create({ ...PaymentDto })
}

const updatePayment = async (updatePaymentDto, id) => {
    return await Payment.update(
        {
            ...updatePaymentDto
        }
        , {
            where: {
                payment_id: {
                    [Op.eq]: id
                }
            }
        })
}



const deletePayment = async (id) => {
    return await Payment.destroy({
        where: {
            payment_id: {
                [Op.eq]: id
            }
        }
    })
}




const convertToCents = (price) => {
    return Math.round(parseFloat(price) * 100);
}

const getAuthToken = async () => {
    const authData = {
        api_key: process.env.PAYMOB_API_KEY // Using environment variable
    };

    const response = await axios.post('https://accept.paymob.com/api/auth/tokens', authData);
    return response.data.token;
};


const createCheckoutSession = async (authToken, orderData, user_id) => {
    const orderDetails = {
        auth_token: authToken,
        api_source: "INVOICE",
        delivery_needed: "false",
        shipping_data: {
            "first_name": "منصة",
            "last_name": "الغالي",
            "phone_number": "01094331526",
            "email": "test@account.com"
        },
        integrations: [
            Number(process.env.PAYMOB_INTEGRATION_WALLET),
            process.env.PAYMOB_INTEGRATION_CARD,
        ],
        amount_cents: convertToCents(orderData.price), // amount in cents (e.g., 10.00 EGP)
        currency: "EGP",
        items: [
            {
                name: orderData.title,
                amount_cents: convertToCents(orderData.price),
                description: orderData.description,
                quantity: "1"
            }
        ],
        course_id: orderData.course_id,
        user_id,



    };

    const response = await axios.post('https://accept.paymob.com/api/ecommerce/orders', orderDetails);
    return response.data;
};




const PaymentService = {
    getAllPayments,
    getPayment,
    addPayment,
    updatePayment,
    deletePayment,
    createCheckoutSession,
    getAuthToken

}

export default PaymentService




