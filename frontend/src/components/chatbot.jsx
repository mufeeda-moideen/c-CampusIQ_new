import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, X, Minimize2, Brain, Sparkles, BookOpen, GraduationCap, TrendingUp, DollarSign, MapPin, Phone, Mail } from 'lucide-react';

// AI Chatbot Logo Component
const ChatbotLogo = ({ size = 'md', animated = false }) => {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20'
  };

  return (
    <div className={`${sizes[size]} relative flex items-center justify-center`}>
      {/* Outer Glow Ring */}
      <div className={`absolute inset-0 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full blur-md opacity-60 ${animated ? 'animate-pulse' : ''}`} />
      
      {/* Main Circle */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 rounded-full shadow-xl" />
      
      {/* Inner Brain/AI Icon */}
      <div className="relative z-10 flex items-center justify-center w-full h-full">
        <Brain className="text-white" size={size === 'sm' ? 16 : size === 'md' ? 24 : size === 'lg' ? 32 : 40} />
      </div>
      
      {/* Sparkle Effect */}
      <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping" />
      <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-300 rounded-full" />
      
      {/* Shine Effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/30 to-white/0 rounded-full" />
    </div>
  );
};

// Suggestion Card Component
const SuggestionCard = ({ icon: Icon, title, description, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="group p-4 bg-white rounded-2xl border-2 border-gray-100 hover:border-indigo-300 hover:shadow-lg transition-all text-left"
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
          <Icon size={20} className="text-indigo-600" />
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 mb-1">{title}</h4>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
    </button>
  );
};

// Main Chatbot Interface
export default function ChatbotInterface() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm your CampusIQ AI Assistant. I can help you with college recommendations, career guidance, admission processes, and more! How can I assist you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const suggestions = [
    {
      icon: GraduationCap,
      title: "Find Colleges",
      description: "Get personalized college recommendations based on your rank and preferences",
      query: "I want to find colleges that match my profile"
    },
    {
      icon: Sparkles,
      title: "Career Guidance",
      description: "Discover the best career paths that align with your interests",
      query: "What career should I pursue based on my interests?"
    },
    {
      icon: BookOpen,
      title: "Admission Help",
      description: "Learn about admission requirements and application processes",
      query: "How do I apply for college admissions?"
    },
    {
      icon: DollarSign,
      title: "Scholarships",
      description: "Explore scholarship opportunities and financial aid options",
      query: "What scholarships are available for me?"
    }
  ];

  const quickReplies = [
    "Tell me about top engineering colleges",
    "What's the admission process?",
    "Compare colleges for me",
    "Career quiz"
  ];

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages([...messages, userMessage]);
    setInputValue('');
    setIsTyping(true);
    setShowSuggestions(false);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = generateBotResponse(inputValue);
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        text: botResponse.text,
        sender: 'bot',
        timestamp: new Date(),
        suggestions: botResponse.suggestions
      }]);
      setIsTyping(false);
    }, 1500);

    // Real API call:
    // const response = await fetch('http://localhost:5000/api/chat', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ message: inputValue, history: messages })
    // });
    // const data = await response.json();
  };

  const generateBotResponse = (message) => {
    const lowerMsg = message.toLowerCase();
    
    if (lowerMsg.includes('college') || lowerMsg.includes('university') || lowerMsg.includes('find')) {
      return {
        text: "Great! I can help you find the perfect college. To give you the best recommendations, I need to know:\n\n• Your entrance exam rank (JEE, NEET, etc.)\n• Preferred location\n• Course/Stream of interest\n• Budget range\n\nYou can also use our smart filters to search through 500+ colleges in our database!",
        suggestions: ["Search colleges now", "Tell me about top colleges", "What documents do I need?"]
      };
    } else if (lowerMsg.includes('career') || lowerMsg.includes('job') || lowerMsg.includes('pursue')) {
      return {
        text: "Excellent question! Career planning is crucial for your future. I recommend:\n\n1. Take our Career Path Quiz - it analyzes your interests, strengths, and goals\n2. Explore career options in: Engineering, Medical, Arts, Commerce, Science\n3. Learn about job prospects and salary ranges\n\nWould you like to start with the Career Quiz?",
        suggestions: ["Start Career Quiz", "Engineering careers", "Medical careers"]
      };
    } else if (lowerMsg.includes('admission') || lowerMsg.includes('apply') || lowerMsg.includes('process')) {
      return {
        text: "The admission process typically involves:\n\n1. **Entrance Exams** - JEE Main/Advanced, NEET, etc.\n2. **Application** - Online forms with documents\n3. **Counseling** - Seat allocation based on rank\n4. **Document Verification** - Original certificates\n5. **Fee Payment** - Secure your seat\n\nEach college may have specific requirements. Which exam are you preparing for?",
        suggestions: ["JEE admission process", "NEET counseling", "Required documents"]
      };
    } else if (lowerMsg.includes('scholarship') || lowerMsg.includes('financial') || lowerMsg.includes('aid')) {
      return {
        text: "There are many scholarship opportunities available!\n\n**Merit-Based:**\n• National Scholarships\n• College-specific scholarships\n• Top ranker awards\n\n**Need-Based:**\n• Government schemes\n• Fee waivers\n• Education loans with subsidies\n\nI can help you find scholarships matching your profile. What's your category and family income range?",
        suggestions: ["Government scholarships", "Private scholarships", "Education loans"]
      };
    } else if (lowerMsg.includes('compare') || lowerMsg.includes('difference') || lowerMsg.includes('vs')) {
      return {
        text: "I can help you compare colleges! I'll analyze:\n\n• **Placement Records** - Average package, top recruiters\n• **Infrastructure** - Labs, library, hostel\n• **Faculty** - Qualifications and experience\n• **Rankings** - NIRF, other rankings\n• **Fee Structure** - Total cost comparison\n\nWhich colleges would you like to compare?",
        suggestions: ["Compare IITs", "Compare NITs", "Private vs Government"]
      };
    } else if (lowerMsg.includes('hello') || lowerMsg.includes('hi') || lowerMsg.includes('hey')) {
      return {
        text: "Hello! 👋 Welcome to CampusIQ! I'm your AI assistant, here to make your college journey easier.\n\nI can help you with:\n✓ Finding the right college\n✓ Career guidance\n✓ Admission procedures\n✓ Scholarship information\n✓ Course comparisons\n\nWhat would you like to explore first?",
        suggestions: ["Find colleges", "Career advice", "Admission help"]
      };
    } else if (lowerMsg.includes('quiz')) {
      return {
        text: "Our Career Path Quiz is a comprehensive assessment that helps you discover your ideal career field!\n\n**What it covers:**\n• Your interests and passions\n• Work environment preferences\n• Motivation factors\n• Subject strengths\n• Career goals\n\n**Takes only 5 minutes** and provides personalized recommendations!\n\nReady to discover your perfect career path?",
        suggestions: ["Start Quiz Now", "Learn more about quiz", "Skip for now"]
      };
    } else {
      return {
        text: `I understand you're asking about "${message}". I'm here to help! \n\nI can provide detailed information about:\n• College selection and recommendations\n• Career paths and opportunities\n• Admission procedures\n• Scholarships and financial aid\n• Course comparisons\n\nCould you be more specific about what you'd like to know?`,
        suggestions: ["Find colleges", "Career guidance", "Admission process"]
      };
    }
  };

  const handleSuggestionClick = (query) => {
    setInputValue(query);
    handleQuickReply(query);
  };

  const handleQuickReply = (reply) => {
    setInputValue('');
    
    const userMessage = {
      id: messages.length + 1,
      text: reply,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages([...messages, userMessage]);
    setIsTyping(true);
    setShowSuggestions(false);

    setTimeout(() => {
      const botResponse = generateBotResponse(reply);
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        text: botResponse.text,
        sender: 'bot',
        timestamp: new Date(),
        suggestions: botResponse.suggestions
      }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Header */}
      {/*<div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <ChatbotLogo size="md" animated={true} />
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  AI Assistant
                </h1>
                <p className="text-sm text-gray-600">Your 24/7 College Guidance Companion</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-green-700">AI Online</span>
            </div>
          </div>
        </div>
      </div>*/}

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Chat Area */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-xl border-2 border-gray-100 overflow-hidden flex flex-col h-[calc(100vh-120px)]">
              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((message) => (
                  <div key={message.id}>
                    <div className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`flex gap-3 max-w-[85%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                        {message.sender === 'bot' && (
                          <div className="flex-shrink-0">
                            <ChatbotLogo size="sm" />
                          </div>
                        )}
                        <div className={`rounded-2xl px-5 py-3 ${
                          message.sender === 'user'
                            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          <p className="text-sm leading-relaxed whitespace-pre-line">{message.text}</p>
                          <p className={`text-xs mt-2 ${
                            message.sender === 'user' ? 'text-indigo-100' : 'text-gray-500'
                          }`}>
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Bot Suggestions */}
                    {message.sender === 'bot' && message.suggestions && (
                      <div className="flex flex-wrap gap-2 mt-3 ml-14">
                        {message.suggestions.map((suggestion, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleQuickReply(suggestion)}
                            className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium hover:bg-indigo-100 transition-colors border border-indigo-200"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex gap-3">
                      <ChatbotLogo size="sm" />
                      <div className="bg-gray-100 rounded-2xl px-5 py-3">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Replies */}
              {messages.length <= 2 && (
                <div className="px-6 py-3 bg-gray-50 border-t">
                  <p className="text-xs font-semibold text-gray-700 mb-2">Quick Questions:</p>
                  <div className="flex flex-wrap gap-2">
                    {quickReplies.map((reply, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleQuickReply(reply)}
                        className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
                      >
                        {reply}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input Area */}
              <div className="p-4 bg-white border-t">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Ask me anything about colleges, careers, admissions..."
                    className="flex-1 px-5 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent text-sm"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim()}
                    className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <Send size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Suggestions & Info */}
          <div className="space-y-6">
            {/* Suggestions */}
            {showSuggestions && (
              <div className="bg-white rounded-3xl shadow-xl border-2 border-gray-100 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Sparkles size={20} className="text-indigo-600" />
                  Popular Topics
                </h3>
                <div className="space-y-3">
                  {suggestions.map((suggestion, idx) => (
                    <SuggestionCard
                      key={idx}
                      icon={suggestion.icon}
                      title={suggestion.title}
                      description={suggestion.description}
                      onClick={() => handleSuggestionClick(suggestion.query)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Stats Card */}
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl shadow-xl p-6 text-white">
              <h3 className="text-lg font-bold mb-4">Why Choose CampusIQ?</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <GraduationCap size={20} />
                  </div>
                  <div>
                    <p className="font-semibold">500+ Colleges</p>
                    <p className="text-sm text-indigo-100">Comprehensive database</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <Brain size={20} />
                  </div>
                  <div>
                    <p className="font-semibold">AI-Powered</p>
                    <p className="text-sm text-indigo-100">Smart recommendations</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <TrendingUp size={20} />
                  </div>
                  <div>
                    <p className="font-semibold">Real-Time Data</p>
                    <p className="text-sm text-indigo-100">Updated rankings & cutoffs</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-3xl shadow-xl border-2 border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Need Human Help?</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3 text-gray-600">
                  <Phone size={18} className="text-indigo-600" />
                  <span>+91 1800-XXX-XXXX</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Mail size={18} className="text-indigo-600" />
                  <span>support@campusiq.com</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <MapPin size={18} className="text-indigo-600" />
                  <span>Available 24/7</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}