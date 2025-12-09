import React from 'react';
import { Search, Star, MapPin, Award, DollarSign, Home, BookOpen, Filter } from 'lucide-react';

export default function CollegeList({ colleges = [], searchTerm = '', handleSearch = () => {} }) {
   return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            All Colleges
          </h2>
          <p className="text-gray-600">
            {colleges.length} institutions available
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-6 backdrop-blur-sm bg-white/80 rounded-lg shadow-sm border border-white/40 p-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400" />
              <input
                type="text"
                placeholder="Search colleges..."
                value={searchTerm}
                onChange={e => handleSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
              />
            </div>
            <button className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2 font-medium">
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>
        </div>

        {/* College List */}
        <div className="space-y-4">
          {colleges.map((college, index) => (
            <div
              key={college.id || index}
              className="backdrop-blur-sm bg-white/80 rounded-lg shadow-sm border border-white/40 hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                {/* Header Row */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                      {college.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {college.courses?.split(',').slice(0, 3).join(', ')}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-medium border border-indigo-100">
                        {college.college_type}
                      </span>
                      <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-medium border border-purple-100">
                        {college.campus_type}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg">
                    <Star className="w-4 h-4 text-indigo-600 fill-indigo-600" />
                    <span className="font-semibold text-gray-900">{college.placement_rate}%</span>
                    <span className="text-xs text-gray-600">Placement</span>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-indigo-500" />
                    <div>
                      <p className="text-xs text-gray-500">Location</p>
                      <p className="text-sm font-medium text-gray-900">{college.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-purple-500" />
                    <div>
                      <p className="text-xs text-gray-500">Cutoff Rank</p>
                      <p className="text-sm font-medium text-gray-900">{college.cutoff_rank?.toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-indigo-500" />
                    <div>
                      <p className="text-xs text-gray-500">Annual Fees</p>
                      <p className="text-sm font-medium text-gray-900">₹{college.fee?.toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Home className="w-4 h-4 text-purple-500" />
                    <div>
                      <p className="text-xs text-gray-500">Hostel</p>
                      <p className="text-sm font-medium text-gray-900">
                        {college.hostel_available ? 'Available' : 'Not Available'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-indigo-100">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <BookOpen className="w-4 h-4 text-indigo-500" />
                    <span>{college.teaching_style}</span>
                  </div>
                  
                  <button className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg text-sm font-medium hover:from-indigo-700 hover:to-purple-700 transition-all">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {colleges.length === 0 && (
          <div className="text-center py-16 backdrop-blur-sm bg-white/80 rounded-lg border border-white/40">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full mb-4">
              <Search className="w-8 h-8 text-indigo-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Colleges Found</h3>
            <p className="text-gray-600">Try adjusting your search terms</p>
          </div>
        )}
      </div>
    </div>
  );
}