const express = require('express');
const router = express.Router();
const Question = require('../models/question');

// Route to get all questions
router.get('/', async (req, res) => {
    try {
        const questions = await Question.find().populate("author").sort({createdAt: -1});
        res.json(questions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Route to get a single question by ID
router.get('/:id', async (req, res) => {
    try {
        const question = await Question.findById(req.params.id).populate("author");
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }
        res.json(question);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Route to create a new question
router.post('/', async (req, res) => {
    const { title, author, content, tags } = req.body;
    if (!title || !author || !content || !tags) {
        return res.status(400).json({ message: "Missing required fields" });
    }
    
    const question = new Question({
        title, author, content, tags
    });

    try {
        const newQuestion = await question.save();
        res.status(201).json(newQuestion);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Route to update a question
router.put("/:id", async (req, res) => {
    const question = await Question.findById(req.params.id);
    const updates = {};
    for (let field of ["title", "content", "tags", "upVotes", "downVotes"]) {
        if (req.body[field]) {
            if(field === "upVotes")
                updates[field] = [...question.upVotes, req.body[field]];
            else if(field === "downVotes")
                updates[field] = [...question.downVotes, req.body[field]];
            else
                updates[field] = req.body[field];
        }
    }

    // If no valid updates were provided, send back an empty object
    if (Object.keys(updates).length === 0) {
        return res.json({});
    }

    try {
        const updatedQuestion = await Question.findByIdAndUpdate(req.params.id, updates, { new: true });
        res.json(updatedQuestion);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
})

module.exports = router;
