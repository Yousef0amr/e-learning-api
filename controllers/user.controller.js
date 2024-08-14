
import userService from "../services/user.service.js"
import wrap from 'express-async-wrap'
import { success } from "../utils/apiResponse.js"


const getUser = wrap(async (req, res, next) => {
    const user = await userService.getUser(req.userId)
    return success(res, { user }, 200, 'OK')
})

const updateUser = wrap(async (req, res, next) => {
    const user = await userService.updateUser(req.body, req.userId)
    return success(res, { user }, 200, 'OK')
})

const deleteUser = wrap(async (req, res, next) => {
    const user = await userService.deleteUser(req.userId)
    return success(res, { user }, 200, 'OK')
})


const getAllUsers = wrap(async (req, res, next) => {
    const users = await userService.getAllUsers()
    return success(res, { users }, 200, 'OK')
})




export {
    getUser,
    updateUser,
    deleteUser,
    getAllUsers
}