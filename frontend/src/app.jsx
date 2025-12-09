// --- IMPORTS ---
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";

// Layouts
import UserLayout from "./components/layout/UserLayout";
import AdminLayout from "./components/layout/AdminLayout";

// User Pages
import AuthForm from "./components/AuthForm";
import Dashboard from "./components/Dashboard";
import Recommendations from "./components/Recommendations";
import Colleges from "./components/Colleges";
import RecommendationForm from "./components/RecommendationForm";
import QuizSession from "./components/QuizSession";
import Chatbot from "./components/chatbot";
import LiveCareerGuidance from "./components/LiveCareerGuidance";
import UserProfile from "./components/UserProfile";
import LiveSeatDashboard from "./components/LiveSeatDashboard";
import AIRankPredictor from "./components/AIRankPredictor";

// Admin Pages
import AdminColleges from "./components/admin_colleges";
import AdminCareerGuidance from "./components/admin_careerguidance.jsx";
import DashboardAdmin from "./components/admin-overview.jsx";

// --- APP WRAPPER ---
export default function App() {
  return (
    <Router>
      <MainApp />
    </Router>
  );
}

// --- MAIN LOGIC ---
function MainApp() {
  const navigate = useNavigate();

  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const [rankForm, setRankForm] = useState({});
  const [collegeForm, setCollegeForm] = useState({});
  const [recommendations, setRecommendations] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [filteredColleges, setFilteredColleges] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // --- LOGIN ---
  const handleLogin = async () => {
    setLoading(true);
    const url =
      form.role === "admin"
        ? "http://localhost:8080/api/admin/login"
        : "http://localhost:8080/api/auth/login";

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });

      const data = await res.json();
      if (!res.ok) return alert("Login failed");

      setToken(data.token);
      setUser({ role: form.role });

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", form.role);

      navigate(form.role === "admin" ? "/admin" : "/dashboard");
    } catch {
      alert("Server error");
    }
    setLoading(false);
  };

  // --- SIGNUP ---
  const handleSignup = async () => {
    setLoading(true);
    await fetch("http://localhost:8080/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setToken("mock-token");
    setUser({ role: "user" });
    navigate("/dashboard");
    setLoading(false);
  };

  // --- FETCH COLLEGES ---
  useEffect(() => {
    axios.get("http://localhost:8080/api/colleges").then((res) => {
      setColleges(res.data);
      setFilteredColleges(res.data);
    });
  }, []);

  // --- SEARCH ---
  const handleSearch = (term) => {
    setSearchTerm(term);
    setFilteredColleges(
      colleges.filter((c) =>
        (c.name + c.location).toLowerCase().includes(term.toLowerCase())
      )
    );
  };

  // --- PDF ---
  const handlePDF = () => {
    const pdf = new jsPDF();
    pdf.text("Recommendations", 10, 10);
    recommendations.forEach((r, i) => {
      pdf.text(`${i + 1}. ${r.name}`, 10, 20 + i * 10);
    });
    pdf.save("recommendations.pdf");
  };

  // --- LOGOUT ---
  const handleLogout = () => {
    localStorage.clear();
    setToken("");
    setUser(null);
    navigate("/");
  };

  // --- AUTH SCREEN ---
  if (!token) {
    return (
      <AuthForm
        form={form}
        setForm={setForm}
        handleLogin={handleLogin}
        handleSignup={handleSignup}
        loading={loading}
      />
    );
  }

  // --- ROUTING ---
  return (
    <>
      {user?.role !== "admin" && (
        <UserLayout handleLogout={handleLogout}>
          <Routes>
            <Route path="/dashboard" element={<Dashboard colleges={colleges} />} />
            <Route path="/recommendations" element={<Recommendations recommendations={recommendations} handlePDF={handlePDF} />} />
            <Route path="/colleges" element={<Colleges colleges={filteredColleges} searchTerm={searchTerm} handleSearch={handleSearch} />} />
            <Route path="/quiz" element={<QuizSession />} />
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="/career-guidance" element={<LiveCareerGuidance />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/live-seats" element={<LiveSeatDashboard />} />
            <Route path="/ai-rank" element={<AIRankPredictor colleges={colleges} user={user} />} />
            <Route path="/recommendation" element={<RecommendationForm rankForm={rankForm} setRankForm={setRankForm} />} />
          </Routes>
        </UserLayout>
      )}

      {user?.role === "admin" && (
  <AdminLayout handleLogout={handleLogout}>
    <Routes>
      {/* ✅ Overview */}
      <Route path="/admin" element={<DashboardAdmin />} />

      {/* ✅ Colleges Admin */}
      <Route
        path="/admin/colleges"
        element={
          <AdminColleges
            colleges={colleges}
            setColleges={setColleges}
            collegeForm={collegeForm}
            setCollegeForm={setCollegeForm}
          />
        }
      />

      {/* ✅ Future Admin Pages (ready) */}
      <Route path="/admin/users" element={<div>Users Management</div>} />
      <Route path="/admin/predictions" element={<div>Predictions</div>} />
      <Route path="/admin/reports" element={<div>Reports</div>} />

      <Route path="/admin/career-guidance" element={<AdminCareerGuidance />} />

    </Routes>
  </AdminLayout>
)}

    </>
  );
}
