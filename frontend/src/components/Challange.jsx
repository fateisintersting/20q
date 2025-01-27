import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Challange() {
  const [challenges, setChallenges] = useState([]);

  // Fetch data on component mount
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/get-challange")
      .then((response) => {
        setChallenges(response.data.data); // Access the `data` array from API response
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h3 className="text-2xl font-bold text-center mb-4">Challenge List</h3>
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        {challenges.length > 0 ? (
          <ul>
            {challenges.map((challenge) => (
              <li
                key={challenge._id}
                className="mb-4 p-4 border-b border-gray-300 last:border-none"
              >
                <div className="flex flex-col">
                  <p className="text-gray-700">
                    <strong>Category:</strong> {challenge.category}
                  </p>
                  <p className="text-gray-600">
                    <strong>Context:</strong> {challenge.context}
                  </p>
                
                <Link
                   to={`/challenge/${challenge._id}`}
                  className="px-6 text-sm py-3 w-1/6 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                >
                  Challange
                </Link>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-700 text-center">No challenges available</p>
        )}
      </div>
    </div>
  );
}
