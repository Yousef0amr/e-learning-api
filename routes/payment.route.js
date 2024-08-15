import { Router } from 'express';
import { generateInvoice, generateInvoiceWebhook } from '../controllers/payment.controller.js';
import multerConfig from '../utils/multer.js';


const paymentRouter = Router()


paymentRouter.route('/generate-invoice')
    .post(multerConfig().single(''), generateInvoice)

paymentRouter.route('/generate-invoice-webhook')
    .post(generateInvoiceWebhook)






export default paymentRouter
