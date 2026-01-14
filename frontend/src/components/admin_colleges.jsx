import React from 'react';
import axios from "axios";

import { Trash2, Plus, Building2, MapPin, BookOpen, Award, DollarSign, Home, GraduationCap } from 'lucide-react';

export default function AdminPanel({ colleges = [], setColleges = () => {}, collegeForm = {}, setCollegeForm = () => {} }) {
  // Add a new college
  // Add a new college (Connect to backend API)
const addCollege = async () => {
  try {
    const token = localStorage.getItem("token");

    // Convert string inputs to numbers and keep boolean/string fields
    const payload = {
      ...collegeForm,
      cutoff_rank: Number(collegeForm.cutoff_rank) || 0,
      fee: Number(collegeForm.fee) || 0,
      placement_rate: Number(collegeForm.placement_rate) || 0,
      hostel_available: Boolean(collegeForm.hostel_available),
    };

    const response = await axios.post(
      "http://localhost:8080/api/colleges",
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Update state with new college
    setColleges([...colleges, response.data]);

    // Reset form
    setCollegeForm({
      name: "",
      location: "",
      courses: "",
      cutoff_rank: "",
      fee: "",
      placement_rate: "",
      hostel_available: false,
      teaching_style: "",
      college_type: "",
      campus_type: ""
    });

    alert("College added successfully!");
  } catch (error) {
    console.error("Error adding college:", error);
    alert("Failed to add college.");
  }
};



  // Delete a college
  const deleteCollege = async (id) => {
  const token = localStorage.getItem("token");

  await axios.delete(`http://localhost:8080/api/colleges/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  setColleges(colleges.filter(col => col.id !== id));
};


  return (
        <div className="w-full space-y-8">

        {/* Add College Form */}
        <div className="backdrop-blur-xl bg-white/90 p-8 rounded-3xl shadow-2xl border border-white/20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Plus className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Add New College</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* College Name */}
            <div className="group lg:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-indigo-600" />
                College Name
              </label>
              <input
                type="text"
                placeholder="Enter college name"
                value={collegeForm.name || ''}
                onChange={e => setCollegeForm({ ...collegeForm, name: e.target.value })}
                className="w-full px-5 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white hover:border-indigo-300 placeholder:text-gray-400"
              />
            </div>

            {/* Location */}
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-indigo-600" />
                Location
              </label>
              <input
                type="text"
                placeholder="City, State"
                value={collegeForm.location || ''}
                onChange={e => setCollegeForm({ ...collegeForm, location: e.target.value })}
                className="w-full px-5 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white hover:border-indigo-300 placeholder:text-gray-400"
              />
            </div>

            {/* Courses */}
            <div className="group lg:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-indigo-600" />
                Courses (comma-separated)
              </label>
              <input
                type="text"
                placeholder="e.g., Computer Science, Mechanical, Electrical"
                value={collegeForm.courses || ''}
                onChange={e => setCollegeForm({ ...collegeForm, courses: e.target.value })}
                className="w-full px-5 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white hover:border-indigo-300 placeholder:text-gray-400"
              />
            </div>

            {/* Cutoff Rank */}
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <Award className="w-4 h-4 text-purple-600" />
                Cutoff Rank
              </label>
              <input
                type="number"
                placeholder="e.g., 5000"
                value={collegeForm.cutoff_rank || ''}
                onChange={e => setCollegeForm({ ...collegeForm, cutoff_rank: e.target.value })}
                className="w-full px-5 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white hover:border-indigo-300 placeholder:text-gray-400"
              />
            </div>

            {/* Annual Fee */}
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-green-600" />
                Annual Fee (₹)
              </label>
              <input
                type="number"
                placeholder="e.g., 50000"
                value={collegeForm.fee || ''}
                onChange={e => setCollegeForm({ ...collegeForm, fee: e.target.value })}
                className="w-full px-5 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white hover:border-indigo-300 placeholder:text-gray-400"
              />
            </div>

            {/* Placement Rate */}
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-indigo-600" />
                Placement Rate (%)
              </label>
              <input
                type="number"
                placeholder="e.g., 85"
                value={collegeForm.placement_rate || ''}
                onChange={e => setCollegeForm({ ...collegeForm, placement_rate: e.target.value })}
                className="w-full px-5 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white hover:border-indigo-300 placeholder:text-gray-400"
              />
            </div>

            {/* Teaching Style */}
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Teaching Style
              </label>
              <select
                value={collegeForm.teaching_style || ''}
                onChange={e => setCollegeForm({ ...collegeForm, teaching_style: e.target.value })}
                className="w-full px-5 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white hover:border-indigo-300 appearance-none cursor-pointer"
              >
                <option value="">Select Style</option>
                <option value="Traditional">Traditional</option>
                <option value="Modern">Modern</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Research-Focused">Research-Focused</option>
              </select>
            </div>

            {/* College Type */}
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                College Type
              </label>
              <select
                value={collegeForm.college_type || ''}
                onChange={e => setCollegeForm({ ...collegeForm, college_type: e.target.value })}
                className="w-full px-5 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white hover:border-indigo-300 appearance-none cursor-pointer"
              >
                <option value="">Select Type</option>
                <option value="Government">Government</option>
                <option value="Private">Private</option>
                <option value="Autonomous">Autonomous</option>
                <option value="Deemed">Deemed</option>
              </select>
            </div>

            {/* Campus Type */}
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Campus Type
              </label>
              <select
                value={collegeForm.campus_type || ''}
                onChange={e => setCollegeForm({ ...collegeForm, campus_type: e.target.value })}
                className="w-full px-5 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white hover:border-indigo-300 appearance-none cursor-pointer"
              >
                <option value="">Select Campus</option>
                <option value="Urban">Urban</option>
                <option value="Semi-Urban">Semi-Urban</option>
                <option value="Rural">Rural</option>
              </select>
            </div>

            {/* Hostel Available */}
            <div className="group lg:col-span-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={collegeForm.hostel_available || false}
                  onChange={e => setCollegeForm({ ...collegeForm, hostel_available: e.target.checked })}
                  className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <div className="flex items-center gap-2">
                  <Home className="w-4 h-4 text-indigo-600" />
                  <span className="font-semibold text-gray-700">Hostel Available</span>
                </div>
              </label>
            </div>
          </div>

          <button
            onClick={addCollege}
            className="mt-8 w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-lg hover:from-indigo-700 hover:to-purple-700 active:scale-[0.98] transition-all duration-300 shadow-xl shadow-indigo-500/30 hover:shadow-2xl hover:shadow-indigo-500/40 flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add College to Database
          </button>
        </div>

        {/* Manage Colleges */}
        <div className="backdrop-blur-xl bg-white/90 p-8 rounded-3xl shadow-2xl border border-white/20">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Manage Colleges</h2>
                <p className="text-sm text-gray-600">{colleges.length} colleges in database</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {colleges.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <Building2 className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p className="text-lg font-semibold">No colleges added yet</p>
                <p className="text-sm">Add your first college using the form above</p>
              </div>
            ) : (
              colleges.map((college, index) => (
                <div
                  key={college.id || index}
                  className="group flex items-start justify-between p-6 border-2 border-gray-100 rounded-2xl hover:border-indigo-200 hover:shadow-lg transition-all duration-300 bg-white"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Building2 className="w-6 h-6 text-indigo-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-gray-900 mb-1">{college.name}</h3>
                        <div className="flex flex-wrap gap-2 mb-3">
                          <span className="inline-flex items-center gap-1 text-sm text-gray-600">
                            <MapPin className="w-3.5 h-3.5" />
                            {college.location}
                          </span>
                          <span className="text-gray-400">•</span>
                          <span className="inline-flex items-center gap-1 text-sm text-gray-600">
                            <BookOpen className="w-3.5 h-3.5" />
                            {college.courses?.split(',')[0]}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-semibold">
                            {college.college_type}
                          </span>
                          <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-semibold">
                            {college.campus_type}
                          </span>
                          <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-semibold">
                            {college.placement_rate}% Placement
                          </span>
                          {college.hostel_available && (
                            <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold">
                              Hostel Available
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteCollege(college.id)}
                    className="ml-4 p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors duration-200 flex-shrink-0"
                    title="Delete college"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
    </div>
  );
}