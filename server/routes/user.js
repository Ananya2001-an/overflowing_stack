const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Route to get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Route to get a single user by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Route to create a new user
router.post('/', async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: "Missing required fields" });
    }
    
    const user = new User({
        name, email, password
    });

    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Route to update a user
router.put("/:id", async (req, res) => {
    const updates = {};
    for (let field of ["username", "email", "password"]) {
        if (req.body[field])
            updates[field] = req.body[field];
    }

    // If no valid updates were provided, send back an empty object
    if (Object.keys(updates).length === 0) {
        return res.json({});
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, updates, { new: true });
        res.json(updatedUser);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
})

module.exports = router;
