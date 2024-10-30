
import { Op, UUIDV4 as uuidv4 } from 'sequelize';
import model from './../models/index.js';
import axios from 'axios';
import ApiError from '../utils/apiResponse.js';

const { Payment, ChargeCode, User, Enrollment } = model


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

const chargeCode = async (code, user_id) => {
    const chargeCode = await (await ChargeCode).findOne({ where: { code: code } })

    if (!chargeCode) return new ApiError('الكود غير صالح', 400)
    const user = await User.findOne({ where: { user_id } })


    user.wallet = user.wallet + chargeCode.chargeAmount

    await user.save()

    await (await ChargeCode).destroy({ where: { code: code } })
    return user.wallet
}

const deleteChargeCode = async (id) => {
    return await (await ChargeCode).destroy({ where: { charge_code_id: id } })
}

const getAllChargeCodes = async () => {
    return await (await ChargeCode).findAll()
}


const addChargeCode = async (chargeCodeDto) => {
    return await (await ChargeCode).create({ ...chargeCodeDto })
}

const updateChargeCode = async (chargeCodeDto, id) => {
    return await (await ChargeCode).update({ ...chargeCodeDto }, { where: { charge_code_id: id } })
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

const payWithWallet = async (enrollmentDto, user_id) => {
    const user = await User.findOne({
        where: {
            user_id
        }
    });

    if (user.wallet < enrollmentDto.amount) {
        return new ApiError('ليس لديك رصيد كافي', 400)
    }

    user.wallet = user.wallet - enrollmentDto.amount
    await user.save()

    const data = {
        user_id,
        status: true,
        payment_method: 'wallet',
        amount: enrollmentDto.amount
    }

    const payment = await addPayment(data)

    await Enrollment.create({
        user_id,
        course_id: enrollmentDto.course_id,
        payment_id: payment.payment_id
    })

    return user.wallet
}


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
        data: {
            user_id,
            course_id: orderData.course_id
        }
    };

    const response = await axios.post('https://accept.paymob.com/api/ecommerce/orders', orderDetails);
    return response.data;
};



const createWalletCheckoutSession = async (authToken, orderData, user_id) => {

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
        data: {
            user_id
        }
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
    getAuthToken,
    chargeCode,
    addChargeCode,
    deleteChargeCode,
    getAllChargeCodes,
    updateChargeCode,
    createWalletCheckoutSession,
    payWithWallet


}

export default PaymentService




