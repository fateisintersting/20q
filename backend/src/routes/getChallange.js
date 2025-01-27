const express = require("express");
const { QuestionModal } = require("../models/Question");
const getchallenge = express.Router();

getchallenge.get("/get-challenge/:id", async (req, res) => {
  try {
    const { id } = req.params; // Get the `id` from the route parameters
    const challenge = await QuestionModal.findById(id);

    if (!challenge) {
      return res.status(404).json({ message: "Challenge not found" });
    }

    res.status(200).json(challenge);
  } catch (error) {
    console.error("Error fetching challenge:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = getchallenge;
