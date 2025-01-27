import React from 'react';
import { Link } from "react-router-dom";

export default function Game() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
  <div
    className="xl:bg-contain bg-cover bg-no-repeat bg-center min-h-screen w-full flex flex-col items-center justify-center p-6"
    style={{
      backgroundImage: "url('/logoquesion.png')",
      opacity: 0.9,
    }}
  >
    <h1 className="text-4xl font-extrabold mb-4 text-gray-900 text-center drop-shadow-lg">
      Welcome to Solver's Arena
    </h1>
    <p className="text-lg mb-8 text-fuchsia-700 text-center max-w-xl">
      Create and solve challenges to sharpen your skills!
    </p>
    <div className="flex space-x-4">
      <Link
        to="/question"
        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
      >
        Create Question
      </Link>
      <Link
        to="/challenge"
        className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-lg hover:bg-green-700 transition duration-300"
      >
        Go to Challenge
      </Link>
    </div>
  </div>
</div>

    
  );
}
