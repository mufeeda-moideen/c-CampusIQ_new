import React, { useState, useEffect } from 'react';
import { Video, MessageCircle, Calendar, Clock, Star, Award, TrendingUp, BookOpen, Briefcase, Users, CheckCircle, ArrowRight, Sparkles, Target, Brain, Heart, Zap, DollarSign, MapPin, Phone, Mail, Globe } from 'lucide-react';

export default function LiveCareerGuidance() {
  const [activeTab, setActiveTab] = useState('sessions');
  const [selectedCounselor, setSelectedCounselor] = useState(null);
  const [bookingStep, setBookingStep] = useState(1);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const tabs = [
    { id: 'sessions', label: 'Live Sessions', icon: Video },
    { id: 'counselors', label: 'Expert Counselors', icon: Users },
    { id: 'upcoming', label: 'My Bookings', icon: Calendar },
    { id: 'resources', label: 'Resources', icon: BookOpen }
  ];

  const [liveSessions, setLiveSessions] = useState([]);
  const [counselors, setCounselors] = useState([]);
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [resources, setResources] = useState([]);

  useEffect(() => {
  fetchLiveSessions();
  fetchCounselors();
  fetchResources();
  fetchBookings();
}, []);

const API = "http://localhost:8080/api/user-career";

// ✅ LIVE SESSIONS
const fetchLiveSessions = async () => {
  const res = await fetch(`${API}/sessions`);
  const data = await res.json();
  setLiveSessions(data);
};

// ✅ COUNSELORS
const fetchCounselors = async () => {
  const res = await fetch(`${API}/counselors`);
  const data = await res.json();
  setCounselors(data);
};

// ✅ RESOURCES (GROUP BY CATEGORY)
const fetchResources = async () => {
  const res = await fetch(`${API}/resources`);
  const flat = await res.json();

  const grouped = Object.values(
    flat.reduce((acc, r) => {
      if (!acc[r.category])
        acc[r.category] = { category: r.category, items: [] };
      acc[r.category].items.push({
        title: r.title,
        type: r.type,
        downloads: r.downloads,
        views: r.views
      });
      return acc;
    }, {})
  );

  setResources(grouped);
};

// ✅ BOOKINGS (TEMP USER ID 1)
const fetchBookings = async () => {
  const res = await fetch(`${API}/bookings/1`);
  const data = await res.json();
  setUpcomingBookings(data);
};

const timeSlots = [
  { time: "10:00 AM", available: true },
  { time: "11:00 AM", available: false },
  { time: "12:00 PM", available: true },
  { time: "2:00 PM", available: true },
  { time: "3:00 PM", available: false },
];



  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg border-b border-indigo-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Live Career Guidance 
              </h1>
              <p className="text-gray-600 text-sm mt-1">Connect with expert counselors • Get personalized guidance</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all">
                Book Session
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Banner */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-xl p-5 shadow-lg">
            <div className="text-3xl font-bold mb-1">2,450+</div>
            <div className="text-indigo-100 text-sm">Expert Counselors</div>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-teal-600 text-white rounded-xl p-5 shadow-lg">
            <div className="text-3xl font-bold mb-1">50K+</div>
            <div className="text-green-100 text-sm">Students Guided</div>
          </div>
          <div className="bg-gradient-to-br from-yellow-500 to-orange-600 text-white rounded-xl p-5 shadow-lg">
            <div className="text-3xl font-bold mb-1">94%</div>
            <div className="text-yellow-100 text-sm">Success Rate</div>
          </div>
          <div className="bg-gradient-to-br from-pink-500 to-rose-600 text-white rounded-xl p-5 shadow-lg">
            <div className="text-3xl font-bold mb-1">4.8/5</div>
            <div className="text-pink-100 text-sm">Average Rating</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8 bg-white rounded-xl p-2 shadow-sm">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        {activeTab === 'sessions' && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-6 h-6 text-indigo-600" />
              <h2 className="text-xl font-bold text-gray-800">Live & Upcoming Sessions</h2>
            </div>

            {liveSessions.map((session) => (
              <div key={session.id} className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-gray-100 hover:shadow-xl transition-all">
                <div className="p-6">
                  <div className="flex items-start gap-6">
                    {/* Thumbnail */}
                    <div className="flex-shrink-0">
                      <div className="w-24 h-24 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center text-5xl">
                        {session.thumbnail}
                      </div>
                      {session.status === 'live' && (
                        <div className="mt-2 flex items-center justify-center gap-1 px-2 py-1 bg-red-500 text-white rounded-full text-xs font-bold">
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                          LIVE NOW
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-gray-800 mb-2">{session.title}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {session.participants} watching
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {session.duration}
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                              {session.rating}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="text-sm font-medium text-gray-700 mb-2">By {session.counselor}</div>
                        <div className="text-sm text-gray-600">{session.specialty}</div>
                      </div>

                      <div className="mb-4">
                        <div className="flex flex-wrap gap-2">
                          {(Array.isArray(session.topics)
                            ? session.topics
                            : session.topics?.split(",") || []
                          ).map((topic, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-medium"
                            >
                              {topic.trim()}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm font-medium">{session.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm font-medium">{session.time}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="flex-shrink-0">
                      {session.status === 'live' ? (
                        <button className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl font-bold hover:shadow-lg transition-all">
                          Join Live
                        </button>
                      ) : (
                        <button className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold hover:shadow-lg transition-all">
                          Register Free
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'counselors' && (
          <div>
            {selectedCounselor ? (
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                {/* Back Button */}
                <div className="p-6 border-b">
                  <button
                    onClick={() => {
                      setSelectedCounselor(null);
                      setBookingStep(1);
                    }}
                    className="text-indigo-600 font-medium hover:underline"
                  >
                    ← Back to Counselors
                  </button>
                </div>

                {/* Counselor Detail */}
                <div className="p-8">
                  {bookingStep === 1 ? (
                    <>
                      <div className="flex items-start gap-6 mb-8">
                        <div className="text-8xl">{counselors.find(c => c.id === selectedCounselor).image}</div>
                        <div className="flex-1">
                          <h2 className="text-3xl font-bold text-gray-800 mb-2">
                            {counselors.find(c => c.id === selectedCounselor).name}
                          </h2>
                          <div className="text-lg text-gray-600 mb-4">
                            {counselors.find(c => c.id === selectedCounselor).designation}
                          </div>
                          <div className="flex items-center gap-6 mb-4">
                            <div className="flex items-center gap-2">
                              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                              <span className="font-bold text-gray-800">
                                {counselors.find(c => c.id === selectedCounselor).rating}
                              </span>
                              <span className="text-gray-600">
                                ({counselors.find(c => c.id === selectedCounselor).reviews} reviews)
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <Briefcase className="w-5 h-5" />
                              {counselors.find(c => c.id === selectedCounselor).experience}
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="px-4 py-2 bg-green-100 text-green-700 rounded-lg font-medium">
                              {counselors.find(c => c.id === selectedCounselor).availability}
                            </div>
                            <div className="text-2xl font-bold text-indigo-600">
                              {counselors.find(c => c.id === selectedCounselor).fee}
                              <span className="text-sm text-gray-600">/session</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-8 mb-8">
                        <div>
                          <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                            <Target className="w-5 h-5 text-indigo-600" />
                            Areas of Expertise
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {counselors.find(c => c.id === selectedCounselor).expertise.map((exp, idx) => (
                              <span key={idx} className="px-3 py-2 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-medium">
                                {exp}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                            <Award className="w-5 h-5 text-indigo-600" />
                            Qualifications
                          </h3>
                          <div className="text-gray-700">
                            {counselors.find(c => c.id === selectedCounselor).education}
                          </div>
                          <div className="mt-3 text-sm text-gray-600">
                            Languages: {counselors.find(c => c.id === selectedCounselor).languages.join(', ')}
                          </div>
                        </div>
                      </div>

                      <div className="p-6 bg-gradient-to-r from-green-50 to-teal-50 rounded-xl border border-green-200 mb-8">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-bold text-gray-800 mb-1">Success Rate</div>
                            <div className="text-3xl font-bold text-green-600">
                              {counselors.find(c => c.id === selectedCounselor).successRate}%
                            </div>
                          </div>
                          <div>
                            <div className="font-bold text-gray-800 mb-1">Total Sessions</div>
                            <div className="text-3xl font-bold text-indigo-600">
                              {counselors.find(c => c.id === selectedCounselor).sessions}+
                            </div>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => setBookingStep(2)}
                        className="w-full px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:shadow-lg transition-all"
                      >
                        Continue to Book Session
                      </button>
                    </>
                  ) : (
                    <>
                      <h3 className="text-2xl font-bold text-gray-800 mb-6">Select Date & Time</h3>
                      
                      <div className="grid md:grid-cols-2 gap-8 mb-8">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-3">Select Date</label>
                          <div className="grid grid-cols-3 gap-2">
                            {['Dec 7', 'Dec 8', 'Dec 9', 'Dec 10', 'Dec 11', 'Dec 12'].map((date, idx) => (
                              <button
                                key={idx}
                                className="px-4 py-3 border-2 border-gray-200 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 text-sm font-medium"
                              >
                                {date}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-3">Select Time Slot</label>
                          <div className="grid grid-cols-2 gap-2">
                            {timeSlots.map((slot, idx) => (
                              <button
                                key={idx}
                                onClick={() => slot.available && setSelectedSlot(slot.time)}
                                disabled={!slot.available}
                                className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                                  selectedSlot === slot.time
                                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                                    : slot.available
                                    ? 'border-2 border-gray-200 hover:border-indigo-500 hover:bg-indigo-50'
                                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                }`}
                              >
                                {slot.time}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="p-6 bg-gray-50 rounded-xl mb-6">
                        <h4 className="font-bold text-gray-800 mb-4">Session Details</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Duration:</span>
                            <span className="font-medium">60 minutes</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Session Fee:</span>
                            <span className="font-medium">{counselors.find(c => c.id === selectedCounselor).fee}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Platform Fee:</span>
                            <span className="font-medium">₹0</span>
                          </div>
                          <div className="flex justify-between pt-2 border-t">
                            <span className="font-bold text-gray-800">Total:</span>
                            <span className="font-bold text-indigo-600 text-lg">
                              {counselors.find(c => c.id === selectedCounselor).fee}
                            </span>
                          </div>
                        </div>
                      </div>

                      <button
                        disabled={!selectedSlot}
                        className={`w-full px-6 py-4 rounded-xl font-bold text-lg transition-all ${
                          selectedSlot
                            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        Confirm & Pay
                      </button>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {counselors.map((counselor) => (
                  <div
                    key={counselor.id}
                    className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-100 hover:shadow-xl hover:border-indigo-200 transition-all cursor-pointer"
                    onClick={() => setSelectedCounselor(counselor.id)}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="text-6xl">{counselor.image}</div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-800 mb-1">{counselor.name}</h3>
                        <div className="text-sm text-gray-600 mb-2">{counselor.designation}</div>
                        <div className="flex items-center gap-2 mb-2">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span className="font-bold text-gray-800">{counselor.rating}</span>
                          <span className="text-sm text-gray-600">({counselor.reviews})</span>
                        </div>
                        <div className="text-sm text-gray-600">{counselor.specialty}</div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {counselor.expertise.slice(0, 3).map((exp, idx) => (
                          <span key={idx} className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded text-xs font-medium">
                            {exp}
                          </span>
                        ))}
                        {counselor.expertise.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium">
                            +{counselor.expertise.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div>
                        <div className="text-sm text-gray-600">From</div>
                        <div className="text-xl font-bold text-indigo-600">{counselor.fee}</div>
                      </div>
                      <button className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all">
                        Book Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'upcoming' && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="w-6 h-6 text-indigo-600" />
              <h2 className="text-xl font-bold text-gray-800">Your Upcoming Sessions</h2>
            </div>

            {upcomingBookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-xl shadow-lg p-6 border-2 border-green-200">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-bold">
                        Confirmed
                      </div>
                      <div className="text-sm text-gray-600">{booking.type}</div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{booking.topic}</h3>
                    <div className="text-gray-600 mb-3">with {booking.counselor}</div>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span>{booking.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span>{booking.time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button className="px-6 py-2 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg font-medium hover:shadow-lg transition-all">
                      Join Call
                    </button>
                    <button className="px-6 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all">
                      Reschedule
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'resources' && (
          <div className="space-y-8">
            {resources.map((section, idx) => (
              <div key={idx}>
                <h3 className="text-xl font-bold text-gray-800 mb-4">{section.category}</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {section.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="bg-white rounded-xl p-5 border-2 border-gray-100 hover:shadow-lg hover:border-indigo-200 transition-all">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="font-bold text-gray-800 mb-2">{item.title}</div>
                          <div className="text-sm text-gray-600">
                            {item.downloads ? `${item.downloads.toLocaleString()} downloads` : `${item.views.toLocaleString()} views`}
                          </div>
                        </div>
                        <div className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-xs font-bold">
                          {item.type}
                        </div>
                      </div>
                      <button className="w-full px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg font-medium hover:bg-indigo-100 transition-all">
                        {item.type === 'PDF' ? 'Download' : 'Watch Now'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}