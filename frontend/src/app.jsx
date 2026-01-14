// --- IMPORTS ---
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

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
import CollegeDetailsPage from "./components/CollegeDetailsPage";


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
  const [compareList, setCompareList] = useState([]);

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

  // Format ₹ and %
  const formatFee = (fee) => {
    if (!fee) return "N/A";
    return "₹" + Number(fee).toLocaleString("en-IN");
  };

  const formatPlacement = (rate) => {
    if (rate === undefined || rate === null) return "N/A";
    return `${rate}%`;
  };

  // --- HEADER ---
  pdf.setFontSize(22);
  pdf.setTextColor(40, 40, 140);
  pdf.text("College Recommendation Report", 14, 20);

  pdf.setFontSize(12);
  pdf.setTextColor(100);
  pdf.text(`Generated for: ${user?.name || "User"}`, 14, 30);
  pdf.text(`Date: ${new Date().toLocaleDateString()}`, 14, 36);

  // --- SUMMARY BOX ---
  pdf.setFillColor(240, 240, 255);
  pdf.rect(10, 45, 190, 20, "F");

  pdf.setTextColor(20, 20, 120);
  pdf.setFontSize(14);
  pdf.text("Candidate Performance Summary", 14, 58);

  pdf.setTextColor(0);
  pdf.setFontSize(12);
  pdf.text(`• Rank: ${rankForm.rank || "N/A"}`, 14, 66);
  pdf.text(`• Category: ${rankForm.category || "N/A"}`, 60, 66);
  pdf.text(`• Exam: ${rankForm.exam || "N/A"}`, 120, 66);

  // --- BEST MATCH ---
  const best = recommendations[0];
  if (best) {
    pdf.setFillColor(220, 255, 220);
    pdf.rect(10, 78, 190, 25, "F");

    pdf.setTextColor(0, 100, 0);
    pdf.setFontSize(14);
    pdf.text("Best Matched College", 14, 90);

    pdf.setFontSize(12);
    pdf.setTextColor(0);
    pdf.text(`• ${best.name}`, 14, 98);
    pdf.text(`• Location: ${best.location}`, 80, 98);
    pdf.text(`• Cutoff: ${best.cutoff_rank || "N/A"}`, 150, 98); // FIXED
  }

  // --- TABLE ---
  pdf.setFontSize(14);
  pdf.setTextColor(40, 40, 140);
  pdf.text("All Recommendations", 14, 120);

  autoTable(pdf, {
    startY: 130,
    head: [["#", "College Name", "Location", "Cutoff", "Fees", "Placement %"]],
    body: recommendations.map((c, i) => [
      i + 1,
      c.name,
      c.location,
      c.cutoff_rank || "N/A",              // FIXED
      formatFee(c.fee),                    // FIXED
      formatPlacement(c.placement_rate),   // FIXED
    ]),
    headStyles: {
      fillColor: [40, 40, 140],
      textColor: [255, 255, 255],
      halign: "center",
    },
    styles: {
      fontSize: 11,
    },
  });

  // --- FOOTER ---
  pdf.setFontSize(10);
  pdf.setTextColor(120);
  pdf.text(
    "This is an auto-generated report based on your profile & scoring algorithm.",
    14,
    pdf.internal.pageSize.height - 20
  );

  pdf.text("© 2025 CampusIQ", 14, pdf.internal.pageSize.height - 12);

  pdf.save("College-Recommendation-Report.pdf");
};



  // --- LOGOUT ---
  const handleLogout = () => {
    localStorage.clear();
    setToken("");
    setUser(null);
    navigate("/");
  };

  //recommendations
   const handleRecommend = async () => {
     setLoading(true); try { 
      const response = await axios.post( "http://localhost:8080/api/recommendations", rankForm ); 
    setRecommendations(response.data); } catch { alert("Failed to get recommendations."); } 
    setLoading(false); };

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
            {/*<Route path="/live-seats" element={<LiveSeatDashboard />} />
            <Route path="/ai-rank" element={<AIRankPredictor colleges={colleges} user={user} />} />*/}
            <Route path="/recommendation" element={ <RecommendationForm rankForm={rankForm} setRankForm={setRankForm} handleRecommend={handleRecommend} loading={loading} /> } />
            <Route
        path="/college/:id"
        element={
          <CollegeDetailsPage
            compareList={compareList}
            setCompareList={setCompareList}
          />
        }
      />
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