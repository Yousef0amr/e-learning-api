import { Router } from 'express';
import { generateInvoice } from '../controllers/payment.controller.js';


const paymentRouter = Router()


paymentRouter.route('/generate-invoice')
    .post(generateInvoice)




export default paymentRouter
