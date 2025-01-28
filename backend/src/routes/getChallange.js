const express = require("express");
const { doc, getDoc } = require("firebase/firestore");
const db = require('../models/Firebase'); // Import the Firestore instance

const getchallenge = express.Router();

getchallenge.get("/get-challenge/:id", async (req, res) => {
  try {
    const { id } = req.params; // Get the `id` from the route parameters

    // Create a reference to the document
    const docRef = doc(db, "questions", id); // 'questions' is the Firestore collection name

    // Fetch the document from Firestore
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return res.status(404).json({ message: "Challenge not found" });
    }

    // Extract the document data
    const challenge = { id: docSnap.id, ...docSnap.data() };

    res.status(200).json(challenge);
  } catch (error) {
    console.error("Error fetching challenge:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = getchallenge;
