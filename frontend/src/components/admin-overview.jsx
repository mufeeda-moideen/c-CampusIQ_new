import React, { useState } from 'react';
import { Building2, Users, TrendingUp, Calendar, AlertCircle, Target, Eye, Zap, Award, Clock, CheckCircle, XCircle, ArrowUp, ArrowDown, Activity, Globe, Download, Filter, RefreshCw, BarChart3, PieChart, LineChart, DollarSign, UserPlus, BookOpen, MessageSquare, Bell } from 'lucide-react';

export default function AdminOverview() {
  const [timeRange, setTimeRange] = useState('7days');

  // Real-time Stats
  const stats = {
    totalColleges: 156,
    activeColleges: 142,
    totalUsers: 15420,
    activeUsers: 8934,
    totalPredictions: 45280,
    todayPredictions: 342,
    liveSessions: 12,
    completedSessions: 892,
    revenue: 2840000,
    avgResponseTime: 1.2
  };

  const growth = {
    users: 12.5,
    predictions: 23.8,
    sessions: 8.3,
    revenue: 15.6
  };

  // System Health Metrics
  const systemHealth = [
    { metric: 'Server Uptime', value: '99.8%', status: 'excellent', icon: Activity },
    { metric: 'API Response', value: '1.2s', status: 'good', icon: Zap },
    { metric: 'Database Load', value: '64%', status: 'good', icon: BarChart3 },
    { metric: 'Active Sessions', value: '234', status: 'normal', icon: Users }
  ];

  // Quick Alerts
  const alerts = [
    { 
      id: 1, 
      type: 'critical', 
      title: 'High Server Load',
      message: 'Server capacity at 89% - consider scaling',
      time: '5 mins ago',
      action: 'View Details'
    },
    { 
      id: 2, 
      type: 'warning', 
      title: 'Upcoming Session',
      message: 'Engineering Career Session starts in 30 mins',
      time: '10 mins ago',
      action: 'Manage'
    },
    { 
      id: 3, 
      type: 'success', 
      title: 'Backup Completed',
      message: 'Database backup completed successfully',
      time: '2 hours ago',
      action: 'View Logs'
    },
    { 
      id: 4, 
      type: 'info', 
      title: 'New Counselor Added',
      message: 'Dr. Maya Sharma joined as career counselor',
      time: '4 hours ago',
      action: 'View Profile'
    }
  ];

  // Recent Activity
  const recentActivities = [
    { user: 'Admin', action: 'updated college data', exam: null, colleges: 5, time: '15 mins ago' },
    { user: 'Divya Nair', action: 'downloaded report', exam: 'NEET', colleges: 15, time: '22 mins ago' },
    { user: 'Karthik Menon', action: 'saved wishlist', exam: 'KEAM', colleges: 8, time: '35 mins ago' }
  ];

  // Top Performing Colleges
  const topColleges = [
    { name: 'Govt Engineering College, Thrissur', students: 450, predictions: 2340, growth: 15.2 },
    { name: 'College of Engineering Trivandrum', students: 520, predictions: 3120, growth: 22.8 },
    { name: 'Model Engineering College', students: 280, predictions: 1840, growth: 8.4 },
    { name: 'NSS College of Engineering', students: 380, predictions: 2180, growth: 12.1 },
    { name: 'TKM College of Engineering', students: 310, predictions: 1650, growth: 6.7 }
  ];

  // Popular Exams
  const examStats = [
    { exam: 'KEAM', users: 6820, percentage: 44.2, color: 'from-blue-500 to-cyan-600' },
    { exam: 'JEE Main', users: 4230, percentage: 27.4, color: 'from-purple-500 to-pink-600' },
    { exam: 'NEET', users: 2890, percentage: 18.7, color: 'from-green-500 to-teal-600' },
    { exam: 'CUET', users: 1480, percentage: 9.6, color: 'from-orange-500 to-red-600' }
  ];

  // User Activity Timeline
  const userTimeline = [
    { hour: '00:00', users: 45 },
    { hour: '04:00', users: 23 },
    { hour: '08:00', users: 156 },
    { hour: '12:00', users: 234 },
    { hour: '16:00', users: 312 },
    { hour: '20:00', users: 189 },
    { hour: '24:00', users: 78 }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'excellent': return 'text-green-600 bg-green-50 border-green-200';
      case 'good': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'warning': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getAlertStyle = (type) => {
    switch(type) {
      case 'critical': return 'bg-red-50 border-red-200';
      case 'warning': return 'bg-yellow-50 border-yellow-200';
      case 'success': return 'bg-green-50 border-green-200';
      default: return 'bg-blue-50 border-blue-200';
    }
  };

  const getAlertIcon = (type) => {
    switch(type) {
      case 'critical': return <XCircle className="w-5 h-5 text-red-600" />;
      case 'warning': return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      case 'success': return <CheckCircle className="w-5 h-5 text-green-600" />;
      default: return <Bell className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Header 
      <div className="bg-white/80 backdrop-blur-lg border-b border-indigo-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Dashboard Overview
              </h1>
              <p className="text-gray-600 text-sm mt-1">Welcome back, Admin • Last login: 2 hours ago</p>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              >
                <option value="24hours">Last 24 Hours</option>
                <option value="7days">Last 7 Days</option>
                <option value="30days">Last 30 Days</option>
                <option value="90days">Last 90 Days</option>
              </select>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-all">
                <RefreshCw className="w-5 h-5 text-gray-600" />
              </button>
              <button className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg font-medium hover:bg-indigo-100 flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>
        </div>
      </div>*/}

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Users */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-indigo-100 hover:shadow-2xl transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl">
                <Users className="w-6 h-6 text-indigo-600" />
              </div>
              <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ${
                growth.users >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                <ArrowUp className="w-3 h-3" />
                {growth.users}%
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-800 mb-1">{stats.totalUsers.toLocaleString()}</div>
            <div className="text-sm text-gray-600 mb-3">Total Users</div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Active: {stats.activeUsers.toLocaleString()}</span>
              <span className="text-green-600 font-medium">{((stats.activeUsers/stats.totalUsers)*100).toFixed(1)}%</span>
            </div>
          </div>

          {/* Total Colleges */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-indigo-100 hover:shadow-2xl transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl">
                <Building2 className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700">
                {stats.activeColleges} Active
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-800 mb-1">{stats.totalColleges}</div>
            <div className="text-sm text-gray-600 mb-3">Total Colleges</div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-cyan-600 h-2 rounded-full" 
                style={{ width: `${(stats.activeColleges/stats.totalColleges)*100}%` }}
              ></div>
            </div>
          </div>

          {/* AI Predictions */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-indigo-100 hover:shadow-2xl transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl">
                <Target className="w-6 h-6 text-purple-600" />
              </div>
              <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ${
                growth.predictions >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                <ArrowUp className="w-3 h-3" />
                {growth.predictions}%
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-800 mb-1">{stats.totalPredictions.toLocaleString()}</div>
            <div className="text-sm text-gray-600 mb-3">AI Predictions</div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Today: {stats.todayPredictions}</span>
              <span className="text-purple-600 font-medium">Live tracking</span>
            </div>
          </div>

          {/* Live Sessions */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-indigo-100 hover:shadow-2xl transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-green-100 to-teal-100 rounded-xl">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                {stats.liveSessions} Live
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-800 mb-1">{stats.completedSessions}</div>
            <div className="text-sm text-gray-600 mb-3">Total Sessions</div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">This week</span>
              <span className="text-green-600 font-medium">+{growth.sessions}%</span>
            </div>
          </div>
        </div>

        {/* System Health & Alerts Row */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* System Health */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-6 border-2 border-indigo-100">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-gray-800 text-lg">System Health</h3>
              </div>
              <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                All Systems Operational
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {systemHealth.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className={`p-4 rounded-xl border-2 ${getStatusColor(item.status)}`}>
                    <div className="flex items-center justify-between mb-2">
                      <Icon className="w-5 h-5" />
                      <span className="text-2xl font-bold">{item.value}</span>
                    </div>
                    <div className="text-sm font-medium">{item.metric}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-indigo-100">
            <div className="flex items-center gap-2 mb-6">
              <Zap className="w-5 h-5 text-indigo-600" />
              <h3 className="font-bold text-gray-800 text-lg">Quick Actions</h3>
            </div>
            <div className="space-y-3">
              <button className="w-full px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                Add New College
              </button>
              <button className="w-full px-4 py-3 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-xl font-medium hover:shadow-lg transition-all flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Schedule Session
              </button>
              <button className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-xl font-medium hover:shadow-lg transition-all flex items-center gap-2">
                <UserPlus className="w-4 h-4" />
                Add Counselor
              </button>
              <button className="w-full px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl font-medium hover:shadow-lg transition-all flex items-center gap-2">
                <Download className="w-4 h-4" />
                Generate Report
              </button>
            </div>
          </div>
        </div>

        {/* Alerts Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border-2 border-indigo-100">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-indigo-600" />
              <h3 className="font-bold text-gray-800 text-lg">System Alerts</h3>
            </div>
            <button className="text-indigo-600 text-sm font-medium hover:underline">
              View All
            </button>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {alerts.map((alert) => (
              <div key={alert.id} className={`p-4 rounded-xl border-2 ${getAlertStyle(alert.type)}`}>
                <div className="flex items-start gap-3">
                  {getAlertIcon(alert.type)}
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-gray-800 mb-1">{alert.title}</div>
                    <div className="text-sm text-gray-600 mb-2">{alert.message}</div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{alert.time}</span>
                      <button className="text-xs font-medium text-indigo-600 hover:underline">
                        {alert.action}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Popular Exams */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-indigo-100">
            <div className="flex items-center gap-2 mb-6">
              <BookOpen className="w-5 h-5 text-indigo-600" />
              <h3 className="font-bold text-gray-800 text-lg">Popular Exams</h3>
            </div>
            <div className="space-y-4">
              {examStats.map((exam, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-800">{exam.exam}</span>
                    <span className="text-sm font-bold text-gray-600">{exam.users.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`bg-gradient-to-r ${exam.color} h-3 rounded-full transition-all`}
                      style={{ width: `${exam.percentage}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{exam.percentage}% of users</div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Colleges */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-6 border-2 border-indigo-100">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-gray-800 text-lg">Top Performing Colleges</h3>
              </div>
              <button className="text-indigo-600 text-sm font-medium hover:underline">
                View All
              </button>
            </div>
            <div className="space-y-3">
              {topColleges.map((college, idx) => (
                <div key={idx} className="p-4 bg-gradient-to-r from-gray-50 to-indigo-50 rounded-xl border border-gray-200 hover:shadow-md transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="font-bold text-gray-800 mb-1">{college.name}</div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>{college.students} students</span>
                        <span>•</span>
                        <span>{college.predictions.toLocaleString()} predictions</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-green-600 font-bold">
                        <ArrowUp className="w-4 h-4" />
                        {college.growth}%
                      </div>
                      <div className="text-xs text-gray-500">growth</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-indigo-100">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-indigo-600" />
              <h3 className="font-bold text-gray-800 text-lg">Recent Activity</h3>
            </div>
            <button className="text-indigo-600 text-sm font-medium hover:underline">
              View All Activity
            </button>
          </div>
          <div className="space-y-3">
            {recentActivities.map((activity, idx) => (
              <div key={idx} className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-xl transition-all">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-indigo-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm">
                    <span className="font-bold text-gray-800">{activity.user}</span>
                    <span className="text-gray-600"> {activity.action}</span>
                    {activity.exam && <span className="text-indigo-600 font-medium"> ({activity.exam})</span>}
                  </div>
                  {activity.colleges > 0 && (
                    <div className="text-xs text-gray-500 mt-1">{activity.colleges} colleges matched</div>
                  )}
                </div>
                <div className="text-xs text-gray-500 flex-shrink-0">{activity.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}