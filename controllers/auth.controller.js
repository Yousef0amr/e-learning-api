
import authService from "../services/auth.service.js"
import ApiError, { success } from "../utils/apiResponse.js"
import wrap from 'express-async-wrap'

const register = wrap(async (req, res, next) => {
    const callback = await authService.register(req.body)

    return callback.stack ? next(callback) : success(res, { accessToken: callback.accessToken, refreshToken: callback.refreshToken }, 201, 'OK')
})

const login = wrap(async (req, res, next) => {
    const callback = await authService.login(req.body);
    return callback.stack ? next(callback) : success(res, { accessToken: callback.accessToken, refreshToken: callback.refreshToken }, 201, 'OK')
})



const logout = wrap(async (req, res) => {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');

    return success(res, {}, 204, 'OK')
})



const restPassword = wrap(async (req, res, next) => {
    const callback = await authService.restPassword(req.body)
    return callback.stack ? next(callback) : success(res, { isChanged: true }, 200, "Password has been changed successfully")
})


const changePassword = wrap(async (req, res, next) => {
    const callback = await authService.changePassword(req.body, req.user_id)
    return callback.stack ? next(callback) : success(res, { isChanged: true }, 200, "Password has been changed successfully")
})

const forgetPassword = wrap(async (req, res, next) => {
    const { email } = req.body
    const callback = await authService.forgetPassword(email)
    return callback.stack ? next(callback) : success(res, { secret: callback.secret }, 200, 'Check your email for the OTP')
})

const verifyEmail = wrap(async (req, res, next) => {
    const callback = await authService.verifyEmail(req.body)
    return callback.stack ? next(callback) : success(res, { isVerified: callback }, 200, 'email verified')
})

const checkEmail = wrap(async (req, res, next) => {
    const { email } = req.body
    const callback = await authService.checkEmail(email)
    return callback.stack ? next(callback) : success(res, { secret: callback.secret }, 200, 'Check your email for the OTP')
})



const resendCode = wrap(async (req, res, next) => {
    const { email } = req.body

    const info = await authService.sendCode(email)
    if (!info.messageInfo)
        return next(new ApiError('failed to send message'))

    return success(res, { secret: info.otpSecret }, 200, 'Check your email for the OTP')
})

const refresh = wrap(async (req, res, next) => {
    const { refreshToken } = req.body;

    const callback = await authService.refresh(refreshToken);

    return callback.stack ? next(callback) : success(res, { accessToken: callback.accessToken }, 200)
})

export {
    register,
    login,
    forgetPassword,
    restPassword,
    verifyEmail,
    checkEmail,
    refresh,
    changePassword,
    resendCode,
    logout
}






