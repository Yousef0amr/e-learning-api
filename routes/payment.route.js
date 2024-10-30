import { Router } from 'express';
import { generateInvoice, generateInvoiceWebhook, generateWalletInvoice, getAllPayments, deletePayment, generateChargeCode, chargeCode, deleteChargeCode, getAllChargeCodes, updateChargeCode, payWithWallet } from '../controllers/payment.controller.js';
import multerConfig from '../utils/multer.js';
import validateRequest from '../middlewares/validateRequest.js';
import { addChargeCodeSchema, chargeCodeSchema, payWithWalletSchema } from '../validators/user.validator.js';

const paymentRouter = Router()


paymentRouter.route('/generate-invoice')
    .post(multerConfig().single(''), generateInvoice)

paymentRouter.route('/generate-invoice-webhook')
    .post(generateInvoiceWebhook)

paymentRouter.route('/generate-wallet-invoice')
    .post(multerConfig().single(''), generateWalletInvoice)

paymentRouter.route('/pay-with-wallet')
    .post(multerConfig().single(''), validateRequest(payWithWalletSchema), payWithWallet)

paymentRouter.route('/')
    .get(getAllPayments);

paymentRouter.route('/:id')
    .delete(deletePayment);


paymentRouter.route('/generate-charge-code')
    .post(multerConfig().single(''), validateRequest(addChargeCodeSchema), generateChargeCode)

paymentRouter.route('/charge-code')
    .post(multerConfig().single(''), validateRequest(chargeCodeSchema), chargeCode)
    .get(getAllChargeCodes)

paymentRouter.route('/charge-code/:id')
    .delete(deleteChargeCode)
    .patch(multerConfig().single(''), validateRequest(addChargeCodeSchema), updateChargeCode)





export default paymentRouter
