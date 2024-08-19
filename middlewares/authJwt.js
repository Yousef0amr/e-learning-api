import { expressjwt } from "express-jwt";
import model from "../models/index.js";
import endpoints from "../utils/endoints.js";

const User = model.User


const checkUrl = (req, allowedRoutes) => {
    const matches = allowedRoutes.some(route =>
        req.method === route.method &&
        req.originalUrl.includes(route.url)
    );
    return matches;
};

const paymentAllowedUrls = [
    { method: 'POST', url: `${endpoints.PAYMENT}/generate-invoice` },
]


const userAllowedUrls = [
    { method: 'GET', url: `${endpoints.USER}/current-user` },
    { method: 'PATCH', url: `${endpoints.USER}/current-user` },
    { method: 'DELETE', url: `${endpoints.USER}/current-user` },
    { method: 'POST', url: `${endpoints.USER}/change-password` },
    { method: 'POST', url: `${endpoints.USER}/logout` },
    { method: 'GET', url: `${endpoints.LEVEL}` },
    { method: 'GET', url: `${endpoints.COURSE}` },
    { method: 'POST', url: `${endpoints.COUPON}/code` },
    { method: 'GET', url: `${endpoints.USER}/my-courses` },
    { method: 'GET', url: `${endpoints.USER}/my-courses/:id` },
    ...paymentAllowedUrls

]

const isRevokedCallBack = async (req, token) => {
    const userId = token.payload.user_id
    const role = token.payload.role
    req.user_id = userId
    let isAllowed = false
    switch (role) {
        case "User":
            isAllowed = checkUrl(req, userAllowedUrls);
            if (isAllowed) {
                const user = await User.findByPk(userId)
                if (user) {
                    return false
                }
                return true
            }
            return true
        case "Admin":
            return false
        default:
            return true
    }
}

const authRegxOperations = (user) => {
    const allowedUrls = [
        { url: `${user}/login`, method: ["POST", "OPTIONS"] },
        { url: `${user}/register`, method: ["POST", "OPTIONS"] },
        { url: `${user}/check-email`, method: ["POST", "OPTIONS"] },
        { url: `${user}/resend-code`, method: ["POST", "OPTIONS"] },
        { url: `${user}/forget-password`, method: ["POST", "OPTIONS"] },
        { url: `${user}/verify-email`, method: ["POST", "OPTIONS"] },
        { url: `${user}/reset-password`, method: ["POST", "OPTIONS"] },
        { url: `${user}/refresh`, method: ["POST", "OPTIONS"] },

    ];

    return allowedUrls;
};



const authJwt = () => {
    return expressjwt({
        secret: process.env.ACCESS_TOKEN_SECRET,
        algorithms: ['HS256'],
        isRevoked: isRevokedCallBack,

    }).unless(
        {
            path: [
                ...authRegxOperations(endpoints.USER),
                { url: /^\/uploads\/.*$/, methods: ['GET', 'OPTIONS'] },
                { method: 'GET', url: `${endpoints.LEVEL}` },
                { method: 'POST', url: `${endpoints.PAYMENT}/generate-invoice-webhook` },

            ]
        }
    )
}




export default authJwt