import React, { useState } from 'react';
import { BookOpen, Star, Building, Users, Menu, X } from 'lucide-react';

export default function Navigation({ activeTab, setActiveTab }) {

  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BookOpen },
    { id: 'recommendations', label: 'Recommendations', icon: Star },
    { id: 'colleges', label: 'Browse Colleges', icon: Building },
    { id: 'admin', label: 'Admin', icon: Users }
  ];

  return (
    <>
      {/* NAVBAR WRAPPER */}
      <div className="bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-between md:justify-start">
        
        {/* Mobile Hamburger Button */}
        <button 
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8 ml-6">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center py-4 px-2 border-b-2 transition-colors ${
                activeTab === item.id 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <item.icon className="w-4 h-4 mr-2" />
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-white w-full border-b shadow-md py-4 px-4 space-y-4">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => { 
                setActiveTab(item.id); 
                setIsOpen(false); 
              }}
              className="flex items-center text-gray-700 text-lg w-full"
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
