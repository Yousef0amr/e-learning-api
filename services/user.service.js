import wrap from 'express-async-wrap'
import model from '../models/index.js'
import { Op } from 'sequelize'

const { User } = model

const getAllUsers = async () => {
    return await User.findAll({ attributes: { exclude: ['updatedAt', 'createdAt', 'password', 'refreshToken', 'role'] } })
}

const getUser = async (id) => {
    return await User.findByPk(id,
        { attributes: { exclude: ['updatedAt', 'createdAt', 'password', 'refreshToken', 'role', 'user_id'] } })
}

const updateUser = async (updateUserDto, id) => {
    return await User.update(
        updateUserDto,
        {
            where: {
                user_id: {
                    [Op.eq]: id
                }
            }
        }
    )
}

const deleteUser = async (id) => {
    return await User.destroy({
        where: {
            user_id: {
                [Op.eq]: id
            }
        }
    })

}



const userService = {
    getUser,
    updateUser,
    deleteUser,
    getAllUsers
}



export default userService