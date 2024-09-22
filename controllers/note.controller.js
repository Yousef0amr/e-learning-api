import noteService from '../services/note.service.js';
import ApiError, { success } from '../utils/apiResponse.js';
import wrap from 'express-async-wrap';

const addNote = wrap(async (req, res, next) => {
    req.body.user_id = req.user_id
    req.body.lesson_id = req.params.id
    const note = await noteService.addNote(req.body);
    return success(res, note, 201, 'Note created successfully');
});

const updateNote = wrap(async (req, res, next) => {
    const note = await noteService.getNote(req.params.id);
    if (!note) return next(new ApiError('Note not found', 404));

    const updatedNote = await noteService.updateNote(req.body, req.params.id, req.user_id);
    return success(res, { note: updatedNote }, 200);
});

const deleteNote = wrap(async (req, res, next) => {
    const note = await noteService.getNote(req.params.id, req.user_id);
    if (!note) return next(new ApiError('Note not found', 404));

    await noteService.deleteNote(req.params.id, req.user_id);
    return success(res, { note }, 200);
});

const getAllNotes = wrap(async (req, res, next) => {
    const notes = await noteService.getAllNotes(req.params.id, req.user_id);
    return success(res, { notes }, 200);
});

export {
    addNote,
    updateNote,
    deleteNote,
    getAllNotes
};
