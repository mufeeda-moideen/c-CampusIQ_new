import React, { useState, useEffect } from "react";
import { Video, Plus, Edit, Trash2, Eye, X } from "lucide-react";


const API_BASE = "http://localhost:8080/api";

export default function AdminCareerGuidance() {
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [formData, setFormData] = useState({});

   // Fetch sessions
  const fetchSessions = async () => {
    try {
      const res = await fetch(`${API_BASE}/sessions`);
      const data = await res.json();
      setSessions(data);
    } catch (err) {
      console.error("Fetch sessions failed", err);
    }
  };

  // Load sessions when page opens
  useEffect(() => {
    fetchSessions();
  }, []);


  const inputClass = "w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none";

  const getStatusColor = (status) => {
    const colors = {
      live: 'bg-red-100 text-red-700',
      upcoming: 'bg-blue-100 text-blue-700',
      completed: 'bg-gray-100 text-gray-700',
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  const handleCreate = async () => {
    const processed = {
      ...formData,
      topics: formData.topics ? formData.topics.split(',').map(t => t.trim()).filter(Boolean) : [],
      participants: parseInt(formData.participants) || 0,
      rating: parseFloat(formData.rating) || 0,
      googlemeetlink: formData.googlemeetlink?.trim() || '',
    };
    try {
      const res = await fetch(`${API_BASE}/sessions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(processed),
      });
      const saved = await res.json();
      setSessions([...sessions, saved]);
      closeModal();
    } catch (err) {
      console.error("Create failed", err);
    }
  };

  const handleUpdate = async () => {
    const processed = {
      ...formData,
      topics: formData.topics ? formData.topics.split(',').map(t => t.trim()).filter(Boolean) : [],
      participants: parseInt(formData.participants) || 0,
      rating: parseFloat(formData.rating) || 0,
      googlemeetlink: formData.googlemeetlink?.trim() || '',
    };
    try {
      const res = await fetch(`${API_BASE}/sessions/${selectedItem.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(processed),
      });
      const updated = await res.json();
      setSessions(sessions.map(i => i.id === updated.id ? updated : i));
      closeModal();
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await fetch(`${API_BASE}/sessions/${id}`, { method: "DELETE" });
      setSessions(sessions.filter(i => i.id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const openModal = (item = null) => {
    setSelectedItem(item);
    setFormData(item ? { ...item, topics: item.topics?.join(', ') || '' } : {
      title: "", counselor: "", specialty: "", topics: "",
      date: "", time: "", duration: "60 mins", status: "upcoming",
      participants: 0, rating: 0, thumbnail: "📚", googlemeetlink: ""
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedItem(null);
    setFormData({});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Video className="w-6 h-6 text-indigo-600" />
            Manage Sessions
          </h2>
          <button
            onClick={() => openModal()}
            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add New Session
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                {['Session', 'Counselor', 'Date & Time', 'Participants', 'Status', 'Actions', 'Meet Link'].map(h => (
                  <th key={h} className="px-6 py-4 text-left text-sm font-semibold text-gray-700">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sessions.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-400">
                    No sessions yet. Click "Add New Session" to get started.
                  </td>
                </tr>
              ) : sessions.map((session) => (
                <tr key={session.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{session.thumbnail}</span>
                      <span className="font-medium text-gray-800">{session.title}</span>
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
                      <button className="p-2 hover:bg-indigo-50 rounded-lg">
                        <Eye className="w-4 h-4 text-indigo-600" />
                      </button>
                      <button onClick={() => openModal(session)} className="p-2 hover:bg-green-50 rounded-lg">
                        <Edit className="w-4 h-4 text-green-600" />
                      </button>
                      <button onClick={() => handleDelete(session.id)} className="p-2 hover:bg-red-50 rounded-lg">
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <a href={session.googlemeetlink} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-sm">
                      Join
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b flex items-center justify-between sticky top-0 bg-white z-10">
                <h3 className="text-xl font-bold text-gray-800">
                  {selectedItem ? 'Edit Session' : 'Add New Session'}
                </h3>
                <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-lg">
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Session Title</label>
                  <input type="text" value={formData.title || ''} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className={inputClass} placeholder="e.g., AI & Machine Learning Career Paths" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Counselor Name</label>
                  <input type="text" value={formData.counselor || ''} onChange={(e) => setFormData({ ...formData, counselor: e.target.value })} className={inputClass} placeholder="e.g., Dr. Sarah Johnson" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Specialty</label>
                  <input type="text" value={formData.specialty || ''} onChange={(e) => setFormData({ ...formData, specialty: e.target.value })} className={inputClass} placeholder="e.g., Tech Careers" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Topics (comma-separated)</label>
                  <input type="text" value={formData.topics || ''} onChange={(e) => setFormData({ ...formData, topics: e.target.value })} className={inputClass} placeholder="e.g., AI, ML, Data Science" />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                    <input type="date" value={formData.date || ''} onChange={(e) => setFormData({ ...formData, date: e.target.value })} className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                    <input type="time" value={formData.time || ''} onChange={(e) => setFormData({ ...formData, time: e.target.value })} className={inputClass} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                  <select value={formData.duration || '60 mins'} onChange={(e) => setFormData({ ...formData, duration: e.target.value })} className={inputClass}>
                    <option value="30 mins">30 mins</option>
                    <option value="60 mins">60 mins</option>
                    <option value="90 mins">90 mins</option>
                    <option value="120 mins">120 mins</option>
                  </select>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Participants</label>
                    <input type="number" min="0" value={formData.participants || 0} onChange={(e) => setFormData({ ...formData, participants: parseInt(e.target.value) || 0 })} className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Rating (0–5)</label>
                    <input type="number" step="0.1" min="0" max="5" value={formData.rating || 0} onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) || 0 })} className={inputClass} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Thumbnail Emoji</label>
                  <input type="text" maxLength={3} value={formData.thumbnail || ''} onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })} className={inputClass} placeholder="e.g., 🤖" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select value={formData.status || 'upcoming'} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className={inputClass}>
                    <option value="upcoming">Upcoming</option>
                    <option value="live">Live</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Google Meet Link</label>
                  <input type="text" value={formData.googlemeetlink || ''} onChange={(e) => setFormData({ ...formData, googlemeetlink: e.target.value })} className={inputClass} placeholder="https://meet.google.com/abc-defg-hij" />
                </div>
              </div>

              <div className="border-t px-6 py-4 flex justify-end gap-3">
                <button onClick={closeModal} className="px-6 py-3 text-gray-500 rounded-lg hover:bg-gray-50">Cancel</button>
                <button onClick={selectedItem ? handleUpdate : handleCreate} className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg">
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