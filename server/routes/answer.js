const express = require('express');
const router = express.Router();
const Answer = require('../models/answer');

// Route to get all answers
router.get('/', async (req, res) => {
    try {
        const answers = await Answer.find();
        res.json(answers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Route to get a single answer by ID
router.get('/:id', async (req, res) => {
    try {
        const answer = await Answer.findById(req.params.id);
        if (!answer) {
            return res.status(404).json({ message: 'Answer not found' });
        }
        res.json(answer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});


module.exports = router;
