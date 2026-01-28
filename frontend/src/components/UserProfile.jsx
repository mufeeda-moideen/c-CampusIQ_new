import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { User, Mail, Phone, MapPin, Calendar, Award, Edit2, Camera, Save, CheckCircle, Clock, Heart, Settings, Trophy } from 'lucide-react';

export default function UserProfile() {
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
  name: '',
  email: '',
  phone: '',
  location: '',
  dob: '',
  category: '',
  profileImage: '👩‍🎓'
});

useEffect(() => {
  fetchProfile();
}, []);

const fetchProfile = async () => {
  try {
    const res = await axios.get(
      'http://localhost:8080/api/user/profile',
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );

    setProfile((prev) => ({
  ...prev, // ✅ keeps profileImage
  name: res.data.fullname,
  email: res.data.email,
  phone: res.data.phone,
  location: res.data.location,
  dob: res.data.dob?.split('T')[0] || '',
  category: res.data.category,
}));

  } catch (err) {
    console.error('Failed to load profile');
  }
};

const handleSave = async () => {
  if (!isEditing) {
    setIsEditing(true);
    return;
  }

  try {
    if (!profile.phone || !profile.location) {
  alert("Please fill all required fields");
  return;
}

    await axios.put(
      'http://localhost:8080/api/user/profile',
      {
        phone: profile.phone,
        dob: profile.dob,
        location: profile.location,
        category: profile.category,
        //profile_image: profile.profileImage,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
    alert("Profile updated successfully");

    setIsEditing(false);
  } catch (err) {
    console.error('Failed to update profile');
  }
};



  const savedColleges = [
    {
      name: 'Govt Engineering College, Thrissur',
      course: 'Computer Science',
      savedDate: '2 days ago'
    },
    {
      name: 'College of Engineering Trivandrum',
      course: 'Computer Science',
      savedDate: '5 days ago'
    },
    {
      name: 'Model Engineering College',
      course: 'Computer Science',
      savedDate: '1 week ago'
    }
  ];

  const recentActivity = [
    { action: 'Got recommendations', detail: 'Based on KEAM rank', time: '2 hours ago', icon: Award },
    { action: 'Updated profile', detail: 'Added contact information', time: '3 days ago', icon: Settings },
    { action: 'Saved college', detail: 'GEC Thrissur', time: '1 week ago', icon: Heart }
  ];

  const achievements = [
    { title: 'Profile Complete', description: 'Filled all profile details', icon: CheckCircle, earned: true },
    { title: 'First Search', description: 'Got your first recommendations', icon: Award, earned: true },
    { title: 'Wishlist Started', description: 'Saved your first college', icon: Heart, earned: true }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 py-5">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          My Profile
        </h1>
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
                  {/*<p className="text-gray-600 mb-3">Aspiring Engineer</p>*/}
                 

                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                    <div className="text-2xl font-bold text-blue-600">3</div>
                    <div className="text-xs text-gray-600">Saved Colleges</div>
                  </div>
                  <div className="text-center p-3 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                    <div className="text-2xl font-bold text-purple-600">3</div>
                    <div className="text-xs text-gray-600">Achievements</div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-3 mb-6">
                   <div className="flex items-center gap-3 text-sm text-gray-600">
  <MapPin className="w-4 h-4" />

  {isEditing ? (
    <input
      type="text"
      value={profile.location}
      onChange={(e) =>
        setProfile({ ...profile, location: e.target.value })
      }
      className="border rounded px-2 py-1 text-sm w-full"
    />
  ) : (
    <span>{profile.location}</span>
  )}
</div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span className="truncate">{profile.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
  <Phone className="w-4 h-4" />

  {isEditing ? (
    <input
      type="text"
      value={profile.phone}
      onChange={(e) =>
        setProfile({ ...profile, phone: e.target.value })
      }
      className="border rounded px-2 py-1 text-sm max-w-[180px]"

    />
  ) : (
    <span>{profile.phone}</span>
  )}
</div>

                  <div className="flex items-center gap-3 text-sm text-gray-600">
  <Calendar className="w-4 h-4" />

  {isEditing ? (
    <input
      type="date"
      value={profile.dob}
      onChange={(e) =>
        setProfile({ ...profile, dob: e.target.value })
      }
      className="border rounded px-2 py-1 text-sm w-full"
    />
  ) : (
    <span>{profile.dob}</span>
  )}
</div>

                 <div className="flex items-center gap-3 text-sm text-gray-600">
  <Award className="w-4 h-4" />

  {isEditing ? (
    <select
      value={profile.category}
      onChange={(e) =>
        setProfile({ ...profile, category: e.target.value })
      }
      className="border rounded px-2 py-1 text-sm w-full"
    >
      <option value="">Select</option>
      <option value="General">General</option>
      <option value="OBC">OBC</option>
      <option value="SC">SC</option>
      <option value="ST">ST</option>
    </select>
  ) : (
    <span>Category: {profile.category}</span>
  )}
</div>

                </div>

                <button
                  onClick={handleSave}
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
          <div className="lg:col-span-2 space-y-6">
            {/* Saved Colleges */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-indigo-100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-indigo-600" />
                  <h3 className="font-bold text-gray-800">Saved Colleges</h3>
                </div>
                <span className="text-sm text-gray-600">{savedColleges.length} colleges</span>
              </div>
              <div className="space-y-3">
                {savedColleges.map((college, idx) => (
                  <div key={idx} className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-200 hover:shadow-lg transition-all">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="font-bold text-gray-800 mb-1">{college.name}</div>
                        <div className="text-sm text-gray-600 mb-2">{college.course}</div>
                        <div className="text-xs text-gray-500">Saved {college.savedDate}</div>
                      </div>
                      <button className="px-3 py-1 text-xs font-medium text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
                        View
                      </button>
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
                {recentActivity.map((activity, idx) => {
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

            {/* Quick Actions */}
            <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl shadow-xl p-6 text-white">
              <h3 className="font-bold text-xl mb-2">Ready to find your perfect college?</h3>
              <p className="text-white/90 text-sm mb-4">
                Get personalized recommendations based on your preferences
              </p>
              <button className="px-6 py-3 bg-white text-indigo-600 rounded-xl font-medium hover:shadow-lg transition-all">
                Get Recommendations ✨
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}