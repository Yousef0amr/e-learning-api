import sectionService from '../services/section.service.js';
import ApiError, { success } from '../utils/apiResponse.js';
import wrap from 'express-async-wrap'

const addSection = wrap(async (req, res, next) => {
    const section = await sectionService.addSection(req.body)
    return success(res, section, 201, 'section created successfully')
})

const updateSection = wrap(async (req, res, next) => {
    const section = await sectionService.getSection(req.params.id)
    if (!section)
        return next(new ApiError('section not found', 404))
    const updatedSection = await sectionService.updateSection(req.body, req.params.id)

    return success(res, { section: updatedSection }, 200)
})

const deleteSection = wrap(async (req, res, next) => {
    const section = await sectionService.getSection(req.params.id)
    if (!section)
        return next(new ApiError('section not found', 404))
    await sectionService.deleteSection(req.params.id)
    return success(res, { section }, 200)
})

const getSection = wrap(async (req, res, next) => {
    const section = await sectionService.getSection(req.params.id)
    if (!section)
        return next(new ApiError('section not found', 404))
    return success(res, { section }, 200)
})

const getAllSections = wrap(async (req, res, next) => {
    const id = req.params.id
    const sections = await sectionService.getAllSections(id)
    return success(res, { sections }, 200)
})



export {
    addSection,
    updateSection,
    deleteSection,
    getSection,
    getAllSections
}

