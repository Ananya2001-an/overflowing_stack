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

router.post('/', async (req, res) => {
    // Check for required fields
    const { name, email, password } = req.body; // Destructuring assignment syntax
    if (!name || !email || !password) {
        return res.status(400).json({ message: "Missing required fields" });
    }
    
    // Create new user object from request body
    const user = new User({
        name, email, password
    });

    // Save the new user in database and send response back with status 201 (Created)
    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
