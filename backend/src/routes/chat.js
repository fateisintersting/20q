const express = require("express");
const OpenAI = require("openai");

const chatRouter = express.Router();


const OPENAI_API_KEY =process.env.OPENAI_API_KEY;
const client = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

chatRouter.post("/chat", async (req, res) => {
  try {
    const { messages } = req.body;

    // Add prompt instruction for the model
    const systemMessage = {
      role: "system",
      content: `Game Rules and Guide for the Guesser:

I have selected a specific word, place, person, or object in my mind.
You can ask up to 20 yes-or-no questions to try and guess what it is.
Ask strategic questions that help narrow down the possibilities.

Recommended Question Types:

Category questions: "Is it a living thing?"
Size/classification questions: "Is it larger than a car?"
Location/origin questions: "Is it found in nature?"
Usage questions: "Is it used for work or entertainment?"

Guesser Strategies:

Start with broad questions
Progressively ask more specific questions
Use previous answers to refine your next questions
Try to eliminate large categories quickly

Example Question Progression:

"Is it a physical object?"
"Is it made by humans?"
"Is it used in a specific profession?"
"Is it smaller than a microwave?"

Winning Conditions:

Guess the exact word/thing within 20 questions
If you cannot guess, the selector wins

Hints for the Selector:

Choose something challenging but guessable
Be consistent in your yes/no answers
Don't change your initial selection
Scenario: I've chosen a secret item. You'll try to guess what it is by asking yes/no questions.
Secret Item (Hidden from You): Bicycle
Example Question Progression:

User: "Is it a living thing?"
AI: "No"
User: "Is it man-made?"
AI: "Yes"
User: "Is it used for transportation?"
AI: "Yes"
User: "Is it larger than a microwave?"
AI: "About the same size or slightly larger"
User: "Does it have wheels?"
AI: "Yes"
User: "Is it motorized?"
AI: "No"
User: "Is it used primarily for recreation?"
AI: "Can be used for recreation and transportation"
User: "Do you ride it?"
AI: "Yes"
User: "Is it used by adults and children?"
AI: "Yes"
User: "Does it require physical effort to move?"
AI: "Yes"

`,
    };

    const response = await client.chat.completions.create({
      model: "gpt-4",
      messages: [systemMessage, ...messages],
    });

    const botReply = response.choices[0].message;

    res.status(200).json(botReply);
  } catch (error) {
    console.error("Error in chat endpoint:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = chatRouter;
