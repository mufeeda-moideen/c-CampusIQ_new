import React from "react";
import { useNavigate } from "react-router-dom";

export default function RecommendationForm({
  rankForm = {},
  setRankForm = () => {},
  handleRecommend = () => {},
  loading = false,
}) {
  const navigate = useNavigate();

  const navigateToRecommendations = () => {
    handleRecommend();  // Optional: call your logic first
    navigate("/recommendations"); // Navigate to next page
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-20 bg-gradient-to-tr from-[#667eea] via-[#7c6fb5] to-[#764ba2] overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-300/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="w-full max-w-4xl relative">
        {/* Glassmorphism Card */}
        <div className="backdrop-blur-xl bg-white/90 p-8 md:p-12 rounded-3xl shadow-2xl border border-white/20 transform hover:scale-[1.01] transition-transform duration-300">
          {/* Heading with Gradient Text */}
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Get Personalized Recommendations
            </h2>
            <p className="text-gray-600 text-lg">Fill in your details to discover your perfect college match</p>
          </div>

          {/* Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Exam */}
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2 group-hover:text-indigo-600 transition-colors">
                Exam Type
              </label>
              <select
                value={rankForm.examType}
                onChange={(e) =>
                  setRankForm({ ...rankForm, examType: e.target.value })
                }
                className="w-full px-5 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white hover:border-indigo-300 appearance-none cursor-pointer"
              >
                <option value="">Select Exam</option>
                <option value="KEAM">KEAM</option>
                <option value="NEET">NEET</option>
                <option value="JEE">JEE</option>
              </select>
            </div>

            {/* Rank */}
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2 group-hover:text-indigo-600 transition-colors">
                Your Rank
              </label>
              <input
                type="number"
                placeholder="Enter your rank"
                value={rankForm.rank}
                onChange={(e) => setRankForm({ ...rankForm, rank: e.target.value })}
                className="w-full px-5 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white hover:border-indigo-300 placeholder:text-gray-400"
              />
            </div>

            {/* Location */}
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2 group-hover:text-indigo-600 transition-colors">
                Preferred Location
              </label>
              <input
                type="text"
                placeholder="e.g., Bangalore, Mumbai"
                value={rankForm.location}
                onChange={(e) =>
                  setRankForm({ ...rankForm, location: e.target.value })
                }
                className="w-full px-5 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white hover:border-indigo-300 placeholder:text-gray-400"
              />
            </div>

            {/* Course */}
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2 group-hover:text-indigo-600 transition-colors">
                Course Interest
              </label>
              <input
                type="text"
                placeholder="e.g., Computer Science, Medicine"
                value={rankForm.course}
                onChange={(e) =>
                  setRankForm({ ...rankForm, course: e.target.value })
                }
                className="w-full px-5 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white hover:border-indigo-300 placeholder:text-gray-400"
              />
            </div>

            {/* Budget */}
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2 group-hover:text-indigo-600 transition-colors">
                Budget Range
              </label>
              <select
                value={rankForm.budget}
                onChange={(e) =>
                  setRankForm({ ...rankForm, budget: e.target.value })
                }
                className="w-full px-5 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white hover:border-indigo-300 appearance-none cursor-pointer"
              >
                <option value="">Select Budget</option>
                <option value="low">Below ₹50,000</option>
                <option value="mid">₹50,000 – ₹1,50,000</option>
                <option value="high">Above ₹1,50,000</option>
              </select>
            </div>

            {/* Career Goal */}
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2 group-hover:text-indigo-600 transition-colors">
                Career Goal
              </label>
              <select
                value={rankForm.careerGoal}
                onChange={(e) =>
                  setRankForm({ ...rankForm, careerGoal: e.target.value })
                }
                className="w-full px-5 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white hover:border-indigo-300 appearance-none cursor-pointer"
              >
                <option value="">Select Career Goal</option>
                <option value="placement">High Placement</option>
                <option value="higher-studies">Higher Studies / Research</option>
                <option value="startup">Startup & Innovation</option>
                <option value="abroad">Abroad Opportunities</option>
              </select>
            </div>

            {/* Campus Preference */}
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2 group-hover:text-indigo-600 transition-colors">
                Campus Preference
              </label>
              <select
                value={rankForm.campusType}
                onChange={(e) =>
                  setRankForm({ ...rankForm, campusType: e.target.value })
                }
                className="w-full px-5 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white hover:border-indigo-300 appearance-none cursor-pointer"
              >
                <option value="">Select Campus Type</option>
                <option value="urban">Urban</option>
                <option value="semi-urban">Semi-Urban</option>
                <option value="rural">Rural</option>
              </select>
            </div>

            {/* College Type */}
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2 group-hover:text-indigo-600 transition-colors">
                College Type
              </label>
              <select
                value={rankForm.collegeType}
                onChange={(e) =>
                  setRankForm({ ...rankForm, collegeType: e.target.value })
                }
                className="w-full px-5 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white hover:border-indigo-300 appearance-none cursor-pointer"
              >
                <option value="">Select College Type</option>
                <option value="government">Government</option>
                <option value="private">Private</option>
                <option value="autonomous">Autonomous</option>
                <option value="deemed">Deemed</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={navigateToRecommendations}
            disabled={loading}
            className="mt-10 w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-lg hover:from-indigo-700 hover:to-purple-700 active:scale-[0.98] transition-all duration-300 shadow-xl shadow-indigo-500/30 hover:shadow-2xl hover:shadow-indigo-500/40 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 relative overflow-hidden group"
          >
            <span className="relative z-10">
              {loading ? (
                <span className="flex items-center justify-center gap-3">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analyzing Your Profile...
                </span>
              ) : (
                "Get Smart Recommendations ✨"
              )}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>

          {/* Trust Indicators */}
          <div className="mt-8 flex items-center justify-center gap-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>AI-Powered</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Secure</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>Top Rated</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}