import wrap from 'express-async-wrap'
import model from '../models/index.js'
import { Op } from 'sequelize'

const { User, QuizResult } = model

const getAllUsers = async () => {
    return await User.findAll({ attributes: { exclude: ['updatedAt', 'createdAt', 'password', 'refreshToken', 'role'] } })
}

const getUser = async (id) => {
    return await User.findByPk(id,
        {
            include: [{ model: QuizResult, attributes: { include: ['quiz_id'] }, as: 'quizResults', where: { user_id: id }, required: false }],
            attributes: { exclude: ['updatedAt', 'createdAt', 'password', 'refreshToken', 'role', 'user_id'] }
        })
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

const deleteUser = async (password, id) => {
    const user = await User.findByPk(id)

    await user.verifyPassword(password)

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