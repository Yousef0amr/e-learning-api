import ApiError, { success } from '../utils/apiResponse.js';
import wrap from 'express-async-wrap'
import axios from 'axios';


const getAuthToken = wrap(
  async () => {
    const authData = {
      api_key: process.env.PAYMOB_API_KEY // Using environment variable
    };

    const response = await axios.post('https://accept.paymob.com/api/auth/tokens', authData);
    return response.data.token;
  });


const createOrder = wrap(async (authToken, orderData) => {
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
    amount_cents: (orderData.price * 100), // amount in cents (e.g., 10.00 EGP)
    currency: "EGP",
    items: [
      {
        name: orderData.title,
        amount_cents: (orderData.price * 100),
        description: orderData.description,
        quantity: "1"
      }
    ]
  };

  const response = await axios.post('https://accept.paymob.com/api/ecommerce/orders', orderDetails);
  return response.data;
});


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
    // Payment was successful, update the order status in your database
    console.log(`Payment successful for order ${callbackData.order}`);
  } else {
    // Payment failed or was canceled, update the order status accordingly
    console.error(`Payment failed for order ${callbackData.order}`);
  }

  // Respond to Paymob
  res.status(200).send('Callback received');
});


const generateInvoice = wrap(async (req, res) => {
  const authToken = await getAuthToken();
  const order = await createOrder(authToken, req.body);

  const invoiceUrl = order.url;
  success(res, { invoiceUrl }, 200, 'OK')
})




export {
  generateInvoice,
  generateInvoiceWebhook
}