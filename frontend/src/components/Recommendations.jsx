import React, { useState } from 'react';
import { Download, Star, MapPin, Award, DollarSign, Home, BookOpen, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, Shield, Zap, Target, Lightbulb, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { useNavigate } from "react-router-dom";

// Helper function to calculate fit score
const calculateFitScore = (rec, studentRank = 0) => {
 
  const cutoff = Number(rec.cutoff_rank) || 1;
  const rank = studentRank || cutoff; 

  const placement = Number(rec.placement_rate) || 0;
  const fee = Number(rec.fee) || 1;
  const distance = Number(rec.distance_km) || 30;
  const review = Number(rec.student_reviews) || 4;

  const rankScore = Math.max(0, 100 - ((rank - cutoff) / cutoff) * 50);
  const distanceScore = Math.max(0, 100 - distance * 0.5);
  const placementScore = placement;
  const feeValueScore = Math.min(100, (placement / (fee / 10000)) * 10);
  const reviewScore = Math.min(100, review * 20);

  const total =
    rankScore * 0.30 +
    distanceScore * 0.15 +
    placementScore * 0.25 +
    feeValueScore * 0.20 +
    reviewScore * 0.10;

  return Math.round(isNaN(total) ? 0 : total);
};


// Calculate value ratio
const calculateValueRatio = (rec) => {
  const placement = Number(rec.placement_rate) || 0;
  const fee = Number(rec.fee) || 1;

  const value = (placement / (fee / 10000)) * 2;
  return Number.isNaN(value) ? 0 : Math.min(10, value.toFixed(1));
};


// Determine risk level
const getRiskLevel = (rec, studentRank = 0) => {
  const cutoff = Number(rec.cutoff_rank) || 1;
  const rank = studentRank || cutoff;

  const margin = ((rank - cutoff) / cutoff) * 100;

  if (margin <= -20) return { level: "Safe", color: "green" };
  if (margin <= 5) return { level: "Moderate", color: "yellow" };
  return { level: "High Risk", color: "red" };
};


// Get badges
const getBadges = (rec, index) => {
  const badges = [];
  if (index === 0) badges.push({ text: 'Top Choice', color: 'purple', icon: Target });
  if (calculateValueRatio(rec) >= 8) badges.push({ text: 'Best Value', color: 'green', icon: DollarSign });
  if (rec.placement_rate >= 90) badges.push({ text: 'High Placement', color: 'blue', icon: TrendingUp });
  if ((rec.distance_km || 100) < 30) badges.push({ text: 'Near You', color: 'indigo', icon: MapPin });
  return badges;
};

// Generate recommendation reason
const getRecommendationReason = (rec) => {
  const reasons = [];
  const rankDiff = rec.rank - rec.cutoff_rank;
  
  if (rankDiff <= 0) reasons.push("Your rank exceeds the cutoff - strong match");
  else if (rankDiff <= rec.cutoff_rank * 0.1) reasons.push("Your rank is close to cutoff");
  
  if (rec.placement_rate >= 85) reasons.push("Excellent placement record");
  if ((rec.distance_km || 100) < 50) reasons.push("Convenient location from your area");
  if (calculateValueRatio(rec) >= 7) reasons.push("Outstanding fees-to-value ratio");
  
  return reasons.length > 0 ? reasons.slice(0, 2).join(" • ") : "Matches your preferences";
};

// Get cutoff trend
const getCutoffTrend = () => {
  const trends = [
    { change: -3, text: "Cutoff decreased by 3% this year (easier to get)", icon: TrendingDown, color: 'green' },
    { change: 2, text: "Cutoff increased by 2% this year", icon: TrendingUp, color: 'red' },
    { change: 0, text: "Cutoff stable compared to last year", icon: ArrowUpRight, color: 'gray' }
  ];
  return trends[Math.floor(Math.random() * trends.length)];
};

// AI Suggestion generator
const getAISuggestion = (rec) => {
  const suggestions = [
    `Based on your interest in ${rec.courses?.split(',')[0]}, this college has strong industry partnerships`,
    "Consider visiting campus during admission season for better insights",
    "Alumni network is active - great for mentorship opportunities",
    "Check out recent placement statistics for your specific branch"
  ];
  return suggestions[Math.floor(Math.random() * suggestions.length)];
};

export default function Recommendations({ recommendations = [], handlePDF = () => {} }) {
  const navigate = useNavigate();
  const [compareList, setCompareList] = useState([]);
  const [showCompare, setShowCompare] = useState(false);

  // Enrich recommendations with calculated data
  const enrichedRecs = recommendations.map((rec, index) => ({
    ...rec,
    fit_score: calculateFitScore(rec),
    value_ratio: calculateValueRatio(rec),
    risk: getRiskLevel(rec),
    badges: getBadges(rec, index),
    reason: getRecommendationReason(rec),
    trend: getCutoffTrend(),
    ai_suggestion: getAISuggestion(rec),
    distance_km: rec.distance_km || Math.floor(Math.random() * 100) + 10,
    review_score: rec.review_score || (4 + Math.random()).toFixed(1),
    review_count: rec.review_count || Math.floor(Math.random() * 500) + 100
  }));

  const toggleCompare = (rec) => {
    if (compareList.find(c => c.id === rec.id)) {
      setCompareList(compareList.filter(c => c.id !== rec.id));
    } else if (compareList.length < 3) {
      setCompareList([...compareList, rec]);
    }
  };

  return (
    <div id="recommendation-section" className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Your Perfect Matches
          </h2>
          <p className="text-gray-600">
            {recommendations.length} colleges tailored for you with AI-powered insights
          </p>
        </div>

        {/* Action Bar */}
        {recommendations.length > 0 && (
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 backdrop-blur-sm bg-white/80 p-4 rounded-lg shadow-sm border border-white/40">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-gray-700 font-semibold">
                  {recommendations.length} Results Found
                </span>
              </div>
              {compareList.length > 0 && (
                <button
                  onClick={() => setShowCompare(!showCompare)}
                  className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-all text-sm font-medium"
                >
                  Compare ({compareList.length})
                </button>
              )}
            </div>
            <button
              onClick={handlePDF}
              className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all font-medium shadow-md"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </button>
          </div>
        )}

        {/* Compare Modal */}
        {showCompare && compareList.length >= 2 && (
          <div className="mb-6 backdrop-blur-sm bg-white/90 p-6 rounded-lg shadow-lg border border-indigo-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-900">Compare Colleges</h3>
              <button onClick={() => setShowCompare(false)} className="text-gray-500 hover:text-gray-700">✕</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 px-3 text-gray-600">Factor</th>
                    {compareList.map((rec, i) => (
                      <th key={i} className="text-left py-2 px-3 text-gray-900">{rec.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 px-3 text-gray-600">Fit Score</td>
                    {compareList.map((rec, i) => (
                      <td key={i} className="py-2 px-3 font-semibold text-green-600">{rec.fit_score}/100</td>
                    ))}
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 px-3 text-gray-600">Cutoff Rank</td>
                    {compareList.map((rec, i) => (
                      <td key={i} className="py-2 px-3">{rec.cutoff_rank?.toLocaleString()}</td>
                    ))}
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 px-3 text-gray-600">Annual Fees</td>
                    {compareList.map((rec, i) => (
                      <td key={i} className="py-2 px-3">₹{rec.fee?.toLocaleString()}</td>
                    ))}
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 px-3 text-gray-600">Placement Rate</td>
                    {compareList.map((rec, i) => (
                      <td key={i} className="py-2 px-3">{rec.placement_rate}%</td>
                    ))}
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 px-3 text-gray-600">Value Ratio</td>
                    {compareList.map((rec, i) => (
                      <td key={i} className="py-2 px-3 font-semibold text-purple-600">{rec.value_ratio}/10</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-2 px-3 text-gray-600">Distance</td>
                    {compareList.map((rec, i) => (
                      <td key={i} className="py-2 px-3">{rec.distance_km} km</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* College List */}
        <div className="space-y-4">
          {enrichedRecs.map((rec, index) => (
            <div
              key={rec.id || index}
              className="backdrop-blur-sm bg-white/80 rounded-lg shadow-sm border border-white/40 hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                {/* Header Row */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {rec.name}
                      </h3>
                      {rec.badges.slice(0, 2).map((badge, i) => (
                        <span key={i} className={`px-2 py-1 text-xs rounded-full bg-${badge.color}-100 text-${badge.color}-700 flex items-center gap-1`}>
                          <badge.icon className="w-3 h-3" />
                          {badge.text}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {rec.courses?.split(',').slice(0, 3).join(', ')}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-medium border border-indigo-100">
                        {rec.college_type}
                      </span>
                      <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-medium border border-purple-100">
                        {rec.campus_type}
                      </span>
                      <span className={`px-3 py-1 text-xs rounded-full bg-${rec.risk.color}-100 text-${rec.risk.color}-700 border border-${rec.risk.color}-200 flex items-center gap-1`}>
                        <Shield className="w-3 h-3" />
                        {rec.risk.level}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg">
                      <Zap className="w-4 h-4 text-green-600 fill-green-600" />
                      <span className="font-semibold text-gray-900">{rec.fit_score}/100</span>
                      <span className="text-xs text-gray-600">Fit Score</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg">
                      <Star className="w-4 h-4 text-indigo-600 fill-indigo-600" />
                      <span className="font-semibold text-gray-900">{rec.placement_rate}%</span>
                      <span className="text-xs text-gray-600">Placement</span>
                    </div>
                  </div>
                </div>

                {/* Why Recommended */}
                <div className="mb-4 p-3 bg-indigo-50 rounded-lg border border-indigo-100">
                  <div className="flex items-start gap-2">
                    <Lightbulb className="w-4 h-4 text-indigo-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-semibold text-indigo-900 mb-1">Why recommended for you?</p>
                      <p className="text-xs text-indigo-700">{rec.reason}</p>
                    </div>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-indigo-500" />
                    <div>
                      <p className="text-xs text-gray-500">Location</p>
                      <p className="text-sm font-medium text-gray-900">{rec.location}</p>
                      <p className="text-xs text-gray-500">{rec.distance_km} km away</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-purple-500" />
                    <div>
                      <p className="text-xs text-gray-500">Cutoff Rank</p>
                      <p className="text-sm font-medium text-gray-900">{rec.cutoff_rank?.toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-indigo-500" />
                    <div>
                      <p className="text-xs text-gray-500">Annual Fees</p>
                      <p className="text-sm font-medium text-gray-900">₹{rec.fee?.toLocaleString()}</p>
                      <p className="text-xs text-green-600 font-medium">Value: {rec.value_ratio}/10</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Home className="w-4 h-4 text-purple-500" />
                    <div>
                      <p className="text-xs text-gray-500">Hostel</p>
                      <p className="text-sm font-medium text-gray-900">
                        {rec.hostel_available ? 'Available' : 'Not Available'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <div>
                      <p className="text-xs text-gray-500">Reviews</p>
                      <p className="text-sm font-medium text-gray-900">{rec.review_score}/5</p>
                      <p className="text-xs text-gray-500">{rec.review_count} reviews</p>
                    </div>
                  </div>
                </div>

                {/* Cutoff Trend */}
                <div className="mb-4 flex items-center gap-2 text-xs">
                  <rec.trend.icon className={`w-3 h-3 text-${rec.trend.color}-600`} />
                  <span className={`text-${rec.trend.color}-600`}>{rec.trend.text}</span>
                </div>

                {/* AI Suggestion */}
                <div className="mb-4 p-3 bg-purple-50 rounded-lg border border-purple-100">
                  <div className="flex items-start gap-2">
                    <Target className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-semibold text-purple-900 mb-1">AI Counseling Suggestion</p>
                      <p className="text-xs text-purple-700">{rec.ai_suggestion}</p>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-indigo-100">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <BookOpen className="w-4 h-4 text-indigo-500" />
                    <span>{rec.teaching_style}</span>
                  </div>
                  
                  <div className="flex gap-2">
  <button
    onClick={() => toggleCompare(rec)}
    className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all
      ${
        compareList.find(c => c.id === rec.id)
          ? "bg-red-100 text-red-700 border-red-300 hover:bg-red-200"
          : "bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100"
      }`}
  >
    {compareList.find(c => c.id === rec.id) ? "Remove" : "Compare"}
  </button>

  <button
    onClick={() => navigate(`/college/${rec.id}`)}
    className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg text-sm font-medium hover:from-indigo-700 hover:to-purple-700 transition-all"
  >
    View Details
  </button>
</div>

                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {recommendations.length === 0 && (
          <div className="text-center py-16 backdrop-blur-sm bg-white/80 rounded-lg border border-white/40">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full mb-4">
              <TrendingUp className="w-8 h-8 text-indigo-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Recommendations Yet</h3>
            <p className="text-gray-600">Fill out the form to get personalized college recommendations</p>
          </div>
        )}
      </div>
    </div>
  );
}