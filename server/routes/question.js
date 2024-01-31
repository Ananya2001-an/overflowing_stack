const express = require('express');
const router = express.Router();
const Question = require('../models/question');

// Route to get all questions
router.get('/', async (req, res) => {
    try {
        const questions = await Question.find();
        res.json(questions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Route to get a single question by ID
router.get('/:id', async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }
        res.json(question);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});


module.exports = router;
