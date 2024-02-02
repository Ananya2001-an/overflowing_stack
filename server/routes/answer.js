const express = require('express');
const router = express.Router();
const Answer = require('../models/answer');

// Route to get all answers for a question based on its id
router.get('/:qid', async (req, res) => {
    try {
        const answers = await Answer.find({question: req.params.qid}).populate("author");
        res.json(answers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Route to create a new answer
router.post("/", async (req, res) => {
    const { content, author, question } = req.body;
    if (!author || !content || !question) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    const answer = new Answer({
        content, author, question
    });

    try{
       const newAnswer = await answer.save();
        res.status(201).json(newAnswer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
})

module.exports = router;
