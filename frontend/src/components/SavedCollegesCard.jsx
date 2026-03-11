import React from 'react';
import { Heart } from "lucide-react";

export default function SavedCollegesCard({ colleges = [], onView }) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <div className="flex justify-between mb-4">
        <h3 className="font-bold flex gap-2">
          <Heart /> Saved Colleges
        </h3>
        <span>{colleges.length}</span>
      </div>

      {colleges.length === 0 ? (
        <p>No saved colleges</p>
      ) : (
        colleges.map(college => (
          <div key={college.id} className="p-3 border mb-2 rounded">
            <div className="font-bold">{college.name}</div>
            <div className="text-sm">{college.courses}</div>
            <div className="text-xs">
              Saved {college.saved_date
  ? new Date(college.saved_date).toLocaleDateString()
  : "N/A"}

            </div>

            <button
              onClick={() => onView && onView(college)}
              className="text-blue-600 text-sm mt-1"
            >
              View
            </button>
          </div>
        ))
      )}
    </div>
  );
}
