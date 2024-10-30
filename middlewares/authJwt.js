import { expressjwt } from "express-jwt";
import model from "../models/index.js";
import endpoints from "../utils/endpoints.js";

const User = model.User

const checkUrl = (req, allowedRoutes) => {
    const matches = allowedRoutes.some(route => {
        const [routePath, routeQuery] = route.url.split('?'); // Split path and query string
        const [reqPath, reqQuery] = req.originalUrl.split('?'); // Split request URL and query string

        // Handle dynamic segments in the path like :id
        const urlPattern = new RegExp(`^${routePath.replace(/:id/g, '\\d+')}$`);

        // Match query parameters (if any)
        let queryMatch = true;
        if (routeQuery && reqQuery) {
            const routeQueryParams = new URLSearchParams(routeQuery);
            const reqQueryParams = new URLSearchParams(reqQuery);

            routeQueryParams.forEach((value, key) => {
                if (value.startsWith(':')) {
                    // If the route has a dynamic parameter, just check if the key exists in reqQueryParams
                    if (!reqQueryParams.has(key)) {
                        queryMatch = false;
                    }
                } else {
                    // Exact match required for other query parameters
                    if (reqQueryParams.get(key) !== value) {
                        queryMatch = false;
                    }
                }
            });
        }

        return (
            req.method === route.method &&
            urlPattern.test(reqPath) &&
            queryMatch
        );
    });

    return matches;
};




const userAllowedUrls = [
    { method: 'GET', url: `${endpoints.USER}/current-user` },
    { method: 'PATCH', url: `${endpoints.USER}/current-user` },
    { method: 'DELETE', url: `${endpoints.USER}/current-user` },
    { method: 'POST', url: `${endpoints.USER}/change-password` },
    { method: 'POST', url: `${endpoints.USER}/logout` },
    //level urls
    { method: 'GET', url: `${endpoints.LEVEL}/:id` },
    //course urls
    { method: 'GET', url: `${endpoints.COURSE}/:id` },
    //coupon urls
    { method: 'POST', url: `${endpoints.COUPON}/code` },
    //course urls
    { method: 'GET', url: `${endpoints.USER}/my-courses` },
    { method: 'GET', url: `${endpoints.USER}/my-courses/:id` },
    //payment urls
    { method: 'POST', url: `${endpoints.PAYMENT}/generate-invoice` },
    { method: 'POST', url: `${endpoints.PAYMENT}/generate-wallet-invoice` },
    { method: 'GET', url: `${endpoints.PAYMENT}` },
    { method: 'POST', url: `${endpoints.PAYMENT}/charge-code` },
    { method: 'POST', url: `${endpoints.PAYMENT}/pay-with-wallet` },
    //quiz urls
    { method: 'GET', url: `${endpoints.QUIZ}/:id` },
    { method: 'GET', url: `${endpoints.QUIZ}?id=:id` },
    { method: 'POST', url: `${endpoints.QUIZ}/:id` },
    //notes urls 
    { method: 'GET', url: `${endpoints.LESSON}/:id/notes` },
    { method: 'POST', url: `${endpoints.LESSON}/:id/notes` },
    { method: 'PATCH', url: `${endpoints.LESSON}/notes/:id` },
    { method: 'DELETE', url: `${endpoints.LESSON}/notes/:id` },
    //questions urls 
    { method: 'GET', url: `${endpoints.LESSON}/:id/questions?page=:page&limit=:limit` },
    { method: 'POST', url: `${endpoints.LESSON}/:id/questions` },
    { method: 'PUT', url: `${endpoints.LESSON}/questions/:id` },
    { method: 'DELETE', url: `${endpoints.LESSON}/questions/:id` },
    { method: 'GET', url: `${endpoints.LESSON}/questions/:id/answers?page=:page&limit=:limit` },
    { method: 'POST', url: `${endpoints.LESSON}/questions/:id/answers` },
    { method: 'PUT', url: `${endpoints.LESSON}/answers/:id` },
    { method: 'DELETE', url: `${endpoints.LESSON}/answers/:id` },

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
                    req.username = user.userName
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
        { url: `${user}/admin/login`, method: ["POST", "OPTIONS"] },
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