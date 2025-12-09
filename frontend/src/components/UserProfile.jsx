import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Award, Target, TrendingUp, BookOpen, Star, Edit2, Camera, Save, X, CheckCircle, Clock, Briefcase, GraduationCap, Heart, Bell, Settings, LogOut, Trophy, Zap, Brain, Download, Share2, Plus, ChevronRight } from 'lucide-react';

export default function UserProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const [profile, setProfile] = useState({
    name: 'Mufeeda Rahman',
    email: 'mufeeda.rahman@email.com',
    phone: '+91 98765 43210',
    location: 'Tirur, Kerala',
    dob: '15 March 2006',
    category: 'General',
    profileImage: '👩‍🎓'
  });

  const examScores = [
    { exam: 'KEAM 2024', rank: 15420, percentile: 94.5, date: 'May 2024', status: 'completed' },
    { exam: 'JEE Main 2024', rank: 45280, percentile: 89.2, date: 'April 2024', status: 'completed' },
    { exam: 'NEET 2024', rank: null, percentile: null, date: 'Upcoming', status: 'registered' }
  ];

  const preferences = {
    courses: ['Computer Science', 'Artificial Intelligence', 'Data Science'],
    locations: ['Kerala', 'Karnataka', 'Tamil Nadu'],
    collegeType: ['Government', 'Private (Aided)'],
    budget: '₹50,000 - ₹1,00,000',
    hostel: 'Required',
    careerGoal: 'Software Engineer / ML Specialist'
  };

  const savedColleges = [
    {
      name: 'Govt Engineering College, Thrissur',
      course: 'Computer Science',
      probability: 92,
      savedDate: '2 days ago',
      status: 'wishlist'
    },
    {
      name: 'College of Engineering Trivandrum',
      course: 'Computer Science',
      probability: 78,
      savedDate: '5 days ago',
      status: 'wishlist'
    },
    {
      name: 'Model Engineering College',
      course: 'Computer Science',
      probability: 45,
      savedDate: '1 week ago',
      status: 'considering'
    }
  ];

  const recentActivity = [
    { action: 'Predicted admission chances', detail: 'for 12 colleges', time: '2 hours ago', icon: Brain },
    { action: 'Attended live session', detail: 'Engineering Career Paths 2025', time: '1 day ago', icon: BookOpen },
    { action: 'Updated preferences', detail: 'Added AI/ML to interests', time: '3 days ago', icon: Settings },
    { action: 'Downloaded report', detail: 'College Recommendations PDF', time: '1 week ago', icon: Download }
  ];

  const achievements = [
    { title: 'First Prediction', description: 'Completed your first AI prediction', icon: Zap, earned: true },
    { title: 'Profile Complete', description: 'Filled all profile details', icon: CheckCircle, earned: true },
    { title: 'Session Attendee', description: 'Attended 3 live guidance sessions', icon: Trophy, earned: true },
    { title: 'Decision Maker', description: 'Shortlisted 10 colleges', icon: Target, earned: false }
  ];

  const upcomingSessions = [
    { title: 'NEET Strategy Session', counselor: 'Dr. Priya Menon', date: 'Dec 10, 2025', time: '5:00 PM' },
    { title: 'College Selection Workshop', counselor: 'Arun Krishnan', date: 'Dec 12, 2025', time: '4:00 PM' }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'exams', label: 'Exam Scores', icon: Award },
    { id: 'preferences', label: 'Preferences', icon: Target },
    { id: 'wishlist', label: 'Saved Colleges', icon: Heart },
    { id: 'activity', label: 'Activity', icon: Clock }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg border-b border-indigo-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              My Profile
            </h1>
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-all">
                <Bell className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-all">
                <Settings className="w-5 h-5 text-gray-600" />
              </button>
              <button className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-all">
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Sidebar - Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-indigo-100">
              {/* Cover Image */}
              <div className="h-32 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
              
              {/* Profile Image */}
              <div className="relative px-6 pb-6">
                <div className="flex justify-center -mt-16 mb-4">
                  <div className="relative">
                    <div className="w-32 h-32 bg-white rounded-full p-2 shadow-xl">
                      <div className="w-full h-full bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center text-6xl">
                        {profile.profileImage}
                      </div>
                    </div>
                    <button className="absolute bottom-2 right-2 p-2 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-all">
                      <Camera className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-1">{profile.name}</h2>
                  <p className="text-gray-600 mb-3">Aspiring Engineer</p>
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    {profile.location}
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="text-center p-3 bg-gradient-to-br from-green-50 to-teal-50 rounded-xl border border-green-200">
                    <div className="text-2xl font-bold text-green-600">3</div>
                    <div className="text-xs text-gray-600">Exams</div>
                  </div>
                  <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                    <div className="text-2xl font-bold text-blue-600">8</div>
                    <div className="text-xs text-gray-600">Saved</div>
                  </div>
                  <div className="text-center p-3 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                    <div className="text-2xl font-bold text-purple-600">92%</div>
                    <div className="text-xs text-gray-600">Best</div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span className="truncate">{profile.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span>{profile.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>{profile.dob}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Award className="w-4 h-4" />
                    <span>Category: {profile.category}</span>
                  </div>
                </div>

                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="w-full px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  {isEditing ? <Save className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
                  {isEditing ? 'Save Changes' : 'Edit Profile'}
                </button>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-2xl shadow-xl p-6 mt-6 border-2 border-indigo-100">
              <div className="flex items-center gap-2 mb-4">
                <Trophy className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-gray-800">Achievements</h3>
              </div>
              <div className="space-y-3">
                {achievements.map((achievement, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border-2 transition-all ${
                      achievement.earned
                        ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200'
                        : 'bg-gray-50 border-gray-200 opacity-60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        achievement.earned ? 'bg-yellow-100' : 'bg-gray-200'
                      }`}>
                        <achievement.icon className={`w-4 h-4 ${
                          achievement.earned ? 'text-yellow-600' : 'text-gray-400'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm text-gray-800">{achievement.title}</div>
                        <div className="text-xs text-gray-600">{achievement.description}</div>
                      </div>
                      {achievement.earned && <CheckCircle className="w-5 h-5 text-green-600" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Content Area */}
          <div className="lg:col-span-2">
            {/* Tab Navigation */}
            <div className="bg-white rounded-2xl shadow-lg p-2 mb-6 border-2 border-indigo-100">
              <div className="grid grid-cols-5 gap-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-all ${
                        activeTab === tab.id
                          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="hidden md:inline">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Career Goal */}
                <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-indigo-100">
                  <div className="flex items-center gap-2 mb-4">
                    <Target className="w-5 h-5 text-indigo-600" />
                    <h3 className="font-bold text-gray-800">Career Goal</h3>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-200">
                    <div className="text-lg font-bold text-gray-800 mb-1">{preferences.careerGoal}</div>
                    <div className="text-sm text-gray-600">Your dream career path</div>
                  </div>
                </div>

                {/* Upcoming Sessions */}
                <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-indigo-100">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-indigo-600" />
                      <h3 className="font-bold text-gray-800">Upcoming Sessions</h3>
                    </div>
                    <button className="text-indigo-600 text-sm font-medium hover:underline">
                      View All
                    </button>
                  </div>
                  <div className="space-y-3">
                    {upcomingSessions.map((session, idx) => (
                      <div key={idx} className="p-4 bg-gradient-to-r from-green-50 to-teal-50 rounded-xl border-2 border-green-200">
                        <div className="font-bold text-gray-800 mb-1">{session.title}</div>
                        <div className="text-sm text-gray-600 mb-2">with {session.counselor}</div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {session.date}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {session.time}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-indigo-100">
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="w-5 h-5 text-indigo-600" />
                    <h3 className="font-bold text-gray-800">Recent Activity</h3>
                  </div>
                  <div className="space-y-3">
                    {recentActivity.slice(0, 3).map((activity, idx) => {
                      const Icon = activity.icon;
                      return (
                        <div key={idx} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-all">
                          <div className="p-2 bg-indigo-50 rounded-lg">
                            <Icon className="w-4 h-4 text-indigo-600" />
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-sm text-gray-800">{activity.action}</div>
                            <div className="text-xs text-gray-600">{activity.detail}</div>
                          </div>
                          <div className="text-xs text-gray-500">{activity.time}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'exams' && (
              <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-indigo-100">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-indigo-600" />
                    <h3 className="font-bold text-gray-800">Exam Scores & Rankings</h3>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg font-medium hover:bg-indigo-100 transition-all">
                    <Plus className="w-4 h-4" />
                    Add Exam
                  </button>
                </div>

                <div className="space-y-4">
                  {examScores.map((exam, idx) => (
                    <div
                      key={idx}
                      className={`p-5 rounded-xl border-2 transition-all ${
                        exam.status === 'completed'
                          ? 'bg-gradient-to-r from-green-50 to-teal-50 border-green-200'
                          : 'bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="text-lg font-bold text-gray-800 mb-1">{exam.exam}</h4>
                          <div className="text-sm text-gray-600">{exam.date}</div>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                          exam.status === 'completed'
                            ? 'bg-green-200 text-green-700'
                            : 'bg-blue-200 text-blue-700'
                        }`}>
                          {exam.status === 'completed' ? 'Completed' : 'Registered'}
                        </div>
                      </div>

                      {exam.rank ? (
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 bg-white rounded-lg">
                            <div className="text-xs text-gray-600 mb-1">Your Rank</div>
                            <div className="text-2xl font-bold text-indigo-600">{exam.rank.toLocaleString()}</div>
                          </div>
                          <div className="p-4 bg-white rounded-lg">
                            <div className="text-xs text-gray-600 mb-1">Percentile</div>
                            <div className="text-2xl font-bold text-green-600">{exam.percentile}%</div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-4 text-gray-600 text-sm">
                          Results awaited
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'preferences' && (
              <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-indigo-100">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-indigo-600" />
                    <h3 className="font-bold text-gray-800">My Preferences</h3>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Preferred Courses</label>
                    <div className="flex flex-wrap gap-2">
                      {preferences.courses.map((course, idx) => (
                        <span key={idx} className="px-4 py-2 bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 rounded-lg text-sm font-medium border border-indigo-200">
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Preferred Locations</label>
                    <div className="flex flex-wrap gap-2">
                      {preferences.locations.map((location, idx) => (
                        <span key={idx} className="px-4 py-2 bg-gradient-to-r from-green-50 to-teal-50 text-green-700 rounded-lg text-sm font-medium border border-green-200">
                          {location}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                      <div className="text-sm text-gray-600 mb-1">Budget Range</div>
                      <div className="font-bold text-gray-800">{preferences.budget}</div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                      <div className="text-sm text-gray-600 mb-1">Hostel Requirement</div>
                      <div className="font-bold text-gray-800">{preferences.hostel}</div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">College Type</label>
                    <div className="flex flex-wrap gap-2">
                      {preferences.collegeType.map((type, idx) => (
                        <span key={idx} className="px-4 py-2 bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 rounded-lg text-sm font-medium border border-blue-200">
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'wishlist' && (
              <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-indigo-100">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-indigo-600" />
                    <h3 className="font-bold text-gray-800">Saved Colleges ({savedColleges.length})</h3>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
                    <Download className="w-4 h-4" />
                    Export List
                  </button>
                </div>

                <div className="space-y-4">
                  {savedColleges.map((college, idx) => (
                    <div key={idx} className="p-5 border-2 border-gray-200 rounded-xl hover:shadow-lg hover:border-indigo-200 transition-all">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-800 mb-1">{college.name}</h4>
                          <div className="text-sm text-gray-600 mb-2">{college.course}</div>
                          <div className="text-xs text-gray-500">Saved {college.savedDate}</div>
                        </div>
                        <div className="text-center">
                          <div className={`text-2xl font-bold ${
                            college.probability >= 75 ? 'text-green-600' :
                            college.probability >= 50 ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                            {college.probability}%
                          </div>
                          <div className="text-xs text-gray-600">Chance</div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="flex-1 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all">
                          View Details
                        </button>
                        <button className="px-4 py-2 border-2 border-red-300 text-red-600 rounded-lg text-sm font-medium hover:bg-red-50 transition-all">
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'activity' && (
              <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-indigo-100">
                <div className="flex items-center gap-2 mb-6">
                  <Clock className="w-5 h-5 text-indigo-600" />
                  <h3 className="font-bold text-gray-800">Activity Timeline</h3>
                </div>

                <div className="space-y-4">
                  {recentActivity.map((activity, idx) => {
                    const Icon = activity.icon;
                    return (
                      <div key={idx} className="flex items-start gap-4 p-4 hover:bg-gray-50 rounded-xl transition-all">
                        <div className="p-3 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl">
                          <Icon className="w-5 h-5 text-indigo-600" />
                        </div>
                        <div className="flex-1">
                          <div className="font-bold text-gray-800 mb-1">{activity.action}</div>
                          <div className="text-sm text-gray-600 mb-2">{activity.detail}</div>
                          <div className="text-xs text-gray-500">{activity.time}</div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}