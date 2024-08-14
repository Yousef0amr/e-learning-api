const getAuthToken = async () => {
    const authData = {
        api_key: process.env.PAYMOB_API_KEY // Using environment variable
    };

    try {
        const response = await axios.post('https://accept.paymob.com/api/auth/tokens', authData);
        return response.data.token;
    } catch (error) {
        console.error('Error obtaining auth token:', error.response.data);
        throw error;
    }
};


const createOrder = async (authToken) => {
    const orderData = {
        auth_token: authToken,
        api_source: "INVOICE",
        delivery_needed: "false",
        shipping_data: {
            "first_name": "Test",
            "last_name": "Account",
            "phone_number": "01010101010",
            "email": "test@account.com"
        },
        integrations: [
            4626829,
            4626674
        ],
        amount_cents: "1000", // amount in cents (e.g., 10.00 EGP)
        currency: "EGP",
        items: [
            {
                name: "Product 1",
                amount_cents: "1000",
                description: "A sample product",
                quantity: "1"
            }
        ]
    };

    try {
        const response = await axios.post('https://accept.paymob.com/api/ecommerce/orders', orderData);
        return response.data;
    } catch (error) {
        console.error('Error creating order:', error.response.data);
        throw error;
    }
};


//   app.post('/create-invoice-webhook', (req, res) => {
//     console.log('Received webhook event:', req.body);
//     const callbackData = req.body;

//     // Verify the signature (optional, for added security)
//     const expectedSignature = callbackData.hmac; // HMAC sent by Paymob
//     const secretKey = process.env.PAYMOB_HMAC_SECRET; // Your HMAC secret from Paymob
//     const computedSignature = crypto.createHmac('sha512', secretKey)
//       .update(JSON.stringify(callbackData))
//       .digest('hex');

//     if (expectedSignature !== computedSignature) {
//       console.error('Invalid signature received from Paymob');
//       return res.status(400).send('Invalid signature');
//     }

//     // Process the callback data
//     console.log('Received Paymob callback:', callbackData);

//     // Example: Update order status based on callback event
//     if (callbackData.success) {
//       // Payment was successful, update the order status in your database
//       console.log(`Payment successful for order ${callbackData.order_id}`);
//     } else {
//       // Payment failed or was canceled, update the order status accordingly
//       console.error(`Payment failed for order ${callbackData.order_id}`);
//     }

//     // Respond to Paymob
//     res.status(200).send('Callback received');
//   });


const generateInvoice = async (req, res) => {
    const authToken = await getAuthToken();
    const order = await createOrder(authToken);

    const invoiceUrl = order.url;
    success(res, { invoiceUrl }, 200, 'OK')
}