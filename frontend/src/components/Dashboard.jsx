import React, { useState, useEffect } from 'react';
import { Building, Star, TrendingUp, Users } from 'lucide-react';
import { Link } from 'react-router-dom';


export default function Dashboard({ colleges, recommendations }) {
  const [current, setCurrent] = useState(0);

  /*useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);*/

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center text-center px-6 bg-gradient-to-tr from-[#667eea] to-[#764ba2]">
        <div className="max-w-[800px] animate-fadeInUp">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
            Find Your Perfect College
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-white/90 mb-10">
            Get personalized recommendations based on your exam rank, interests, and career goals.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link 
              to="/recommendation"
              className="px-8 py-3 rounded-full bg-white text-[#667eea] font-semibold text-lg transition transform hover:-translate-y-1 hover:shadow-lg"
            >
              Get Recommendations
            </Link>
            <Link 
              to="/colleges"
              className="px-8 py-3 rounded-full border-2 border-white text-white font-semibold text-lg transition hover:bg-white hover:text-[#667eea]"
            >
              Explore Colleges
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 bg-white">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
          Why Choose Our Platform?
        </h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gradient-to-tr from-gray-100 to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-2">
            <div className="w-20 h-20 flex items-center justify-center text-3xl mb-4 rounded-xl bg-gradient-to-tr from-[#667eea] to-[#764ba2] text-white">
              🎯
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Personalized Matching</h3>
            <p className="text-gray-600 leading-relaxed">
              Get college options tailored to your entrance exam rank, stream, and career interests.
            </p>
          </div>
          <div className="bg-gradient-to-tr from-gray-100 to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-2">
            <div className="w-20 h-20 flex items-center justify-center text-3xl mb-4 rounded-xl bg-gradient-to-tr from-[#667eea] to-[#764ba2] text-white">
              📊
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Data-Driven Insights</h3>
            <p className="text-gray-600 leading-relaxed">
              Compare placement rates, facilities, and rankings to make an informed choice.
            </p>
          </div>
          <div className="bg-gradient-to-tr from-gray-100 to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-2">
            <div className="w-20 h-20 flex items-center justify-center text-3xl mb-4 rounded-xl bg-gradient-to-tr from-[#667eea] to-[#764ba2] text-white">
              🏫
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Verified Colleges</h3>
            <p className="text-gray-600 leading-relaxed">
              Access authentic data of top colleges with official details and admission guidance.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats bg-gradient-to-tr from-teal-400 to-cyan-500 text-white py-24 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-2">500+</h2>
            <p className="text-lg md:text-xl opacity-90">Colleges Listed</p>
          </div>
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-2">10K+</h2>
            <p className="text-lg md:text-xl opacity-90">Students Guided</p>
          </div>
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-2">95%</h2>
            <p className="text-lg md:text-xl opacity-90">Happy Students</p>
          </div>
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-2">24/7</h2>
            <p className="text-lg md:text-xl opacity-90">Support</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white text-center py-12 px-6">
        <p className="text-base md:text-lg">&copy; 2025 CampusIQ. All rights reserved.</p>
      </footer>
    </>
  );
}
