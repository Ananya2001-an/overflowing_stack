const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Route to get user based on email and password
router.post('/', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.find({email, password});
        if(user.length == 0) {
            res.status(404).json({ message: 'User not found' });
        } else {
            res.json(user);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});


module.exports = router;
