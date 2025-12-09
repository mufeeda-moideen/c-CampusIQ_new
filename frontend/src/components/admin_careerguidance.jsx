import React, { useState, useEffect } from 'react';
import { Video, MessageCircle, Calendar, Clock, Star, Award, TrendingUp, BookOpen, Briefcase, Users, CheckCircle, ArrowRight, Sparkles, Target, Brain, Heart, Zap, DollarSign, MapPin, Phone, Mail, Globe, Plus, Edit, Trash2, Eye, UserCheck, Activity, BarChart3, Settings, Filter, Search, Download, Upload, X } from 'lucide-react';

const API_BASE = "http://localhost:8080/api";
export default function AdminCareerGuidance() {
  const [activeTab, setActiveTab] = useState('sessions');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  
  const [sessions, setSessions] = useState([]);
  const [counselors, setCounselors] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [resources, setResources] = useState([]);
  const [formData, setFormData] = useState({});
  
  const tabs = [
    { id: 'sessions', label: 'Manage Sessions', icon: Video },
    { id: 'counselors', label: 'Manage Counselors', icon: Users },
    { id: 'bookings', label: 'All Bookings', icon: Calendar },
    { id: 'resources', label: 'Resources', icon: BookOpen }
  ];

  useEffect(() => {
  loadAllData();
}, []);

const loadAllData = async () => {
  try {
    const [sessionRes, counselorRes, bookingRes, resourceRes] = await Promise.all([
      fetch(`${API_BASE}/sessions`),
      fetch(`${API_BASE}/counselors`),
      fetch(`${API_BASE}/bookings`),
      fetch(`${API_BASE}/resources`)
    ]);

    setSessions(await sessionRes.json());
    setCounselors(await counselorRes.json());
    setBookings(await bookingRes.json());

    // Group resources by category
    const flatResources = await resourceRes.json();
    const groupedResources = Object.values(flatResources.reduce((acc, res) => {
      if (!acc[res.category]) acc[res.category] = { category: res.category, items: [] };
      acc[res.category].items.push(res);
      return acc;
    }, {}));
    
    setResources(groupedResources);
  } catch (err) {
    console.error("Failed to load admin data", err);
  }
};


  const processFormData = (type, data) => {
    let processed = { ...data };
    if (type === 'session') {
      processed.topics = processed.topics ? processed.topics.split(',').map(t => t.trim()).filter(Boolean) : [];
      processed.participants = parseInt(processed.participants) || 0;
      processed.rating = parseFloat(processed.rating) || 0;
    } else if (type === 'counselor') {
      processed.expertise = processed.expertise ? processed.expertise.split(',').map(e => e.trim()).filter(Boolean) : [];
      processed.languages = processed.languages ? processed.languages.split(',').map(l => l.trim()).filter(Boolean) : [];
      processed.rating = parseFloat(processed.rating) || 0;
      processed.reviews = parseInt(processed.reviews) || 0;
      processed.successRate = parseInt(processed.successRate) || 0;
      processed.sessions = parseInt(processed.sessions) || 0;
    } else if (type === 'resource') {
      if (processed.type === 'PDF') {
        processed.downloads = parseInt(processed.metrics) || 0;
        delete processed.views;
      } else {
        processed.views = parseInt(processed.metrics) || 0;
        delete processed.downloads;
      }
      delete processed.metrics;
      delete processed.category;
    }
    return processed;
  };

  const handleCreate = async () => {
  const processed = processFormData(modalType, formData);

  try {
    let endpoint = "";

    if (modalType === "session") endpoint = "sessions";
    if (modalType === "counselor") endpoint = "counselors";
    if (modalType === "resource") endpoint = "resources";

    const res = await fetch(`${API_BASE}/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(processed)
    });

    const saved = await res.json();

    if (modalType === "session") setSessions([...sessions, saved]);
    if (modalType === "counselor") setCounselors([...counselors, saved]);
    if (modalType === "resource") setResources([...resources, saved]);

    closeModal();
  } catch (err) {
    console.error("Create failed", err);
  }
};

  const handleUpdate = async () => {
  const processed = processFormData(modalType, formData);

  try {
    let endpoint = "";

    if (modalType === "session") endpoint = "sessions";
    if (modalType === "counselor") endpoint = "counselors";
    if (modalType === "resource") endpoint = "resources";

    const res = await fetch(`${API_BASE}/${endpoint}/${selectedItem.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(processed)
    });

    const updated = await res.json();

    if (modalType === "session")
      setSessions(sessions.map(i => i.id === updated.id ? updated : i));

    if (modalType === "counselor")
      setCounselors(counselors.map(i => i.id === updated.id ? updated : i));

    if (modalType === "resource")
      setResources(resources.map(i => i.id === updated.id ? updated : i));

    closeModal();
  } catch (err) {
    console.error("Update failed", err);
  }
};

  const handleDelete = async (id) => {
  if (!window.confirm("Are you sure?")) return;

  try {
    let endpoint = "";

    if (activeTab === "sessions") endpoint = "sessions";
    if (activeTab === "counselors") endpoint = "counselors";
    if (activeTab === "resources") endpoint = "resources";

    await fetch(`${API_BASE}/${endpoint}/${id}`, {
      method: "DELETE"
    });

    if (activeTab === "sessions") setSessions(sessions.filter(i => i.id !== id));
    if (activeTab === "counselors") setCounselors(counselors.filter(i => i.id !== id));
    if (activeTab === "resources") setResources(resources.filter(i => i.id !== id));

  } catch (err) {
    console.error("Delete failed", err);
  }
};

  const openModal = (type, item = null) => {
    setModalType(type);
    setSelectedItem(item);
    let initialData;
    
    if (type === 'session') {
      initialData = item ? {
        ...item,
        topics: item.topics?.join(', ') || ''
      } : {
        title: "",
        counselor: "",
        specialty: "",
        topics: "",
        date: "",
        time: "",
        duration: "60 mins",
        status: "upcoming",
        participants: 0,
        rating: 0,
        thumbnail: "📚"
      };
    } else if (type === 'counselor') {
      initialData = item ? {
        ...item,
        expertise: item.expertise?.join(', ') || '',
        languages: item.languages?.join(', ') || ''
      } : {
        name: "",
        image: "👤",
        designation: "",
        specialty: "",
        expertise: "",
        education: "",
        languages: "",
        experience: "",
        fee: "",
        availability: "",
        rating: 0,
        reviews: 0,
        successRate: 0,
        sessions: 0,
        status: "active"
      };
    } else if (type === 'resource') {
      const category = item ? resources.find(sec => sec.items.some(it => it.id === item.id))?.category || '' : '';
      const metrics = item ? (item.downloads ?? item.views ?? 0) : 0;
      initialData = item ? { ...item, category, metrics } : {
        title: "",
        category: "",
        type: "PDF",
        fileUrl: "",
        status: "active",
        metrics: 0
      };
    }
    
    setFormData(initialData);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedItem(null);
    setModalType('');
    setFormData({});
  };

  const getStatusColor = (status) => {
    const colors = {
      live: 'bg-red-100 text-red-700',
      upcoming: 'bg-blue-100 text-blue-700',
      completed: 'bg-gray-100 text-gray-700',
      active: 'bg-green-100 text-green-700',
      inactive: 'bg-gray-100 text-gray-700',
      confirmed: 'bg-green-100 text-green-700',
      pending: 'bg-yellow-100 text-yellow-700',
      cancelled: 'bg-red-100 text-red-700'
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  const inputClass = "w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none";

  const confirmBooking = async (id) => {
  try {
    await fetch(`${API_BASE}/bookings/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "confirmed" })
    });

    loadAllData(); // refresh bookings
  } catch (err) {
    console.error("Confirm booking failed", err);
  }
};

const cancelBooking = async (id) => {
  try {
    await fetch(`${API_BASE}/bookings/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "cancelled" })
    });

    loadAllData(); // refresh bookings
  } catch (err) {
    console.error("Cancel booking failed", err);
  }
};



  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/*<div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">
            Manage career guidance platform • Monitor & control all activities
          </p>
        </div>*/}
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
        {activeTab === 'sessions' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Video className="w-6 h-6 text-indigo-600" />
                Manage Sessions
              </h2>
              <button
                onClick={() => openModal('session')}
                className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add New Session
              </button>
            </div>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Session</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Counselor</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Date & Time</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Participants</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sessions.map((session) => (
                    <tr key={session.id} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="text-3xl">{session.thumbnail}</div>
                          <div className="font-medium text-gray-800">{session.title}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{session.counselor}</td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-800">{session.date}</div>
                        <div className="text-xs text-gray-500">{session.time}</div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{session.participants}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(session.status)}`}>
                          {session.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button className="p-2 hover:bg-indigo-50 rounded-lg transition-all">
                            <Eye className="w-4 h-4 text-indigo-600" />
                          </button>
                          <button
                            onClick={() => openModal('session', session)}
                            className="p-2 hover:bg-green-50 rounded-lg transition-all"
                          >
                            <Edit className="w-4 h-4 text-green-600" />
                          </button>
                          <button
                            onClick={() => handleDelete(session.id)}
                            className="p-2 hover:bg-red-50 rounded-lg"
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {activeTab === 'counselors' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Users className="w-6 h-6 text-indigo-600" />
                Manage Counselors
              </h2>
              <button
                onClick={() => openModal('counselor')}
                className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add New Counselor
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {counselors.map((counselor) => (
                <div key={counselor.id} className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-100 hover:shadow-xl hover:border-indigo-200 transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="text-5xl">{counselor.image}</div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-800">{counselor.name}</h3>
                        <div className="text-sm text-gray-600 mb-2">{counselor.specialty}</div>
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span className="font-bold text-gray-800">{counselor.rating}</span>
                          <span className="text-sm text-gray-600">({counselor.sessions} sessions)</span>
                        </div>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(counselor.status)}`}>
                      {counselor.status}
                    </span>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {counselor.expertise?.slice(0, 3).map((exp, idx) => (
                        <span key={idx} className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded text-xs font-medium">
                          {exp}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 pt-4 border-t">
                    <button className="flex-1 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg font-medium hover:bg-indigo-100 transition-all">
                      View Profile
                    </button>
                    <button
                      onClick={() => openModal('counselor', counselor)}
                      className="p-2 hover:bg-green-50 rounded-lg transition-all"
                    >
                      <Edit className="w-5 h-5 text-green-600" />
                    </button>
                    <button
                      onClick={() => handleDelete(counselor.id)}
                      className="p-2 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="w-5 h-5 text-red-600" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {activeTab === 'bookings' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Calendar className="w-6 h-6 text-indigo-600" />
                All Bookings
              </h2>
              <div className="flex items-center gap-3">
                <button className="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Filter
                </button>
                <button className="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Export
                </button>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Student</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Counselor</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Date & Time</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Amount</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking.id} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-800">{booking.student}</td>
                      <td className="px-6 py-4 text-gray-600">{booking.counselor}</td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-800">{booking.date}</div>
                        <div className="text-xs text-gray-500">{booking.time}</div>
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-800">{booking.amount}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button className="p-2 hover:bg-indigo-50 rounded-lg transition-all">
                            <Eye className="w-4 h-4 text-indigo-600" />
                          </button>
                          <button
                            onClick={() => confirmBooking(booking.id)}
                            className="p-2 hover:bg-green-50 rounded-lg transition-all"
                          >
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          </button>

                          <button
                            onClick={() => cancelBooking(booking.id)}
                            className="p-2 hover:bg-red-50 rounded-lg transition-all"
                          >
                            <X className="w-4 h-4 text-red-600" />
                          </button>

                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {activeTab === 'resources' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-indigo-600" />
                Manage Resources
              </h2>
              <button
                onClick={() => openModal('resource')}
                className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add New Resource
              </button>
            </div>
            <div className="space-y-8">
              {resources.map((section, idx) => (
                <div key={idx}>
                  <h3 className="text-lg font-bold text-gray-800 mb-4">{section.category}</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    {section.items?.map((item, itemIdx) => (
                      <div key={itemIdx} className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-100 hover:shadow-xl hover:border-indigo-200 transition-all">
                        <div className="flex items-start justify-between mb-4">
                          <div className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded text-xs font-bold">
                            {item.type}
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                            {item.status}
                          </span>
                        </div>
                        
                        <h4 className="font-bold text-gray-800 mb-2">{item.title}</h4>
                        
                        <div className="text-sm text-gray-600 mb-4">
                          {item.downloads ? `${item.downloads.toLocaleString()} downloads` : `${item.views?.toLocaleString()} views`}
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <button className="flex-1 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg font-medium hover:bg-indigo-100 transition-all">
                            View
                          </button>
                          <button
                            onClick={() => openModal('resource', item)}
                            className="p-2 hover:bg-green-50 rounded-lg transition-all"
                          >
                            <Edit className="w-5 h-5 text-green-600" />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-2 hover:bg-red-50 rounded-lg"
                          >
                            <Trash2 className="w-5 h-5 text-red-600" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b flex items-center justify-between sticky top-0 bg-white z-10">
                <h3 className="text-xl font-bold text-gray-800">
                  {selectedItem ? `Edit ${modalType}` : `Add New ${modalType}`}
                </h3>
                <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-lg transition-all">
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  {modalType === 'session' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Session Title</label>
                        <input
                          type="text"
                          value={formData.title || ''}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          className={inputClass}
                          placeholder="e.g., AI & Machine Learning Career Paths"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Counselor Name</label>
                        <input
                          type="text"
                          value={formData.counselor || ''}
                          onChange={(e) => setFormData({ ...formData, counselor: e.target.value })}
                          className={inputClass}
                          placeholder="e.g., Dr. Sarah Johnson"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Specialty</label>
                        <input
                          type="text"
                          value={formData.specialty || ''}
                          onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                          className={inputClass}
                          placeholder="e.g., Tech Careers"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Topics (comma-separated)</label>
                        <input
                          type="text"
                          value={formData.topics || ''}
                          onChange={(e) => setFormData({ ...formData, topics: e.target.value })}
                          className={inputClass}
                          placeholder="e.g., AI, ML, Data Science"
                        />
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                          <input
                            type="date"
                            value={formData.date || ''}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            className={inputClass}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                          <input
                            type="time"
                            value={formData.time || ''}
                            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                            className={inputClass}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                        <select
                          value={formData.duration || '60 mins'}
                          onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                          className={inputClass}
                        >
                          <option value="30 mins">30 mins</option>
                          <option value="60 mins">60 mins</option>
                          <option value="90 mins">90 mins</option>
                          <option value="120 mins">120 mins</option>
                        </select>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Initial Participants</label>
                          <input
                            type="number"
                            min="0"
                            value={formData.participants || 0}
                            onChange={(e) => setFormData({ ...formData, participants: parseInt(e.target.value) || 0 })}
                            className={inputClass}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Rating (0-5)</label>
                          <input
                            type="number"
                            step="0.1"
                            min="0"
                            max="5"
                            value={formData.rating || 0}
                            onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) || 0 })}
                            className={inputClass}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Thumbnail Emoji</label>
                        <input
                          type="text"
                          maxLength={3}
                          value={formData.thumbnail || ''}
                          onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                          className={inputClass}
                          placeholder="e.g., 🤖"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                        <select
                          value={formData.status || 'upcoming'}
                          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                          className={inputClass}
                        >
                          <option value="upcoming">Upcoming</option>
                          <option value="live">Live</option>
                          <option value="completed">Completed</option>
                        </select>
                      </div>
                    </>
                  )}
                  {modalType === 'counselor' && (
                    <>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                          <input
                            type="text"
                            value={formData.name || ''}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className={inputClass}
                            placeholder="e.g., Dr. Sarah Johnson"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Designation</label>
                          <input
                            type="text"
                            value={formData.designation || ''}
                            onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                            className={inputClass}
                            placeholder="e.g., Senior Career Counselor"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Specialty</label>
                        <input
                          type="text"
                          value={formData.specialty || ''}
                          onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                          className={inputClass}
                          placeholder="e.g., Technology & Engineering"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Education</label>
                        <input
                          type="text"
                          value={formData.education || ''}
                          onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                          className={inputClass}
                          placeholder="e.g., PhD in Computer Science"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Expertise (comma-separated)</label>
                        <input
                          type="text"
                          value={formData.expertise || ''}
                          onChange={(e) => setFormData({ ...formData, expertise: e.target.value })}
                          className={inputClass}
                          placeholder="e.g., AI/ML, Software Dev, Data Science"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Languages (comma-separated)</label>
                        <input
                          type="text"
                          value={formData.languages || ''}
                          onChange={(e) => setFormData({ ...formData, languages: e.target.value })}
                          className={inputClass}
                          placeholder="e.g., English, Hindi"
                        />
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
                          <input
                            type="text"
                            value={formData.experience || ''}
                            onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                            className={inputClass}
                            placeholder="e.g., 15 years"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Fee</label>
                          <input
                            type="text"
                            value={formData.fee || ''}
                            onChange={(e) => setFormData({ ...formData, fee: e.target.value })}
                            className={inputClass}
                            placeholder="e.g., ₹2000/hr"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
                        <input
                          type="text"
                          value={formData.availability || ''}
                          onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                          className={inputClass}
                          placeholder="e.g., Mon-Fri, 9AM-5PM"
                        />
                      </div>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Rating (0-5)</label>
                          <input
                            type="number"
                            step="0.1"
                            min="0"
                            max="5"
                            value={formData.rating || 0}
                            onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) || 0 })}
                            className={inputClass}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Reviews</label>
                          <input
                            type="number"
                            min="0"
                            value={formData.reviews || 0}
                            onChange={(e) => setFormData({ ...formData, reviews: parseInt(e.target.value) || 0 })}
                            className={inputClass}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Success Rate (%)</label>
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={formData.successRate || 0}
                            onChange={(e) => setFormData({ ...formData, successRate: parseInt(e.target.value) || 0 })}
                            className={inputClass}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Total Sessions</label>
                        <input
                          type="number"
                          min="0"
                          value={formData.sessions || 0}
                          onChange={(e) => setFormData({ ...formData, sessions: parseInt(e.target.value) || 0 })}
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Image Emoji</label>
                        <input
                          type="text"
                          maxLength={3}
                          value={formData.image || ''}
                          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                          className={inputClass}
                          placeholder="e.g., 👩‍💼"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                        <select
                          value={formData.status || 'active'}
                          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                          className={inputClass}
                        >
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </select>
                      </div>
                    </>
                  )}
                  {modalType === 'resource' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                        <input
                          type="text"
                          value={formData.title || ''}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          className={inputClass}
                          placeholder="e.g., JEE Main Complete Guide 2024"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                        <input
                          type="text"
                          value={formData.category || ''}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          className={`${inputClass} ${selectedItem ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                          placeholder="e.g., Study Materials"
                          disabled={!!selectedItem}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                        <select
                          value={formData.type || 'PDF'}
                          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                          className={inputClass}
                        >
                          <option value="PDF">PDF</option>
                          <option value="Video">Video</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">File URL</label>
                        <input
                          type="url"
                          value={formData.fileUrl || ''}
                          onChange={(e) => setFormData({ ...formData, fileUrl: e.target.value })}
                          className={inputClass}
                          placeholder="https://example.com/file.pdf"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {formData.type === 'PDF' ? 'Initial Downloads' : 'Initial Views'}
                        </label>
                        <input
                          type="number"
                          min="0"
                          value={formData.metrics || 0}
                          onChange={(e) => setFormData({ ...formData, metrics: parseInt(e.target.value) || 0 })}
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                        <select
                          value={formData.status || 'active'}
                          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                          className={inputClass}
                        >
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </select>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="border-t pt-6 px-6 pb-6 flex justify-end gap-3">
                <button
                  onClick={closeModal}
                  className="px-6 py-3 text-gray-500 rounded-lg hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={selectedItem ? handleUpdate : handleCreate}
                  className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
                >
                  {selectedItem ? 'Update' : 'Create'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}