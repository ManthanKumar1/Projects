import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white p-4 shadow-md">
      <ul className="flex justify-center space-x-6">
        <li><Link to="/" className="hover:text-yellow-400">Home</Link></li>
        <li><Link to="/about" className="hover:text-yellow-400">About</Link></li>
        <li><Link to="/projects" className="hover:text-yellow-400">Projects</Link></li>
        <li><Link to="/resume" className="hover:text-yellow-400">Resume</Link></li>
        <li><Link to="/education" className="hover:text-yellow-400">Education</Link></li>
        <li><Link to="/contact" className="hover:text-yellow-400">Contact</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
