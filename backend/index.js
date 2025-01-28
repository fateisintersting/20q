const express = require('express');
const cors = require('cors');
const saveQuestion = require('./src/routes/saveQuestion');
const getQuestion = require('./src/routes/getQuestion');
const getchallenge = require('./src/routes/getChallange');
const chatRouter = require('./src/routes/chat');

require('dotenv').config();


const app = express();

// Middleware
app.use(cors());
app.use(express.json());


app.use('/api', saveQuestion);
app.use('/api',getQuestion);
app.use('/api',getchallenge);
app.use('/api',chatRouter);
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
