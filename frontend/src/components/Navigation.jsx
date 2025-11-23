import React from 'react';
import { BookOpen, Star, Building, Users } from 'lucide-react';

export default function Navigation({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BookOpen },
    { id: 'recommendations', label: 'Recommendations', icon: Star },
    { id: 'colleges', label: 'Browse Colleges', icon: Building },
    { id: 'admin', label: 'Admin', icon: Users }
  ];

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="flex space-x-8 px-4">
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
  );
}
