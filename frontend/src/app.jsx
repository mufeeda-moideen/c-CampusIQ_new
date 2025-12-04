import React, { useState, useEffect } from "react";
import { BookOpen, Star, Building, Users , LogOut, Menu, X , Brain } from "lucide-react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";

// Components
import AuthForm from "./components/AuthForm";
import Dashboard from "./components/Dashboard";
import Recommendations from "./components/Recommendations";
import Colleges from "./components/Colleges";
import AdminPanel from "./components/AdminPanel";
import RecommendationForm from "./components/RecommendationForm";
import QuizSession from "./components/QuizSession";
import Chatbot from "./components/chatbot"; // add import



// ------------------------------------
// MAIN APP (Router Wrapper)
// ------------------------------------
export default function App() {
  return (
    <Router>
      <MainApp />
    </Router>
  );
}

// ------------------------------------
// REAL APPLICATION LOGIC HERE
// ------------------------------------
function MainApp() {
  const navigate = useNavigate();

  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Forms
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user"
  });

  const [rankForm, setRankForm] = useState({
    examType: "",
    rank: "",
    location: "",
    course: "",
    budget: "",
    careerGoal: "",
    campusType: "",
    collegeType: ""
  });

  const [collegeForm, setCollegeForm] = useState({
    name: "",
    location: "",
    courses: "",
    cutoff_rank: "",
    fee: "",
    hostel_available: false,
    teaching_style: "",
    placement_rate: "",
    college_type: "",
    campus_type: ""
  });

  const [recommendations, setRecommendations] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [filteredColleges, setFilteredColleges] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  //const [sidebarOpen, setSidebarOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);



  // ------------------------------------
  // LOGIN
  // ------------------------------------
  const handleLogin = async () => {
    setLoading(true);
    try {
      const url =
        form.role === "admin"
          ? "http://localhost:8080/api/admin/login"
          : "http://localhost:8080/api/auth/login";

      const body =
        form.role === "admin"
          ? { email: form.email, password: form.password }
          : { email: form.email, password: form.password };

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Login failed");
        setLoading(false);
        return;
      }

      setToken(data.token);
      setUser({ role: form.role });

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", form.role);

      if (form.role === "admin") navigate("/admin");
      else navigate("/dashboard");

    } catch (err) {
      console.error(err);
      alert("Server error");
    }
    setLoading(false);
  };

  // ------------------------------------
  // SIGNUP
  // ------------------------------------
  const handleSignup = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullname: form.name,
          email: form.email,
          password: form.password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Signup failed");
        setLoading(false);
        return;
      }

      setToken("mock-token");
      setUser({ name: form.name, email: form.email });

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
    setLoading(false);
  };

  // ------------------------------------
  // FETCH RECOMMENDATIONS
  // ------------------------------------
  const handleRecommend = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/recommendations",
        rankForm
      );
      setRecommendations(response.data);
    } catch {
      alert("Failed to get recommendations.");
    }
    setLoading(false);
  };

  // ------------------------------------
  // SEARCH
  // ------------------------------------
  const handleSearch = (term) => {
    setSearchTerm(term);
    if (!term) return setFilteredColleges(colleges);

    const filtered = colleges.filter((c) =>
      (c.name + c.location + c.courses).toLowerCase().includes(term.toLowerCase())
    );

    setFilteredColleges(filtered);
  };

  // ------------------------------------
  // FETCH COLLEGES
  // ------------------------------------
  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/colleges");
        setColleges(response.data);
        setFilteredColleges(response.data);
      } catch (err) {
        console.error("Failed to fetch colleges:", err);
      }
    };
    fetchColleges();
  }, []);

  // ------------------------------------
  // PDF Download
  // ------------------------------------
  const handlePDF = () => {
    const pdf = new jsPDF();
    pdf.setFontSize(16);
    pdf.text("College Recommendations", 10, 10);

    recommendations.forEach((rec, index) => {
      pdf.text(`${index + 1}. ${rec.name} - ${rec.location}`, 10, 20 + index * 10);
    });

    pdf.save("recommendations.pdf");
  };

  // ------------------------------------
  // LOGIN SCREEN
  // ------------------------------------
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

 const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  setToken("");
  setUser(null);
  navigate("/");
};



  // ------------------------------------
  // MAIN APP UI
  // ------------------------------------
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="fixed top-0 w-full bg-white/95 backdrop-blur-md px-[5%] py-6 flex items-center justify-between z-[1000] shadow">

  {/* Logo */}
  <h1 className="text-[1.5rem] font-bold bg-gradient-to-tr from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">
    CampusIQ
  </h1>

  {/* Hamburger (visible on both desktop & mobile) */}
  <button
    className="flex items-center justify-center p-2 border rounded-lg hover:bg-gray-100"
    onClick={() => setMenuOpen(!menuOpen)}
  >
    {menuOpen ? <X size={26} /> : <Menu size={26} />}
  </button>

</div>
{menuOpen && (
  <div className="bg-white border-t shadow-xl px-6 py-5 space-y-6 absolute top-[90px] right-0 w-full md:w-80 z-[999]">

    <Link
      to="/dashboard"
      onClick={() => setMenuOpen(false)}
      className="flex items-center gap-3 text-gray-700 text-lg hover:text-indigo-600"
    >
      <BookOpen /> Dashboard
    </Link>

    <Link
      to="/recommendations"
      onClick={() => setMenuOpen(false)}
      className="flex items-center gap-3 text-gray-700 text-lg hover:text-indigo-600"
    >
      <Star /> Recommendations
    </Link>

    <Link
      to="/colleges"
      onClick={() => setMenuOpen(false)}
      className="flex items-center gap-3 text-gray-700 text-lg hover:text-indigo-600"
    >
      <Building /> Colleges
    </Link>
    <Link
      to="/quiz"
      onClick={() => setMenuOpen(false)}
      className="flex items-center gap-3 text-gray-700 text-lg hover:text-indigo-600"
    >
      <Star /> Career Quiz
    </Link>
    <Link
      to="/chatbot"
      onClick={() => setMenuOpen(false)}
      className="flex items-center gap-3 text-gray-700 text-lg hover:text-indigo-600"
    >
      <Brain /> AI Assistant
    </Link>



    <Link
      to="/admin"
      onClick={() => setMenuOpen(false)}
      className="flex items-center gap-3 text-gray-700 text-lg hover:text-indigo-600"
    >
      <Users /> Admin
    </Link>

    {/* Logout at Bottom */}
    <button
      onClick={() => {
        setMenuOpen(false);
        handleLogout();
      }}
      className="w-full flex items-center gap-3 text-red-600 text-lg font-semibold pt-3 border-t"
    >
      <LogOut /> Logout
    </button>

  </div>
)}


      {/* ROUTES */}
      <div className="flex-1 p-6 mt-20">
        <Routes>
          <Route
            path="/dashboard"
            element={
              <Dashboard
                colleges={colleges}
                recommendations={recommendations}
                rankForm={rankForm}
                setRankForm={setRankForm}
                handleRecommend={handleRecommend}
                loading={loading}
              />
            }
          />

          <Route
            path="/recommendations"
            element={
              <Recommendations
                recommendations={recommendations}
                handlePDF={handlePDF}
                user={user}
              />
            }
          />

          <Route
            path="/colleges"
            element={
              <Colleges
                colleges={filteredColleges}
                searchTerm={searchTerm}
                handleSearch={handleSearch}
              />
            }
          />

          <Route path="/quiz" element={<QuizSession />} />
          <Route path="/chatbot" element={<Chatbot />} />

          <Route
            path="/admin"
            element={
              user?.role === "admin" ? (
                <AdminPanel
                  colleges={colleges}
                  setColleges={setColleges}
                  collegeForm={collegeForm}
                  setCollegeForm={setCollegeForm}
                />
              ) : (
                <h2 className="text-center text-red-600 mt-20">
                  Unauthorized: Admin Only
                </h2>
              )
            }
          />

          <Route
            path="/recommendation"
            element={
              <RecommendationForm
                rankForm={rankForm}
                setRankForm={setRankForm}
                handleRecommend={handleRecommend}
                loading={loading}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
}
