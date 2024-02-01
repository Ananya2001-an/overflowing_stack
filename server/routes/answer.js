const express = require('express');
const router = express.Router();
const Answer = require('../models/answer');

// Route to get all answers for a question based on its id
router.get('/:qid', async (req, res) => {
    try {
        const answers = await Answer.find({question: req.params.qid});
        res.json(answers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
