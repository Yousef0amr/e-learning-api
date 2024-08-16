import ApiError, { success } from '../utils/apiResponse.js';
import wrap from 'express-async-wrap'
import PaymentService from '../services/payment.service.js'




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

    console.log(callbackData.obj);
  } else {
    // Payment failed or was canceled, update the order status accordingly
    console.error(`Payment failed for order ${callbackData.obj.order}`);
  }

  return success(res, {}, 200, 'OK')
});


const generateInvoice = wrap(async (req, res) => {
  const authToken = await PaymentService.getAuthToken();
  const order = await PaymentService.createCheckoutSession(authToken, req.body);

  const invoiceUrl = order.url;
  return success(res, { invoiceUrl }, 200, 'OK')
})




export {
  generateInvoice,
  generateInvoiceWebhook,
  deletePayment,
  getPayment,
  getAllPayments,
}