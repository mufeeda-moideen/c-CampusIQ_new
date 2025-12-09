import { Menu, X } from "lucide-react";
import React from "react";

export default function Header({ menuOpen, setMenuOpen }) {
  return (
    <div className="fixed top-0 w-full bg-white/95 backdrop-blur-md px-[5%] py-6 flex items-center justify-between z-[1000] shadow">

      <h1 className="text-[1.5rem] font-bold bg-gradient-to-tr from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">
        CampusIQ
      </h1>

      <button
        className="flex items-center justify-center p-2 border rounded-lg hover:bg-gray-100"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={26} /> : <Menu size={26} />}
      </button>
    </div>
  );
}
