import axios from "axios";
import React, { useState } from "react";

export default function Question() {
  const [guessword, setguessword] = useState("");
  const [category, setcategory] = useState("");
  const [context, setcontext] = useState("");
  const [message, setMessage] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // New state to manage button state

  const handlequestion = () => {
    const data = {
      guessword,
      category,
      context,
    };

    setIsButtonDisabled(true); // Disable button immediately after it's clicked

    axios
      .post("https://20q-wxcj.vercel.app/api/question", data)
      .then((response) => {
        setMessage(response.data.message);
        alert("Question created successfully!"); // Display success alert
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to create the question. Please try again."); // Display error alert
      })
      .finally(() => {
        setIsButtonDisabled(false); // Re-enable button after the request completes
      });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-4 text-gray-800">
          This is the Question Page
        </h1>
        <p className="text-gray-600 text-center mb-2">
          In this page, you provide your word, place, character, etc., with
          context and additional information about the word with a category.
        </p>

        <div className="mb-4">
          <label
            htmlFor="guessword"
            className="block text-gray-700 font-semibold mb-1"
          >
            Guess Word:
          </label>
          <input
            id="guessword"
            name="guessword"
            type="text"
            required
            onChange={(e) => setguessword(e.target.value)}
            placeholder="Enter the word to be guessed"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-gray-700 font-semibold mb-1"
          >
            Category:
          </label>
          <input
            id="category"
            name="category"
            type="text"
            required
            onChange={(e) => setcategory(e.target.value)}
            placeholder="Enter the category"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="context"
            className="block text-gray-700 font-semibold mb-1"
          >
            Context:
          </label>
          <input
            id="context"
            name="context"
            type="text"
            required
            onChange={(e) => setcontext(e.target.value)}
            placeholder="Enter the context"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={handlequestion}
          disabled={isButtonDisabled} // Disable button based on state
          className={`w-full py-2 rounded-lg transition duration-300 ${
            isButtonDisabled
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {isButtonDisabled ? "Creating..." : "Create The Question"}
        </button>
      </div>
    </div>
  );
}
