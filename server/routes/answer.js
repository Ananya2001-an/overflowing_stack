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

// Route to update an answer
router.put("/:id", async (req, res) => {
    const answer = await Answer.findById(req.params.id);
    const updates = {};
    for (let field of ["content", "upVotes", "downVotes"]) {
        if (req.body[field]) {
            if(field === "upVotes")
                updates[field] = [...answer.upVotes, req.body[field]];
            else if(field === "downVotes")
                updates[field] = [...answer.downVotes, req.body[field]];
            else
                updates[field] = req.body[field];
        }
    }

    // If no valid updates were provided, send back an empty object
    if (Object.keys(updates).length === 0) {
        return res.json({});
    }

    try {
        const updatedAnswer = await Answer.findByIdAndUpdate(req.params.id, updates, { new: true });
        res.json(updatedAnswer);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
})

module.exports = router;
