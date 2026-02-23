const Note = require('../models/note');
const User = require('../models/user');

// Create a new note (protected route)
exports.createNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const newNote = new Note({
            title,
            content,
            user: req.user._id
        });
        await newNote.save();
        res.status(201).json(newNote);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all notes for the logged-in user (protected route)
exports.getUserNotes = async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user._id }).sort({ _id: -1 });
        res.json(notes);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get a specific note by ID (protected route)
exports.getNoteById = async (req, res) => {
    try {
        const note = await Note.findOne({ _id: req.params.id, user: req.user._id });
        
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }
        
        res.json(note);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Update a note (protected route)
exports.updateNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const note = await Note.findOne({ _id: req.params.id, user: req.user._id });
        
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }
        
        note.title = title || note.title;
        note.content = content || note.content;
        await note.save();
        
        res.json(note);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete a note (protected route)
exports.deleteNote = async (req, res) => {
    try {
        const note = await Note.findOneAndDelete({ _id: req.params.id, user: req.user._id });
        
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }
        
        res.json({ message: 'Note deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// ==================== ADMIN FUNCTIONS ====================

// Admin: Get all users (protected, admin only)
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Admin: Get all notes (protected, admin only)
exports.getAllNotes = async (req, res) => {
    try {
        const notes = await Note.find().populate('user', 'username email');
        res.json(notes);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Admin: Delete any note by ID (protected, admin only)
exports.deleteAnyNote = async (req, res) => {
    try {
        const note = await Note.findByIdAndDelete(req.params.id);
        
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }
        
        res.json({ message: 'Note deleted successfully', note });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
