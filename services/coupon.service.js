import { Op } from 'sequelize';
import model from './../models/index.js';
const { Coupon } = model;

const getCoupon = async (id) => {
    return await Coupon.findByPk(id);
}

const getCouponByCode = async (code) => {
    return await Coupon.findOne({
        where: {
            code
        }
    });
}

const getAllCoupons = async (id) => {
    return await Coupon.findAll(
        {
            where: {
                course_id: id
            }
        }
    );
}

const addCoupon = async (couponDto) => {
    return await Coupon.create({ ...couponDto });
}

const updateCoupon = async (updateCouponDto, id) => {
    return await Coupon.update(
        { ...updateCouponDto },
        { where: { coupon_id: { [Op.eq]: id } } }
    );
}

const deleteCoupon = async (id) => {
    return await Coupon.destroy({
        where: { coupon_id: { [Op.eq]: id } }
    });
}

const couponService = {
    getAllCoupons,
    getCoupon,
    addCoupon,
    updateCoupon,
    deleteCoupon,
    getCouponByCode
}

export default couponService;
