import Joi from "joi";

const addCouponSchema = Joi.object({
    course_id: Joi.number().required(),
    code: Joi.string().required(),
    discountPercentage: Joi.number().required(),
    expiry_date: Joi.date().required()
})

const getCouponByCodeSchema = Joi.object({
    code: Joi.string().required(),
})





export {
    addCouponSchema,
    getCouponByCodeSchema
}