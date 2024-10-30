import { Router } from "express";
import validateRequset from "../middlewares/validateRequest.js";
import { changePasswordSchema, checkEmailSchema, loginSchema, loginAdminSchema, registerSchema, resetPasswordSchema, verifyEmailSchema } from "../validators/auth.validator.js";
import { login, register, checkEmail, verifyEmail, changePassword, refresh, forgetPassword, restPassword, resendCode, logout } from "../controllers/auth.controller.js";
import { deleteUser, getAllUsers, getUser, updateUser } from "../controllers/user.controller.js";
import { updateUserSchema } from "../validators/user.validator.js";
import { getEnrollment, getUserEnrollments } from "../controllers/enrollment.controller.js";

const userRouter = Router()


userRouter.post('/register', validateRequset(registerSchema), register)
userRouter.post('/login', validateRequset(loginSchema), login)

userRouter.post('/admin/login', validateRequset(loginAdminSchema), login)

userRouter.post('/refresh', refresh)
userRouter.post('/check-email', validateRequset(checkEmailSchema), checkEmail)
userRouter.post('/verify-email', validateRequset(verifyEmailSchema), verifyEmail)
userRouter.post('/change-password', validateRequset(changePasswordSchema), changePassword)
userRouter.post('/forget-password', validateRequset(checkEmailSchema), forgetPassword)
userRouter.post('/reset-password', validateRequset(resetPasswordSchema), restPassword)
userRouter.post('/resend-code', validateRequset(checkEmailSchema), resendCode)
userRouter.post('/logout', logout)
userRouter.get('/', getAllUsers)
userRouter.route('/current-user')
    .get(getUser)
    .patch(validateRequset(updateUserSchema), updateUser)
    .delete(deleteUser)

userRouter.route('/my-courses')
    .get(getUserEnrollments)

userRouter.route('/my-courses/:id')
    .get(getEnrollment)




export default userRouter