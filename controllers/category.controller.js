import categoryService from '../services/category.service.js';
import ApiError, { success } from '../utils/apiResponse.js';
import wrap from 'express-async-wrap'

const addCategory = wrap(async (req, res, next) => {
    const category = await categoryService.addCategory(req.body)
    return success(res, category, 201, 'category created successfully')
})

const updateCategory = wrap(async (req, res, next) => {
    const category = await categoryService.getCategory(req.params.id)
    if (!category)
        return next(new ApiError('category not found', 404))
    const updatedCategory = await categoryService.updateCategory(req.body, req.params.id)

    return success(res, { category: updatedCategory }, 200)
})

const deleteCategory = wrap(async (req, res, next) => {
    const category = await categoryService.getCategory(req.params.id)
    if (!category)
        return next(new ApiError('category not found', 404))
    await categoryService.deleteCategory(req.params.id)
    return success(res, { category }, 200)
})



const getAllCategories = wrap(async (req, res, next) => {

    const categories = await categoryService.getAllCategories(req.params.id)
    return success(res, { categories }, 200)
})



export {
    addCategory,
    updateCategory,
    deleteCategory,
    getAllCategories
}

