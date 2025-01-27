const express = require('express');
const { QuestionModal } = require('../models/Question');

const saveQuestion = express.Router();

saveQuestion.post('/question', async (req, res) => {
    try {
        const { guessword, category, context } = req.body;

        if (!guessword || !category || !context) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newData = new QuestionModal({ guessword, category, context });
        const savedData = await newData.save();
        console.log('Data saved successfully');
        res.status(201).json({ message: 'Data saved successfully', data: savedData });
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = saveQuestion;