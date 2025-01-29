const express =  require('express');
const { collection, addDoc } = require('firebase/firestore');
const db  =  require('./../models/Firebase'); // Import the Firestore instance

const saveQuestion = express.Router();

saveQuestion.post('/question', async (req, res) => {
    try {
        const { guessword, category, context } = req.body;

        if (!guessword || !category || !context) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Add data to Firestore
        const newQuestion = {
            guessword,
            category,
            context,
            createdAt: new Date().toISOString(),
        };

        const docRef = await addDoc(collection(db, 'questions'), newQuestion); // 'questions' is the Firestore collection name

        console.log('Document written with ID:', docRef.id);
        res.status(201).json({ message: 'Data saved successfully', id: docRef.id, data: newQuestion });
    } catch (error) {
        console.error('Error adding document:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = saveQuestion;
