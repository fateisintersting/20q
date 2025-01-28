const express = require('express');
const { collection, getDocs } = require('firebase/firestore');
const db = require('../models/Firebase'); // Import the Firestore instance

const getQuestion = express.Router();

getQuestion.get('/get-challange', async (req, res) => {
    try {
        // Reference the Firestore collection
        const querySnapshot = await getDocs(collection(db, 'questions')); // 'questions' is the Firestore collection name
        
        // Map Firestore documents into an array
        const challange = querySnapshot.docs.map(doc => ({
            id: doc.id, // Include document ID if needed
            ...doc.data() // Spread document data
        }));

        res.status(200).json({
            success: true,
            data: challange,
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
});

module.exports = getQuestion;
