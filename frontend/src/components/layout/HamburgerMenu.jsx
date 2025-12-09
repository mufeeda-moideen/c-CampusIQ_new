import React from "react";

import { Link } from "react-router-dom";
import { 
  BookOpen, Star, Building, Video, TrendingUp, Brain, User, Users, LogOut 
} from "lucide-react";

export default function HamburgerMenu({ closeMenu, handleLogout }) {
  return (
    <div className="bg-white border-t shadow-xl px-6 py-5 space-y-6 absolute top-[90px] right-0 w-full md:w-80 z-[999]">

      <Link to="/dashboard" onClick={closeMenu} className="menu-item">
        <BookOpen /> Dashboard
      </Link>

      <Link to="/recommendations" onClick={closeMenu} className="menu-item">
        <Star /> Recommendations
      </Link>

      <Link to="/colleges" onClick={closeMenu} className="menu-item">
        <Building /> Colleges
      </Link>

      <Link to="/quiz" onClick={closeMenu} className="menu-item">
        <Star /> Career Quiz
      </Link>

      <Link to="/career-guidance" onClick={closeMenu} className="menu-item">
        <Video /> Live Career Guidance
      </Link>

      <Link to="/live-seats" onClick={closeMenu} className="menu-item">
        <TrendingUp /> Live Seat Status
      </Link>

      <Link to="/ai-rank" onClick={closeMenu} className="menu-item">
        <Brain /> AI Rank Predictor
      </Link>

      <Link to="/chatbot" onClick={closeMenu} className="menu-item">
        <Brain /> AI Assistant
      </Link>

      <Link to="/profile" onClick={closeMenu} className="menu-item">
        <User /> My Profile
      </Link>

      <button
        onClick={handleLogout}
        className="w-full flex items-center gap-3 text-red-600 text-lg font-semibold pt-3 border-t"
      >
        <LogOut /> Logout
      </button>
    </div>
  );
}
