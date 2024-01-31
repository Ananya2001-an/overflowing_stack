const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const questionRoutes = require('./routes/question');
const answerRoutes = require('./routes/answer');
const authRoutes = require('./routes/auth');

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
  })
);
const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/overflowing_stack', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => { console.log('Connected to DB'); });

// Routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/questions', questionRoutes);
app.use('/answers', answerRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
