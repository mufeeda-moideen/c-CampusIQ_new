import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import {
  Globe, ExternalLink, Zap, Star, Award, MapPin, Building, DollarSign, Home,
  BookOpen, Trophy, Users, Phone, Mail, Lightbulb, Target, Shield, TrendingDown,
  CheckCircle
} from 'lucide-react';

const iconMap = { Target, DollarSign, TrendingDown };

export default function CollegeDetailsPage() {
   const location = useLocation();
  const { toggleCompare, compareList } = location.state || {};
  
  const { id } = useParams();
  const [college, setCollege] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/api/colleges/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('College not found');
        return res.json();
      })
      .then(data => setCollege(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-gray-600">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Detail Modal */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6">
            <h2 className="text-3xl font-bold mb-2">{college.name}</h2>
            <p className="text-indigo-100 text-lg mb-3">{college.location}</p>
            <div className="flex flex-wrap gap-2">
              {college.badges.map((badge, i) => {
                const Icon = iconMap[badge.icon] || Target;
                return (
                  <span key={i} className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium flex items-center gap-1">
                    <Icon className="w-4 h-4" />
                    {badge.text}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
                <div className="flex items-center gap-2 mb-1">
                  <Zap className="w-5 h-5 text-green-600" />
                  <span className="text-xs text-gray-600">Fit Score</span>
                </div>
                <p className="text-3xl font-bold text-gray-900">{college.fit_score}/100</p>
              </div>
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-4 rounded-lg border border-indigo-200">
                <div className="flex items-center gap-2 mb-1">
                  <Star className="w-5 h-5 text-indigo-600" />
                  <span className="text-xs text-gray-600">Placement</span>
                </div>
                <p className="text-3xl font-bold text-gray-900">{college.placement_rate}%</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200">
                <div className="flex items-center gap-2 mb-1">
                  <Award className="w-5 h-5 text-purple-600" />
                  <span className="text-xs text-gray-600">Cutoff Rank</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{college.cutoff_rank?.toLocaleString()}</p>
              </div>
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-4 rounded-lg border border-yellow-200">
                <div className="flex items-center gap-2 mb-1">
                  <Star className="w-5 h-5 text-yellow-600" />
                  <span className="text-xs text-gray-600">Reviews</span>
                </div>
                <p className="text-3xl font-bold text-gray-900">{college.review_score}/5</p>
                <p className="text-xs text-gray-500 mt-1">{college.review_count} reviews</p>
              </div>
            </div>

            {/* Visit Website */}
            <a
              href={college.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all font-semibold shadow-lg text-lg mb-6"
            >
              <Globe className="w-6 h-6" />
              Visit Official Website
              <ExternalLink className="w-5 h-5" />
            </a>

            {/* Why Recommended */}
            <div className="mb-6 p-4 bg-indigo-50 rounded-xl border border-indigo-200">
              <div className="flex items-start gap-3">
                <Lightbulb className="w-6 h-6 text-indigo-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-indigo-900 mb-2 text-lg">Why recommended for you?</p>
                  <p className="text-indigo-700">{college.reason}</p>
                </div>
              </div>
            </div>

            {/* AI Suggestion */}
            <div className="mb-6 p-4 bg-purple-50 rounded-xl border border-purple-200">
              <div className="flex items-start gap-3">
                <Target className="w-6 h-6 text-purple-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-purple-900 mb-2 text-lg">AI Counseling Suggestion</p>
                  <p className="text-purple-700">{college.ai_suggestion}</p>
                </div>
              </div>
            </div>

            {/* Courses */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-indigo-600" />
                Courses Offered
              </h3>
              <div className="flex flex-wrap gap-3">
                {college.courses?.split(',').map((c, i) => (
                  <span key={i} className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-medium border border-indigo-200">
                    {c.trim()}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-8 pt-6 border-t border-gray-200">
              <button className="flex-1 px-6 py-3 bg-white text-indigo-600 border-2 border-indigo-600 rounded-lg font-semibold hover:bg-indigo-700 hover:text-white transition-all">
                Add to Compare
              </button>
              {/*<button className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all">
                Apply Now
              </button>*/}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
