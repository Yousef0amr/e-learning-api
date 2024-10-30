import ApiError, { success } from '../utils/apiResponse.js';
import wrap from 'express-async-wrap'
import PaymentService from '../services/payment.service.js'
import enrollmentService from '../services/enrollment.service.js'
import model from '../models/index.js';

const { User } = model

const deletePayment = wrap(async (req, res, next) => {
  const payment = await PaymentService.getPayment(req.params.id)
  if (!payment)
    return next(new ApiError('Payment not found', 404))
  await PaymentService.deletePayment(req.params.id)
  return success(res, { payment }, 200)
})

const getPayment = wrap(async (req, res, next) => {
  const payment = await PaymentService.getPayment(req.params.id)
  if (!payment)
    return next(new ApiError('Payment not found', 404))
  return success(res, { payment }, 200)
})

const getAllPayments = wrap(async (req, res, next) => {
  const payments = await PaymentService.getAllPayments(req.user_id)
  return success(res, { payments }, 200)
})


const generateInvoiceWebhook = wrap(async (req, res) => {

  const callbackData = req.body;

  // // Verify the signature (optional, for added security)
  // const expectedSignature = callbackData.hmac; // HMAC sent by Paymob
  // const secretKey = process.env.PAYMOB_HMAC_SECRET; // Your HMAC secret from Paymob

  // const computedSignature = crypto.createHmac('sha512', secretKey)
  //   .update(JSON.stringify(callbackData))
  //   .digest('hex');

  // if (expectedSignature !== computedSignature) {
  //   console.error('Invalid signature received from Paymob');
  //   return res.status(400).send('Invalid signature');
  // }

  if (callbackData.obj.success) {

    const data = {
      user_id: callbackData.obj.order.data.user_id,
      order_id: callbackData.obj.order.id,
      status: callbackData.obj.success,
      payment_method: callbackData.obj.source_data.type,
      amount: callbackData.obj.amount_cents / 100
    }

    const payment = await PaymentService.addPayment(data)

    // Add enrollment
    if (callbackData.obj.order.data.course_id) {
      await enrollmentService.addEnrollment({
        user_id: callbackData.obj.order.data.user_id,
        course_id: callbackData.obj.order.data.course_id,
        payment_id: payment.payment_id
      })
    } else {
      const user = await User.findOne({ where: { user_id: callbackData.obj.order.data.user_id } })
      user.wallet = user.wallet + callbackData.obj.amount_cents / 100
      await user.save()
    }
  } else {
    // Payment failed or was canceled, update the order status accordingly
    return next(new ApiError('Payment failed', 400))
  }

  return success(res, {}, 200, 'OK')
});


const payWithWallet = wrap(async (req, res, next) => {
  const callback = await PaymentService.payWithWallet(req.body, req.user_id);
  return callback.stack ? next(callback) : success(res, { isPayed: true }, 200, 'تم الدفع بنجاح')
})

const generateInvoice = wrap(async (req, res) => {
  const authToken = await PaymentService.getAuthToken();
  const order = await PaymentService.createCheckoutSession(authToken, req.body, req.user_id);

  return success(res, { invoiceUrl: order.url }, 200, 'OK')
})


const generateWalletInvoice = wrap(async (req, res) => {
  const authToken = await PaymentService.getAuthToken();
  const order = await PaymentService.createWalletCheckoutSession(authToken, req.body, req.user_id);

  return success(res, { invoiceUrl: order.url }, 200, 'OK')
})


const generateChargeCode = wrap(async (req, res) => {
  const chargeCode = await PaymentService.addChargeCode(req.body);
  return success(res, { chargeCode }, 200, 'تم تسجيل الكود بنجاح')

})

const updateChargeCode = wrap(async (req, res) => {
  const chargeCode = await PaymentService.updateChargeCode(req.body, req.params.id);
  return success(res, { chargeCode }, 200, 'تم تحديث الكود بنجاح')

})

const deleteChargeCode = wrap(async (req, res) => {
  const chargeCode = await PaymentService.deleteChargeCode(req.params.id);
  return success(res, { chargeCode }, 200, 'تم حذف الكود بنجاح')

})

const chargeCode = wrap(async (req, res, next) => {
  const callback = await PaymentService.chargeCode(req.body.code, req.user_id);

  return callback.stack ? next(callback) : success(res, { wallet: callback }, 200, ' تم تحصيل الكود بنجاح')
})


const getAllChargeCodes = wrap(async (req, res) => {
  const chargeCodes = await PaymentService.getAllChargeCodes();
  return success(res, { chargeCodes }, 200, ' تم عرض كل الكود بنجاح')
})



export {
  generateInvoice,
  generateInvoiceWebhook,
  deletePayment,
  getPayment,
  getAllPayments,
  generateChargeCode,
  chargeCode,
  deleteChargeCode,
  getAllChargeCodes,
  updateChargeCode,
  generateWalletInvoice,
  payWithWallet
}