import React, { useState } from 'react';
import { Calendar, Bell, TrendingUp, Users, Award, AlertCircle, Database, Clock, CheckCircle, XCircle, Zap, MapPin, Building2, GraduationCap, DollarSign } from 'lucide-react';

export default function LiveSeatDashboard() {
  const [selectedRound, setSelectedRound] = useState('Round 1');
  const [selectedCollege, setSelectedCollege] = useState(null);

  const rounds = ['Round 1', 'Round 2', 'Round 3', 'Mop-up'];
  
  const colleges = [
    {
      id: 1,
      name: 'Govt Engineering College, Thrissur',
      type: 'Government',
      course: 'Computer Science & Engineering',
      totalSeats: 120,
      filled: 98,
      remaining: 22,
      fillRate: 82,
      lastUpdated: '2 mins ago',
      trend: 'filling-fast',
      cutoffRank: 14500,
      fees: '₹50,000/year',
      location: 'Thrissur, Kerala'
    },
    {
      id: 2,
      name: 'College of Engineering Trivandrum',
      type: 'Government',
      course: 'Computer Science & Engineering',
      totalSeats: 150,
      filled: 145,
      remaining: 5,
      fillRate: 97,
      lastUpdated: '5 mins ago',
      trend: 'almost-full',
      cutoffRank: 8200,
      fees: '₹48,000/year',
      location: 'Trivandrum, Kerala'
    },
    {
      id: 3,
      name: 'Model Engineering College',
      type: 'Private',
      course: 'Computer Science & Engineering',
      totalSeats: 60,
      filled: 35,
      remaining: 25,
      fillRate: 58,
      lastUpdated: '10 mins ago',
      trend: 'available',
      cutoffRank: 15800,
      fees: '₹1,20,000/year',
      location: 'Kochi, Kerala'
    },
    {
      id: 4,
      name: 'NSS College of Engineering',
      type: 'Private',
      course: 'Computer Science & Engineering',
      totalSeats: 90,
      filled: 72,
      remaining: 18,
      fillRate: 80,
      lastUpdated: '1 min ago',
      trend: 'filling-fast',
      cutoffRank: 12200,
      fees: '₹85,000/year',
      location: 'Palakkad, Kerala'
    },
    {
      id: 5,
      name: 'TKM College of Engineering',
      type: 'Government',
      course: 'Electronics & Communication',
      totalSeats: 100,
      filled: 45,
      remaining: 55,
      fillRate: 45,
      lastUpdated: '8 mins ago',
      trend: 'available',
      cutoffRank: 18500,
      fees: '₹52,000/year',
      location: 'Kollam, Kerala'
    },
    {
      id: 6,
      name: 'Rajagiri School of Engineering',
      type: 'Private',
      course: 'Computer Science & Engineering',
      totalSeats: 180,
      filled: 165,
      remaining: 15,
      fillRate: 92,
      lastUpdated: '3 mins ago',
      trend: 'almost-full',
      cutoffRank: 16200,
      fees: '₹1,50,000/year',
      location: 'Kochi, Kerala'
    }
  ];

  const stats = {
    totalColleges: 156,
    totalSeats: 18420,
    filledSeats: 14230,
    remainingSeats: 4190,
    avgFillRate: 77
  };

  const getTrendColor = (trend) => {
    switch(trend) {
      case 'almost-full': return 'text-red-600';
      case 'filling-fast': return 'text-yellow-600';
      case 'available': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getTrendBg = (trend) => {
    switch(trend) {
      case 'almost-full': return 'bg-red-50 border-red-200';
      case 'filling-fast': return 'bg-yellow-50 border-yellow-200';
      case 'available': return 'bg-green-50 border-green-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const getTrendIcon = (trend) => {
    switch(trend) {
      case 'almost-full': return <AlertCircle className="w-4 h-4" />;
      case 'filling-fast': return <Zap className="w-4 h-4" />;
      case 'available': return <CheckCircle className="w-4 h-4" />;
      default: return null;
    }
  };

  const getTrendText = (trend) => {
    switch(trend) {
      case 'almost-full': return 'Almost Full';
      case 'filling-fast': return 'Filling Fast';
      case 'available': return 'Seats Available';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Main Page Heading */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Live Seat Availability Dashboard 
          </h2>
          <p className="text-gray-600">
            Real-time admission tracking • Updated every 30 seconds
          </p>
        </div>
        
      {/* Header 
      <div className="bg-white/80 backdrop-blur-lg border-b border-indigo-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Live Seat Availability Dashboard
              </h1>
              <p className="text-gray-600 text-sm mt-1">Real-time admission tracking • Updated every 30 seconds</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Live</span>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-all">
                <Bell className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>*/}
      

        <div>
        {/* Round Selector */}
        <div className="mb-6">
          {/*<label className="block text-sm font-medium text-gray-700 mb-3">Counselling Round</label>*/}
          <div className="flex gap-3">
            {rounds.map((round) => (
              <button
                key={round}
                onClick={() => setSelectedRound(round)}
                className={`px-6 py-3 rounded-xl font-medium transition-all ${
                  selectedRound === round
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg scale-105'
                    : 'bg-white text-gray-700 hover:bg-indigo-50 border border-gray-200'
                }`}
              >
                {round}
              </button>
            ))}
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-xl p-5 border-2 border-indigo-100 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Database className="w-5 h-5 text-indigo-600" />
              <div className="text-sm text-gray-600">Total Seats</div>
            </div>
            <div className="text-2xl font-bold text-gray-800">{stats.totalSeats.toLocaleString()}</div>
          </div>

          <div className="bg-white rounded-xl p-5 border-2 border-green-100 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div className="text-sm text-gray-600">Filled</div>
            </div>
            <div className="text-2xl font-bold text-green-600">{stats.filledSeats.toLocaleString()}</div>
          </div>

          <div className="bg-white rounded-xl p-5 border-2 border-orange-100 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-5 h-5 text-orange-600" />
              <div className="text-sm text-gray-600">Remaining</div>
            </div>
            <div className="text-2xl font-bold text-orange-600">{stats.remainingSeats.toLocaleString()}</div>
          </div>

          <div className="bg-white rounded-xl p-5 border-2 border-purple-100 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Building2 className="w-5 h-5 text-purple-600" />
              <div className="text-sm text-gray-600">Colleges</div>
            </div>
            <div className="text-2xl font-bold text-purple-600">{stats.totalColleges}</div>
          </div>

          <div className="bg-white rounded-xl p-5 border-2 border-blue-100 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <div className="text-sm text-gray-600">Avg Fill Rate</div>
            </div>
            <div className="text-2xl font-bold text-blue-600">{stats.avgFillRate}%</div>
          </div>
        </div>

        {/* Alert Banner */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-xl p-4 mb-6">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0" />
            <div className="flex-1">
              <div className="font-semibold text-gray-800">Quick Filling Alert</div>
              <div className="text-sm text-gray-600">3 colleges have less than 10 seats remaining in Computer Science</div>
            </div>
            <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg text-sm font-medium hover:bg-yellow-700 transition-all">
              View Details
            </button>
          </div>
        </div>

        {/* College Cards */}
        <div className="space-y-4">
          {colleges.map((college) => (
            <div
              key={college.id}
              className={`bg-white rounded-xl border-2 ${getTrendBg(college.trend)} hover:shadow-xl transition-all cursor-pointer`}
              onClick={() => setSelectedCollege(college.id === selectedCollege ? null : college.id)}
            >
              {/* Main Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-gray-800">{college.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        college.type === 'Government' 
                          ? 'bg-blue-100 text-blue-700' 
                          : 'bg-purple-100 text-purple-700'
                      }`}>
                        {college.type}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                      <GraduationCap className="w-4 h-4" />
                      <span>{college.course}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {college.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        {college.fees}
                      </div>
                    </div>
                  </div>

                  <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${getTrendColor(college.trend)} ${getTrendBg(college.trend)} font-medium text-sm`}>
                    {getTrendIcon(college.trend)}
                    {getTrendText(college.trend)}
                  </div>
                </div>

                {/* Seat Progress Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-600">Seat Availability</span>
                    <span className="font-semibold text-gray-800">
                      {college.filled}/{college.totalSeats} filled ({college.fillRate}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        college.fillRate >= 90 ? 'bg-red-500' :
                        college.fillRate >= 70 ? 'bg-yellow-500' :
                        'bg-green-500'
                      }`}
                      style={{ width: `${college.fillRate}%` }}
                    ></div>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Remaining Seats</div>
                    <div className={`text-xl font-bold ${
                      college.remaining <= 5 ? 'text-red-600' :
                      college.remaining <= 20 ? 'text-yellow-600' :
                      'text-green-600'
                    }`}>
                      {college.remaining}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Last Cutoff Rank</div>
                    <div className="text-xl font-bold text-indigo-600">
                      {college.cutoffRank.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Last Updated</div>
                    <div className="flex items-center gap-1 text-sm font-medium text-gray-700">
                      <Clock className="w-4 h-4" />
                      {college.lastUpdated}
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {selectedCollege === college.id && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-3">Seat Distribution</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">General</span>
                            <span className="font-medium">48/60 (12 left)</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">OBC</span>
                            <span className="font-medium">32/40 (8 left)</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">SC/ST</span>
                            <span className="font-medium">18/20 (2 left)</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-3">Quick Actions</h4>
                        <div className="space-y-2">
                          <button className="w-full px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all">
                            Set Alert for This College
                          </button>
                          <button className="w-full px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-all">
                            View Full Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Auto Refresh Notice */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-200 text-sm text-gray-600">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            Auto-refreshing every 30 seconds
          </div>
        </div>
      </div>
     </div> 
    </div>
  );
}