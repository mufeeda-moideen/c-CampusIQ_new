import React from 'react';
import { Search, Star, MapPin, Award, DollarSign, Home, BookOpen, Filter } from 'lucide-react';

export default function CollegeList({ colleges = [], searchTerm = '', handleSearch = () => {} }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Explore All Colleges
          </h2>
          <p className="text-gray-600 text-lg">
            Browse through {colleges.length} top institutions
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="backdrop-blur-xl bg-white/90 p-2 rounded-2xl shadow-xl border border-white/20 max-w-3xl mx-auto">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400" />
              <input
                type="text"
                placeholder="Search by college name, location, or course..."
                value={searchTerm}
                onChange={e => handleSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-transparent border-0 focus:outline-none text-gray-800 placeholder:text-gray-400 font-medium"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filter
              </button>
            </div>
          </div>
        </div>

        {/* Results Counter */}
        {colleges.length > 0 && (
          <div className="backdrop-blur-xl bg-white/80 p-4 rounded-2xl shadow-lg border border-white/20 mb-8 max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-gray-700 font-semibold">
                Showing {colleges.length} {colleges.length === 1 ? 'College' : 'Colleges'}
              </span>
            </div>
          </div>
        )}

        {/* College Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {colleges.map((college, index) => (
            <div
              key={college.id || index}
              className="group backdrop-blur-xl bg-white/90 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-white/20 hover:scale-[1.02] hover:-translate-y-1"
            >
              {/* Card Header with Gradient */}
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
                    {college.name}
                  </h3>
                  <p className="text-indigo-100 text-sm font-medium line-clamp-1">
                    {college.courses?.split(',').slice(0, 2).join(' • ')}
                  </p>
                </div>
                
                {/* Placement Badge */}
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-2 rounded-xl border border-white/30">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
                    <span className="text-white font-bold text-sm">{college.placement_rate}%</span>
                  </div>
                  <p className="text-white/80 text-xs mt-0.5">Placement</p>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-3">
                {/* Location */}
                <div className="flex items-center gap-3 text-gray-700 group/item hover:text-indigo-600 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center group-hover/item:bg-indigo-100 transition-colors">
                    <MapPin className="w-5 h-5 text-indigo-600" />
                  </div>
                  <span className="font-medium truncate flex-1">{college.location}</span>
                </div>

                {/* Cutoff Rank */}
                <div className="flex items-center gap-3 text-gray-700 group/item hover:text-purple-600 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center group-hover/item:bg-purple-100 transition-colors">
                    <Award className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500">Cutoff Rank</p>
                    <p className="font-semibold">{college.cutoff_rank?.toLocaleString()}</p>
                  </div>
                </div>

                {/* Fees */}
                <div className="flex items-center gap-3 text-gray-700 group/item hover:text-green-600 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center group-hover/item:bg-green-100 transition-colors">
                    <DollarSign className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500">Annual Fees</p>
                    <p className="font-semibold">₹{college.fee?.toLocaleString()}</p>
                  </div>
                </div>

                {/* Additional Info Grid */}
                <div className="pt-4 border-t border-gray-100 grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Home className="w-4 h-4 text-indigo-500" />
                    <span className="text-gray-600 truncate">
                      {college.hostel_available ? '✓ Hostel' : '✗ No Hostel'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <BookOpen className="w-4 h-4 text-purple-500" />
                    <span className="text-gray-600 truncate">{college.teaching_style}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-semibold">
                    {college.college_type}
                  </span>
                  <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-semibold">
                    {college.campus_type}
                  </span>
                </div>

                {/* View Details Button */}
                <button className="w-full mt-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 active:scale-95 transition-all duration-200 shadow-md">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {colleges.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full mb-6">
              <Search className="w-10 h-10 text-indigo-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No Colleges Found</h3>
            <p className="text-gray-600">Try adjusting your search terms or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}