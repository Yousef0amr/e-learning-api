import { Router } from 'express';
import { generateInvoice, generateInvoiceWebhook, getAllPayments, getPayment, deletePayment } from '../controllers/payment.controller.js';
import multerConfig from '../utils/multer.js';


const paymentRouter = Router()


paymentRouter.route('/generate-invoice')
    .post(multerConfig().single(''), generateInvoice)

paymentRouter.route('/generate-invoice-webhook')
    .post(generateInvoiceWebhook)


paymentRouter.route('/')
    .get(getAllPayments);

paymentRouter.route('/:id')
    .get(getPayment)
    .delete(deletePayment);


export default paymentRouter
