import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Solve() {
  const { id } = useParams(); // Get the dynamic `id` from the URL
  const [challenge, setChallenge] = useState(null);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [answerInput, setAnswerInput] = useState(""); // Input for final answer
  const [guessWord, setGuessWord] = useState(""); // Store the correct guess word
  const [remainingChances, setRemainingChances] = useState(13); // Limit user to 13 attempts
  const [gameStatus, setGameStatus] = useState(""); // Tracks the game result

  useEffect(() => {
    // Fetch challenge details by ID
    axios
      .get(`https://20q-wxcj.vercel.app/api/get-challenge/${id}`)
      .then((response) => {
        setChallenge(response.data);
        setGuessWord(response.data.guessword); // Set the correct guess word
        setMessages([
          {
            role: "system",
            content: `The challenge Context: ${response.data.context}. Start the conversation.`,
          },
        ]);
      })
      .catch((err) => console.error(err));
  }, [id]);

  const handleSendMessage = async () => {
    if (!userInput.trim() || remainingChances <= 0 || gameStatus) return;

    const userMessage = { role: "user", content: userInput };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);

    setUserInput(""); // Clear input
    setRemainingChances((prev) => prev - 1); // Reduce remaining chances

    // Check if user has exhausted all chances
    if (remainingChances - 1 === 0) {
      setGameStatus("You Lose! You've used all your chances.");
      return;
    }

    try {
      const response = await axios.post("https://20q-wxcj.vercel.app/api/chat", {
        messages: updatedMessages,
      });

      const botMessage = response.data;
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (err) {
      console.error("Error communicating with the bot:", err);
    }
  };

  const handleSubmitAnswer = () => {
    
    if (gameStatus || remainingChances <= 0) return;

    if (answerInput.trim().toLowerCase() === guessWord.toLowerCase()) {
      setGameStatus("Winner! You guessed the correct word.");
    } else {
      setGameStatus("Wrong answer! Try again.");
    }

    setAnswerInput(""); // Clear answer input
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        {challenge && (
          <>
            <h2>You Can DO it!</h2>
          </>
        )}

        <div className="mt-6">
          {/* Chat Window */}
          <div className="chat-window p-4 bg-gray-50 h-96 overflow-y-auto rounded-lg border">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-4 ${
                  msg.role === "user" ? "text-right" : "text-left"
                }`}
              >
                <p
                  className={`inline-block p-2 rounded-lg ${
                    msg.role === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {msg.content}
                </p>
              </div>
            ))}
          </div>

          {/* Remaining Chances */}
          <p className="mt-4 text-sm text-gray-600">
            Remaining Chances: <strong>{remainingChances}</strong>
          </p>

          {/* Chat Input */}
          <div className="mt-4 flex">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-grow p-2 border rounded-l-lg focus:outline-none"
              disabled={gameStatus || remainingChances <= 0}
            />
            <button
              onClick={handleSendMessage}
              className="bg-blue-500 text-white px-4 rounded-r-lg hover:bg-blue-600"
              disabled={gameStatus || remainingChances <= 0}
            >
              Send
            </button>
          </div>

          {/* Answer Input */}
          <div className="mt-6">
            <input
              type="text"
              value={answerInput}
              onChange={(e) => setAnswerInput(e.target.value)}
              placeholder="Enter your final answer..."
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              disabled={gameStatus || remainingChances <= 0}
            />
            <button
              onClick={handleSubmitAnswer}
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300 w-full"
              
            >
              Submit Answer
            </button>
          </div>

          {/* Game Status */}
          {gameStatus && (
            <p className="mt-4 text-lg font-bold text-center text-red-600">
              {gameStatus}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
