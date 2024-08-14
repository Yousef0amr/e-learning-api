import { Router } from 'express';
import {
    addCoupon,
    updateCoupon,
    deleteCoupon,
    getCouponByCode,
    getAllCoupons
} from '../controllers/coupon.controller.js';
import validateRequest from '../middlewares/validateRequest.js';
import { addCouponSchema, getCouponByCodeSchema } from '../validators/coupon.validator.js';

const couponRouter = Router()


couponRouter.route('/')
    .post(validateRequest(addCouponSchema), addCoupon)

couponRouter.route('/code')
    .post(validateRequest(getCouponByCodeSchema), getCouponByCode)


couponRouter.route('/:id')
    .get(getAllCoupons)
    .patch(validateRequest(addCouponSchema), updateCoupon)
    .delete(deleteCoupon);



export default couponRouter
