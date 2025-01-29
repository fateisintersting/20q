import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Challange() {
  const [challenges, setChallenges] = useState([]);

  // Fetch data from the backend API
  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const response = await axios.get("https://backedn20q-e744f5d1be03.herokuapp.com/api/get-challange"); // Backend endpoint
        if (response.data.success) {
          setChallenges(response.data.data); // Set the challenges to state
        } else {
          console.error("Failed to fetch challenges:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching challenges:", error);
      }
    };

    fetchChallenges();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h3 className="text-2xl font-bold text-center mb-4">Challenge List</h3>
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        {challenges.length > 0 ? (
          <ul>
            {challenges.map((challenge) => (
              <li
                key={challenge.id} // Use `id` from Firestore document
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
                    to={`/challenge/${challenge.id}`} // Use `id` from Firestore document
                    className="px-6 text-sm py-3 w-1/6 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                  >
                    View Challenge
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
