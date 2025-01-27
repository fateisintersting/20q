import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold">
          twenty yes-or-no questions
          </Link>

          {/* Navigation Links */}
          <div className=" md:flex space-x-4">
            <Link
              to="/"
              className="hover:bg-blue-700 px-3 py-2 rounded-md transition"
            >
              Home
            </Link>
            <Link
              to="/dasboard"
              className="hover:bg-blue-700 px-3 py-2 rounded-md transition"
            >
              Dasboard
            </Link>
            
          </div>

          {/* Mobile Menu */}
          
        </div>
      </div>
    </nav>
  );
}
