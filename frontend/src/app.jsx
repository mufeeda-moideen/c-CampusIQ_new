import React, { useState, useEffect } from "react";
import { BookOpen, Star, Building, Users } from "lucide-react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";


// Components
import AuthForm from "./components/AuthForm";
import Dashboard from "./components/Dashboard";
import Recommendations from "./components/Recommendations";
import Colleges from "./components/Colleges";
import AdminPanel from "./components/AdminPanel";
import RecommendationForm from "./components/RecommendationForm";

export default function App() {
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  


  // Forms
  const [form, setForm] = useState({ name: "", email: "", password: "" });
 const [rankForm, setRankForm] = useState({
  examType: "",     // KEAM, NEET, JEE
  rank: "",         // numeric rank
  location: "",     // preferred location
  course: "",       // course interest
  budget: "",       // low, mid, high
  careerGoal: "",   // placement, higher-studies, startup, abroad
  campusType: "",   // urban, semi-urban, rural
  collegeType: ""   // government, private, autonomous, deemed
});

 const [collegeForm, setCollegeForm] = useState({
  name: "",
  location: "",
  courses: "",          // comma-separated courses
  cutoff_rank: "",      // number
  fee: "",              // number
  hostel_available: false,  // boolean
  teaching_style: "",   // e.g., Practical, Theory, Hybrid
  placement_rate: "",   // number (percentage)
  college_type: "",     // government, private, autonomous, deemed
  campus_type: ""       // urban, semi-urban, rural
});


  // Data
  const [recommendations, setRecommendations] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [filteredColleges, setFilteredColleges] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Mock Data
  /*const mockColleges = [
    {
      id: 1,
      name: "IIT Kerala",
      location: "Palakkad",
      course: "Computer Science",
      cutoff_rank: 500,
      fees: "₹2,00,000",
      rating: 4.8,
      placement_rate: "95%"
    },
    {
      id: 2,
      name: "NIT Calicut",
      location: "Kozhikode",
      course: "Electronics",
      cutoff_rank: 1200,
      fees: "₹1,50,000",
      rating: 4.6,
      placement_rate: "90%"
    },
    {
      id: 3,
      name: "CUSAT",
      location: "Kochi",
      course: "Information Technology",
      cutoff_rank: 2000,
      fees: "₹80,000",
      rating: 4.3,
      placement_rate: "85%"
    }
  ];*/

  // Auth Handlers
  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setToken("mock-token");
      setUser({ name: form.name, email: form.email });
      setLoading(false);
    }, 1000);
  };

  const handleSignup = () => {
    setLoading(true);
    setTimeout(() => {
      setToken("mock-token");
      setUser({ name: form.name, email: form.email });
      setLoading(false);
    }, 1000);
  };

  // Recommendation logic
const handleRecommend = async () => {
  setLoading(true);
  try {
    const response = await axios.post(
      "http://localhost:8080/api/recommendations",
      rankForm
    );
    // Set recommendations from backend
    setRecommendations(response.data);
  } catch (error) {
    console.error("Failed to fetch recommendations:", error);
    alert("Failed to get recommendations. Try again.");
  } finally {
    setLoading(false);
  }
};

  // Search
  const handleSearch = (term) => {
    setSearchTerm(term);
    if (!term) setFilteredColleges(colleges);
    else {
      const filtered = colleges.filter(
        (c) =>
          c.name.toLowerCase().includes(term.toLowerCase()) ||
          c.location.toLowerCase().includes(term.toLowerCase()) ||
          c.course.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredColleges(filtered);
    }
  };

  // Load colleges from backend
useEffect(() => {
  const fetchColleges = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/colleges");
      setColleges(response.data);
      setFilteredColleges(response.data);
    } catch (error) {
      console.error("Failed to fetch colleges:", error);
      alert("Could not load colleges. Try again later.");
    }
  };

  fetchColleges();
}, []);

  // Auth screen
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

  // Main App
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Header */}
        <div className="fixed top-0 w-full bg-white/95 backdrop-blur-md px-[5%] py-6 flex items-center justify-between z-[1000] shadow-[0_2px_20px_rgba(0,0,0,0.1)]">
  {/* Logo */}
  <h1 className="text-[1.5rem] font-bold bg-gradient-to-tr from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">
    CampusIQ
  </h1>

  {/* Nav Links */}
  <nav className="flex gap-8">
    <Link
      to="/"
      className="flex items-center text-gray-600 hover:text-indigo-500 font-medium transition-colors"
    >
      <BookOpen className="w-4 h-4 mr-2" /> Dashboard
    </Link>
    <Link
      to="/recommendations"
      className="flex items-center text-gray-600 hover:text-indigo-500 font-medium transition-colors"
    >
      <Star className="w-4 h-4 mr-2" /> Recommendations
    </Link>
    <Link
      to="/colleges"
      className="flex items-center text-gray-600 hover:text-indigo-500 font-medium transition-colors"
    >
      <Building className="w-4 h-4 mr-2" /> Colleges
    </Link>
    <Link
      to="/admin"
      className="flex items-center text-gray-600 hover:text-indigo-500 font-medium transition-colors"
    >
      <Users className="w-4 h-4 mr-2" /> Admin
    </Link>
  </nav>
</div>


        {/* Routes */}
        <div className="flex-1 p-6">
          <Routes>
            <Route
              path="/"
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
              element={<Recommendations recommendations={recommendations} user={user} />}
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
            <Route
              path="/admin"
              element={
                <AdminPanel
                  colleges={colleges}
                  setColleges={setColleges}
                  filteredColleges={filteredColleges}
                  setFilteredColleges={setFilteredColleges}
                  collegeForm={collegeForm}
                  setCollegeForm={setCollegeForm}
                />
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

        {/* Footer */}
        {/*<footer className="bg-[#111827] text-white py-4 text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} CampusIQ. All rights reserved.
          </p>
        </footer>*/}
      </div>
    </Router>
  );
}
