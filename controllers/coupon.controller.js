import couponService from '../services/coupon.service.js';
import ApiError, { success } from '../utils/apiResponse.js';
import wrap from 'express-async-wrap';

const addCoupon = wrap(async (req, res, next) => {
    const coupon = await couponService.addCoupon(req.body);
    return success(res, coupon, 201, 'Coupon created successfully');
});

const updateCoupon = wrap(async (req, res, next) => {
    const coupon = await couponService.getCoupon(req.params.id);
    if (!coupon)
        return next(new ApiError('Coupon not found', 404));
    const updatedCoupon = await couponService.updateCoupon(req.body, req.params.id);
    return success(res, { coupon: updatedCoupon }, 200);
});

const deleteCoupon = wrap(async (req, res, next) => {
    const coupon = await couponService.getCoupon(req.params.id);
    if (!coupon)
        return next(new ApiError('Coupon not found', 404));
    await couponService.deleteCoupon(req.params.id);
    return success(res, { coupon }, 200);
});

const getCoupon = wrap(async (req, res, next) => {
    const coupon = await couponService.getCoupon(req.params.id);
    if (!coupon)
        return next(new ApiError('Coupon not found', 404));
    return success(res, { coupon }, 200);
});

const getCouponByCode = wrap(async (req, res, next) => {
    const coupon = await couponService.getCouponByCode(req.body.code);
    if (!coupon)
        return next(new ApiError('Coupon not found', 404));
    return success(res, { coupon }, 200);
});

const getAllCoupons = wrap(async (req, res, next) => {
    const coupons = await couponService.getAllCoupons(req.params.id);
    return success(res, { coupons }, 200);
});

export {
    addCoupon,
    updateCoupon,
    deleteCoupon,
    getCoupon,
    getAllCoupons,
    getCouponByCode
};
