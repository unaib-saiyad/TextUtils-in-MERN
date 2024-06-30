const express = require('express');
const router = express.Router();
const Note = require('../models/Notes');
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');


// GET resquest to fetch all notes at: "/api/notes/fetchallnotes"
router.get('/fetchallnotes/', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Some error occured!..." });
    }
});

// POST resquest to Create new note at: "/api/notes/createnote"
router.post('/createnote/', fetchuser, [
    body('title', 'Enter title atleast of 3 character').isLength({ min: 3 }),
    body('description', 'Enter description atleast of 5 characters').isLength({ min: 3 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }
    try {
        const { title, description, tag } = req.body;
        const note = new Note({
            title, description, tag, user: req.user.id
        });
        obj = await note.save();
        res.json(obj);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Some error occured!..." });
    }
});

// PUT resquest to update a note at: "/api/notes/updatenote"
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        let newNote = {};
        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        if (tag) { newNote.tag = tag }
        let note = await Note.findById(req.params.id);
        if (!note) {
            res.status(404).json({ error: "Note doesn't exists!..." });
        }
        if (req.user.id !== note.user.toString()) { res.status(401).json({ error: "Unautherized access!..." }); }
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json(note);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Some error occured!..." });
    }
});

// DELETE resquest to delete a note at: "/api/notes/deletenote"
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        let note = await Note.findById(req.params.id);
        if (!note) {
            res.status(404).json({ error: "Note doesn't exists!..." });
        }
        if (req.user.id !== note.user.toString()) { res.status(401).json({ error: "Unautherized access!..." }); }
        note = await Note.findByIdAndDelete(req.params.id)
        res.json(note);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Some error occured!..." });
    }
});

module.exports = router;