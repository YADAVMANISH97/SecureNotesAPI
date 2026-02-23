const router = require('express').Router();
const { 
    createNote, 
    getUserNotes, 
    getNoteById, 
    updateNote, 
    deleteNote,
    getAllUsers,
    getAllNotes,
    deleteAnyNote
} = require('../controllers/noteController');
const auth = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin');

// ==================== ADMIN ROUTES (must be before /:id routes) ====================
// Admin: Get all users (protected, admin only)
router.get('/admin/users', auth, isAdmin, getAllUsers);

// Admin: Get all notes (protected, admin only)
router.get('/admin/all', auth, isAdmin, getAllNotes);

// Admin: Delete any note by ID (protected, admin only)
router.delete('/admin/:id', auth, isAdmin, deleteAnyNote);

// ==================== USER ROUTES ====================
// Create a new note (protected route)
router.post('/', auth, createNote);

// Get all notes for the logged-in user (protected route)
router.get('/', auth, getUserNotes);

// Get a specific note by ID (protected route)
router.get('/:id', auth, getNoteById);

// Update a note (protected route)
router.put('/:id', auth, updateNote);

// Delete a note (protected route)
router.delete('/:id', auth, deleteNote);

module.exports = router;