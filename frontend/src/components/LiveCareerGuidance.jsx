import React, { useState, useEffect } from "react";
import {
  Users,
  Clock,
  Star,
  Calendar,
  Sparkles,
  CheckCircle
} from "lucide-react";

export default function LiveCareerGuidance() {
  const [sessions, setSessions] = useState([]);

  const API = "http://localhost:8080/api/user-career";

  useEffect(() => {
    fetchSessions();
  }, []);

  // 🔹 Fetch sessions
  const fetchSessions = async () => {
    try {
      const res = await fetch(`${API}/sessions`);
      const data = await res.json();
      setSessions(data); // contains live + upcoming
    } catch (err) {
      console.error("Failed to load sessions", err);
    }
  };

  // 🔹 Register session
  const registerSession = async (sessionId) => {
    try {
      await fetch(`${API}/register/${sessionId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include"
      });

      alert("Successfully registered!");
      fetchSessions();
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 px-6 py-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Live Career Guidance Sessions
        </h1>
      </div>

      {/* Sessions */}
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center gap-3 mb-4">
          <Sparkles className="w-6 h-6 text-indigo-600" />
          <h2 className="text-xl font-bold text-gray-800">
            Live & Upcoming Sessions
          </h2>
        </div>

        {sessions.length === 0 && (
          <div className="text-center bg-white p-6 rounded-xl shadow text-gray-600">
            No sessions available at the moment.
          </div>
        )}

        {sessions.map((session) => (
          <div
            key={session.id}
            className="bg-white rounded-2xl shadow-lg p-6 border-2 border-gray-100 hover:shadow-xl transition-all"
          >
            <div className="flex gap-6">
              {/* Thumbnail */}
              <div className="w-24 h-24 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center text-4xl">
                {session.thumbnail || "🎓"}
              </div>

              {/* Details */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold text-gray-800">
                    {session.title}
                  </h3>

                  {session.status === "live" && (
                    <span className="px-3 py-1 bg-red-500 text-white rounded-full text-xs font-bold flex items-center gap-1">
                      🔴 LIVE
                    </span>
                  )}

                  {session.status === "upcoming" && (
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">
                      Upcoming
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
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

                <div className="text-sm text-gray-700 mb-2">
                  By <span className="font-medium">{session.counselor}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  {session.date} • {session.time}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center">
                {/* LIVE */}
                {session.status === "live" && (
                  <button
                    onClick={() => {
                      if (session.googlemeetlink) {
                        window.open(session.googlemeetlink, "_blank");
                      } else {
                        alert("Meeting link not available");
                      }
                    }}
                    className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl font-bold hover:shadow-lg"
                  >
                    Join Live
                  </button>
                )}

                {/* UPCOMING - NOT REGISTERED */}
                {session.status === "upcoming" && !session.isRegistered && (
                  <button
                    onClick={() => registerSession(session.id)}
                    className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold hover:shadow-lg"
                  >
                    Register
                  </button>
                )}

                {/* UPCOMING - REGISTERED */}
                {session.status === "upcoming" && session.isRegistered && (
                  <div className="px-6 py-3 bg-green-100 text-green-700 rounded-xl font-bold flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Registered
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
