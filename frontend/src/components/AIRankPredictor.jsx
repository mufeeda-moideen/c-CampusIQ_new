import React, { useState } from 'react';
import { Brain, TrendingUp, TrendingDown, Minus, Target, Award, Calendar, AlertCircle, CheckCircle, XCircle, Sparkles, BarChart3, Zap, MapPin, DollarSign, Users, GraduationCap, Filter, Download, Share2 } from 'lucide-react';

export default function AIRankPredictor({ colleges, user }) {
  const [formData, setFormData] = useState({
    examType: 'KEAM',
    rank: '15420',
    category: 'General',
    branch: 'Computer Science',
    location: 'Kerala',
    budget: 'Below 1 Lakh',
    hostel: 'Required'
  });

  const [showResults, setShowResults] = useState(false);
  const [selectedCollege, setSelectedCollege] = useState(null);

  const predictions = [
    {
      id: 1,
      college: 'Govt Engineering College, Thrissur',
      course: 'Computer Science & Engineering',
      location: 'Thrissur',
      type: 'Government',
      probability: 92,
      confidence: 'High',
      lastYearCutoff: 14500,
      currentYearPrediction: 15800,
      trend: 'up',
      trendPercent: 8.9,
      seatsTotal: 120,
      seatsRemaining: 22,
      fees: '₹50,000',
      placement: '94%',
      avgPackage: '8.5 LPA',
      factors: [
        { name: 'Your Rank', impact: 'positive', score: 95 },
        { name: 'Category', impact: 'neutral', score: 70 },
        { name: 'Previous Cutoffs', impact: 'positive', score: 88 },
        { name: 'Seat Availability', impact: 'positive', score: 82 }
      ],
      historicalData: [
        { year: '2021', cutoff: 13200 },
        { year: '2022', cutoff: 14100 },
        { year: '2023', cutoff: 14500 },
        { year: '2024', cutoff: 15800 }
      ]
    },
    {
      id: 2,
      college: 'College of Engineering Trivandrum',
      course: 'Computer Science & Engineering',
      location: 'Trivandrum',
      type: 'Government',
      probability: 78,
      confidence: 'Medium',
      lastYearCutoff: 8200,
      currentYearPrediction: 9100,
      trend: 'up',
      trendPercent: 11.0,
      seatsTotal: 150,
      seatsRemaining: 5,
      fees: '₹48,000',
      placement: '96%',
      avgPackage: '10.2 LPA',
      factors: [
        { name: 'Your Rank', impact: 'neutral', score: 65 },
        { name: 'Category', impact: 'neutral', score: 70 },
        { name: 'Previous Cutoffs', impact: 'negative', score: 45 },
        { name: 'Seat Availability', impact: 'negative', score: 30 }
      ],
      historicalData: [
        { year: '2021', cutoff: 7100 },
        { year: '2022', cutoff: 7800 },
        { year: '2023', cutoff: 8200 },
        { year: '2024', cutoff: 9100 }
      ]
    },
    {
      id: 3,
      college: 'Model Engineering College',
      course: 'Computer Science & Engineering',
      location: 'Kochi',
      type: 'Private',
      probability: 45,
      confidence: 'Low',
      lastYearCutoff: 15800,
      currentYearPrediction: 16500,
      trend: 'up',
      trendPercent: 4.4,
      seatsTotal: 60,
      seatsRemaining: 25,
      fees: '₹1,20,000',
      placement: '88%',
      avgPackage: '9.2 LPA',
      factors: [
        { name: 'Your Rank', impact: 'negative', score: 48 },
        { name: 'Category', impact: 'neutral', score: 70 },
        { name: 'Previous Cutoffs', impact: 'negative', score: 42 },
        { name: 'Seat Availability', impact: 'positive', score: 75 }
      ],
      historicalData: [
        { year: '2021', cutoff: 14200 },
        { year: '2022', cutoff: 15100 },
        { year: '2023', cutoff: 15800 },
        { year: '2024', cutoff: 16500 }
      ]
    },
    {
      id: 4,
      college: 'NSS College of Engineering',
      course: 'Computer Science & Engineering',
      location: 'Palakkad',
      type: 'Private',
      probability: 88,
      confidence: 'High',
      lastYearCutoff: 12200,
      currentYearPrediction: 13500,
      trend: 'up',
      trendPercent: 10.7,
      seatsTotal: 90,
      seatsRemaining: 18,
      fees: '₹85,000',
      placement: '85%',
      avgPackage: '7.8 LPA',
      factors: [
        { name: 'Your Rank', impact: 'positive', score: 92 },
        { name: 'Category', impact: 'neutral', score: 70 },
        { name: 'Previous Cutoffs', impact: 'positive', score: 85 },
        { name: 'Seat Availability', impact: 'positive', score: 78 }
      ],
      historicalData: [
        { year: '2021', cutoff: 10500 },
        { year: '2022', cutoff: 11200 },
        { year: '2023', cutoff: 12200 },
        { year: '2024', cutoff: 13500 }
      ]
    }
  ];

  const getChanceIcon = (prob) => {
    if (prob >= 75) return <CheckCircle className="w-6 h-6" />;
    if (prob >= 50) return <AlertCircle className="w-6 h-6" />;
    return <XCircle className="w-6 h-6" />;
  };

  const getChanceColor = (prob) => {
    if (prob >= 75) return 'text-green-600';
    if (prob >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getChanceBg = (prob) => {
    if (prob >= 75) return 'bg-green-50 border-green-200';
    if (prob >= 50) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  const getChanceText = (prob) => {
    if (prob >= 75) return 'High Chance';
    if (prob >= 50) return 'Medium Chance';
    return 'Low Chance';
  };

  const getImpactColor = (impact) => {
    if (impact === 'positive') return 'text-green-600';
    if (impact === 'negative') return 'text-red-600';
    return 'text-gray-600';
  };

  const getImpactBg = (impact) => {
    if (impact === 'positive') return 'bg-green-50';
    if (impact === 'negative') return 'bg-red-50';
    return 'bg-gray-50';
  };

  const getTrendIcon = (trend) => {
    if (trend === 'up') return <TrendingUp className="w-4 h-4" />;
    if (trend === 'down') return <TrendingDown className="w-4 h-4" />;
    return <Minus className="w-4 h-4" />;
  };

  const handlePredict = () => {
    setShowResults(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg border-b border-indigo-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl">
                <Brain className="w-8 h-8 text-indigo-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  AI Admission Probability Predictor
                </h1>
                <p className="text-gray-600 text-sm mt-1">Powered by ML models trained on 5 years of admission data</p>
              </div>
            </div>
            {showResults && (
              <div className="flex gap-2">
                <button className="flex items-center gap-2 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                  <Download className="w-4 h-4" />
                  Export PDF
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Input Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border-2 border-indigo-100">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-6 h-6 text-indigo-600" />
            <h2 className="text-xl font-bold text-gray-800">Enter Your Details</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Exam Type</label>
              <select
                value={formData.examType}
                onChange={(e) => setFormData({...formData, examType: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
              >
                <option>KEAM</option>
                <option>NEET</option>
                <option>JEE Main</option>
                <option>CUET</option>
                <option>LET</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Your Rank</label>
              <input
                type="number"
                value={formData.rank}
                onChange={(e) => setFormData({...formData, rank: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                placeholder="Enter your rank"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
              >
                <option>General</option>
                <option>OBC</option>
                <option>SC</option>
                <option>ST</option>
                <option>EWS</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Branch</label>
              <select
                value={formData.branch}
                onChange={(e) => setFormData({...formData, branch: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
              >
                <option>Computer Science</option>
                <option>Electronics</option>
                <option>Mechanical</option>
                <option>Civil</option>
                <option>Electrical</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location Preference</label>
              <select
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
              >
                <option>Kerala</option>
                <option>Karnataka</option>
                <option>Tamil Nadu</option>
                <option>Any</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Budget</label>
              <select
                value={formData.budget}
                onChange={(e) => setFormData({...formData, budget: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
              >
                <option>Below 1 Lakh</option>
                <option>1-2 Lakhs</option>
                <option>2-5 Lakhs</option>
                <option>Above 5 Lakhs</option>
              </select>
            </div>
          </div>

          <button
            onClick={handlePredict}
            className="w-full px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:shadow-2xl transition-all flex items-center justify-center gap-2"
          >
            <Brain className="w-6 h-6" />
            Predict My Chances with AI
          </button>
        </div>

        {showResults && (
          <>
            {/* Summary Stats */}
            <div className="grid grid-cols-4 gap-4 mb-8">
              <div className="bg-gradient-to-br from-green-500 to-teal-600 text-white rounded-xl p-6 shadow-lg">
                <div className="text-3xl font-bold mb-1">2</div>
                <div className="text-green-100 text-sm">High Probability</div>
              </div>
              <div className="bg-gradient-to-br from-yellow-500 to-orange-600 text-white rounded-xl p-6 shadow-lg">
                <div className="text-3xl font-bold mb-1">1</div>
                <div className="text-yellow-100 text-sm">Medium Probability</div>
              </div>
              <div className="bg-gradient-to-br from-red-500 to-pink-600 text-white rounded-xl p-6 shadow-lg">
                <div className="text-3xl font-bold mb-1">1</div>
                <div className="text-red-100 text-sm">Low Probability</div>
              </div>
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-xl p-6 shadow-lg">
                <div className="text-3xl font-bold mb-1">76%</div>
                <div className="text-indigo-100 text-sm">Avg Success Rate</div>
              </div>
            </div>

            {/* Predictions */}
            <div className="space-y-6">
              {predictions.map((pred) => (
                <div
                  key={pred.id}
                  className={`bg-white rounded-2xl shadow-xl overflow-hidden border-2 ${getChanceBg(pred.probability)} hover:shadow-2xl transition-all`}
                >
                  {/* Main Card */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-gray-800">{pred.college}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            pred.type === 'Government' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                          }`}>
                            {pred.type}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                          <GraduationCap className="w-4 h-4" />
                          <span>{pred.course}</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {pred.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            {pred.fees}/year
                          </div>
                        </div>
                      </div>

                      <div className="text-center">
                        <div className={`flex items-center justify-center gap-2 mb-2 ${getChanceColor(pred.probability)}`}>
                          {getChanceIcon(pred.probability)}
                        </div>
                        <div className={`text-4xl font-bold ${getChanceColor(pred.probability)}`}>
                          {pred.probability}%
                        </div>
                        <div className={`text-sm font-medium ${getChanceColor(pred.probability)} mt-1`}>
                          {getChanceText(pred.probability)}
                        </div>
                      </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-5 gap-4 py-4 border-t border-b border-gray-200 my-4">
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Last Cutoff</div>
                        <div className="font-bold text-gray-800">{pred.lastYearCutoff.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Predicted</div>
                        <div className="font-bold text-indigo-600">{pred.currentYearPrediction.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Trend</div>
                        <div className={`font-bold flex items-center gap-1 ${pred.trend === 'up' ? 'text-red-600' : 'text-green-600'}`}>
                          {getTrendIcon(pred.trend)}
                          {pred.trendPercent}%
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Placement</div>
                        <div className="font-bold text-green-600">{pred.placement}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Avg Package</div>
                        <div className="font-bold text-purple-600">{pred.avgPackage}</div>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="flex gap-3">
                      <button
                        onClick={() => setSelectedCollege(selectedCollege === pred.id ? null : pred.id)}
                        className="flex-1 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
                      >
                        {selectedCollege === pred.id ? 'Hide Details' : 'View AI Analysis'}
                      </button>
                      <button className="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all">
                        Add to Wishlist
                      </button>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {selectedCollege === pred.id && (
                    <div className="border-t-2 border-gray-200 p-6 bg-gray-50">
                      <div className="grid md:grid-cols-2 gap-8">
                        {/* AI Factors */}
                        <div>
                          <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <Brain className="w-5 h-5 text-indigo-600" />
                            AI Analysis Factors
                          </h4>
                          <div className="space-y-3">
                            {pred.factors.map((factor, idx) => (
                              <div key={idx} className={`p-4 rounded-lg ${getImpactBg(factor.impact)}`}>
                                <div className="flex items-center justify-between mb-2">
                                  <span className="font-medium text-gray-800">{factor.name}</span>
                                  <span className={`text-sm font-bold ${getImpactColor(factor.impact)}`}>
                                    {factor.impact === 'positive' ? '✓ Positive' : factor.impact === 'negative' ? '✗ Negative' : '− Neutral'}
                                  </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div
                                    className={`h-2 rounded-full ${
                                      factor.impact === 'positive' ? 'bg-green-500' :
                                      factor.impact === 'negative' ? 'bg-red-500' : 'bg-gray-400'
                                    }`}
                                    style={{ width: `${factor.score}%` }}
                                  ></div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Historical Trends */}
                        <div>
                          <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <BarChart3 className="w-5 h-5 text-indigo-600" />
                            Historical Cutoff Trends
                          </h4>
                          <div className="space-y-3">
                            {pred.historicalData.map((data, idx) => (
                              <div key={idx} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                                <div className="flex items-center gap-3">
                                  <Calendar className="w-4 h-4 text-gray-500" />
                                  <span className="font-medium text-gray-700">{data.year}</span>
                                </div>
                                <span className="font-bold text-indigo-600">{data.cutoff.toLocaleString()}</span>
                              </div>
                            ))}
                            <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border-2 border-indigo-200">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <Zap className="w-5 h-5 text-indigo-600" />
                                  <span className="font-bold text-gray-800">Your Rank</span>
                                </div>
                                <span className="text-2xl font-bold text-indigo-600">{formData.rank}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Recommendation */}
                      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-200">
                        <div className="flex items-start gap-3">
                          <Target className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                          <div>
                            <div className="font-bold text-gray-800 mb-1">AI Recommendation</div>
                            <div className="text-sm text-gray-700">
                              {pred.probability >= 75 
                                ? `Strong candidate! Your rank ${formData.rank} is well within the predicted cutoff. Apply with confidence.`
                                : pred.probability >= 50
                                ? `Moderate chance. Consider this as a backup option and apply to safer colleges too.`
                                : `Lower probability. Focus on colleges with higher chances or consider alternative branches.`
                              }
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}