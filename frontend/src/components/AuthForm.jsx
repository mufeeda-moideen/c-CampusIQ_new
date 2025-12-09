import React, { useState } from 'react';
import { BookOpen, Mail, Lock, User, ArrowRight } from 'lucide-react';

export default function AuthForm({ form = {}, setForm = () => {}, handleLogin = () => {}, handleSignup = () => {}, loading = false }) {
  const [isSignup, setIsSignup] = useState(false);

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/demo3.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black/40"></div>


      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-300/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="w-full max-w-md relative">
        {/* Glassmorphism Card */}
        <div className="backdrop-blur-2xl bg-[#0f172a]/40 p-10 rounded-3xl shadow-2xl border border-white/30 transform hover:scale-[1.01] transition-transform duration-300">

          {/* Logo & Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl mb-4 shadow-lg">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              CampusIQ
            </h1>
            <p className="text-gray-600 font-medium">
              {isSignup ? 'Create your account' : 'Welcome back!'}
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex gap-2 mb-8 p-1 bg-gray-100 rounded-xl">
            <button
              onClick={() => setIsSignup(false)}
              className={`flex-1 py-2.5 rounded-lg font-semibold transition-all duration-300 ${
                !isSignup
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsSignup(true)}
              className={`flex-1 py-2.5 rounded-lg font-semibold transition-all duration-300 ${
                isSignup
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            {/* Name Field - Only for Signup */}
            {isSignup && (
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-indigo-600 transition-colors" />
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={form.fullname || ''}
                    onChange={(e) => setForm({ ...form, fullname: e.target.value })}
                    className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white hover:border-indigo-300 placeholder:text-gray-400"
                  />
                </div>
              </div>
            )}

            {/* Email Field */}
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-indigo-600 transition-colors" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={form.email || ''}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white hover:border-indigo-300 placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-indigo-600 transition-colors" />
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={form.password || ''}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white hover:border-indigo-300 placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Forgot Password - Only for Login */}
            {!isSignup && (
              <div className="text-right">
                <a href="#" className="text-sm text-indigo-600 hover:text-indigo-700 font-semibold">
                  Forgot password?
                </a>
              </div>
            )}
            <select
            value={form.role || "user"}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl"
            >
            <option value="user">User</option>
            <option value="admin">Admin</option>
            </select>


            {/* Submit Button */}
            <button
              onClick={isSignup ? handleSignup : handleLogin}
              disabled={loading}
              className="w-full py-4 mt-6 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-lg hover:from-indigo-700 hover:to-purple-700 active:scale-[0.98] transition-all duration-300 shadow-xl shadow-indigo-500/30 hover:shadow-2xl hover:shadow-indigo-500/40 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    {isSignup ? 'Create Account' : 'Sign In'}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>

          {/* Terms & Privacy - Only for Signup */}
          {isSignup && (
            <p className="text-center text-xs text-gray-500 mt-6">
              By signing up, you agree to our{' '}
              <a href="#" className="text-indigo-600 hover:underline">Terms</a>
              {' '}and{' '}
              <a href="#" className="text-indigo-600 hover:underline">Privacy Policy</a>
            </p>
          )}
        </div>

        {/* Trust Indicators */}
        <div className="mt-8 flex items-center justify-center gap-8 text-sm text-white/80">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Secure</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Privacy Protected</span>
          </div>
        </div>
      </div>
    </div>
  );
}