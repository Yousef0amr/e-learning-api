import ApiError, { success } from '../utils/apiResponse.js';
import wrap from 'express-async-wrap'
import PaymentService from '../services/payment.service.js'
import enrollmentService from '../services/enrollment.service.js'



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

    await enrollmentService.addEnrollment({
      user_id: callbackData.obj.order.data.user_id,
      course_id: callbackData.obj.order.data.course_id,
      payment_id: payment.payment_id
    })

  } else {
    // Payment failed or was canceled, update the order status accordingly
    return next(new ApiError('Payment failed', 400))
  }

  return success(res, {}, 200, 'OK')
});


const generateInvoice = wrap(async (req, res) => {
  const authToken = await PaymentService.getAuthToken();
  const order = await PaymentService.createCheckoutSession(authToken, req.body, req.user_id);

  return success(res, { invoiceUrl: order.url }, 200, 'OK')
})




export {
  generateInvoice,
  generateInvoiceWebhook,
  deletePayment,
  getPayment,
  getAllPayments,
}