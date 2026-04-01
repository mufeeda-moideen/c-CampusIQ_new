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
    sender: "user",
    timestamp: new Date()
  };

  setMessages(prev => [...prev, userMessage]);
  setInputValue("");
  setIsTyping(true);
  setShowSuggestions(false);

  try {
    const res = await fetch("http://localhost:8080/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMessage.text })
    });

    const data = await res.json();

    // Simulate streaming effect for better UX
    const words = data.reply.split(' ');
    let currentText = '';
    
    setMessages(prev => [
      ...prev,
      {
        id: prev.length + 1,
        text: '',
        sender: "bot",
        timestamp: new Date(),
        source: data.source
      }
    ]);

    for (let i = 0; i < words.length; i++) {
      currentText += words[i] + ' ';
      setMessages(prev => 
        prev.map(msg => 
          msg.id === prev.length 
            ? { ...msg, text: currentText.trim() }
            : msg
        )
      );
      await new Promise(resolve => setTimeout(resolve, 50)); // Fast typing effect
    }

  } catch (err) {
    setMessages(prev => [
      ...prev,
      {
        id: prev.length + 1,
        text: "⚠️ Server not responding. Please try again.",
        sender: "bot",
        timestamp: new Date()
      }
    ]);
  } finally {
    setIsTyping(false);
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
      <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              AI Assistant
            </h1>
          
          </div>
        {/*</div>*/}
      </div>
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