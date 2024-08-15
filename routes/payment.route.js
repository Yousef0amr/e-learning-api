import { Router } from 'express';
import { generateInvoice, generateInvoiceWebhook } from '../controllers/payment.controller.js';


const paymentRouter = Router()


paymentRouter.route('/generate-invoice')
    .post(generateInvoice)

paymentRouter.route('/generate-invoice-webhook')
    .post(generateInvoiceWebhook)






export default paymentRouter
