import React, { useState, useEffect } from 'react';
import { Check, ArrowRight, ArrowLeft, Trophy, Target, Sparkles, Brain, BookOpen } from 'lucide-react';

// Quiz Questions Component
const QuizQuestion = ({ question, onSelect, selectedOption }) => {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full">
          <Brain size={18} className="text-indigo-600" />
          <span className="text-sm font-medium text-indigo-700">Question {question.id}</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{question.question}</h2>
      </div>

      <div className="grid gap-4 mt-8">
        {question.options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => onSelect(option.category)}
            className={`group relative p-6 rounded-2xl border-2 transition-all duration-300 text-left ${
              selectedOption === option.category
                ? 'border-indigo-600 bg-indigo-50 shadow-lg scale-[1.02]'
                : 'border-gray-200 bg-white hover:border-indigo-300 hover:shadow-md hover:scale-[1.01]'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                selectedOption === option.category
                  ? 'border-indigo-600 bg-indigo-600'
                  : 'border-gray-300 group-hover:border-indigo-400'
              }`}>
                {selectedOption === option.category && <Check size={18} className="text-white" />}
              </div>
              <div className="flex-1">
                <p className="text-lg font-medium text-gray-900">{option.text}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

// Progress Bar Component
const ProgressBar = ({ current, total }) => {
  const progress = ((current + 1) / total) * 100;
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-sm">
        <span className="font-medium text-gray-700">Progress</span>
        <span className="font-semibold text-indigo-600">{current + 1} of {total}</span>
      </div>
      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-500 ease-out rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

// Result Card Component
const ResultCard = ({ result, onRestart }) => {
  const categoryIcons = {
    'Engineering': Target,
    'Medical': BookOpen,
    'Arts': Sparkles,
    'Commerce': Trophy
  };

  const Icon = categoryIcons[result.recommendedField] || Target;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center space-y-6 mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl shadow-lg">
          <Trophy size={40} className="text-white" />
        </div>
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Quiz Complete! 🎉
          </h2>
          <p className="text-lg text-gray-600">Here's your personalized career recommendation</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-xl border-2 border-gray-100 p-8 space-y-6">
        <div className="flex items-center gap-4 pb-6 border-b">
          <div className="flex-shrink-0 w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center">
            <Icon size={32} className="text-indigo-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">Recommended Field</p>
            <h3 className="text-2xl font-bold text-gray-900">{result.recommendedField}</h3>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-900">Your Strengths:</h4>
          <div className="grid gap-3">
            {result.strengths?.map((strength, idx) => (
              <div key={idx} className="flex items-start gap-3 p-4 bg-green-50 rounded-xl">
                <Check size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">{strength}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-900">Suggested Career Paths:</h4>
          <div className="grid gap-3">
            {result.careers?.map((career, idx) => (
              <div key={idx} className="flex items-center gap-3 p-4 bg-indigo-50 rounded-xl">
                <div className="w-2 h-2 bg-indigo-600 rounded-full" />
                <span className="font-medium text-gray-800">{career}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6">
          <p className="text-gray-700 leading-relaxed">
            {result.description || "Based on your responses, we've identified the best career path that aligns with your interests and strengths."}
          </p>
        </div>

        <div className="flex gap-4 pt-4">
          <button
            onClick={onRestart}
            className="flex-1 px-6 py-3 bg-white border-2 border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-all"
          >
            Retake Quiz
          </button>
          <button
            className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            Explore Colleges
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Quiz App
export default function QuizApp() {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  //quiz questions fetch
 useEffect(() => {
  const fetchQuestions = async () => {
    try {
      const res = await fetch("http://localhost:8080/quiz/questions");

      if (!res.ok) {
        throw new Error("Failed to fetch questions");
      }

      const data = await res.json();
      setQuestions(data);
    } catch (error) {
      console.error("API ERROR:", error);
      alert("Backend not connected. Check server.");
    } finally {
      setLoading(false);
    }
  };

  fetchQuestions();
}, []);


  const handleSelect = (category) => {
    setSelectedOption(category);
  };

  const handleNext = () => {
    if (!selectedOption) return;

    setAnswers([...answers, { questionId: current + 1, category: selectedOption }]);
    
    if (current + 1 === questions.length) {
      // Submit to backend
      submitQuiz([...answers, { questionId: current + 1, category: selectedOption }]);
    } else {
      setCurrent(current + 1);
      setSelectedOption(null);
    }
  };

  const handleBack = () => {
    if (current > 0) {
      setCurrent(current - 1);
      setAnswers(answers.slice(0, -1));
      setSelectedOption(null);
    }
  };

  // Submit quiz answers to backend
  const submitQuiz = async (finalAnswers) => {
  try {
    setLoading(true);

    const res = await fetch("http://localhost:8080/quiz/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: 1,
        answers: finalAnswers
      })
    });

    if (!res.ok) {
      throw new Error("Quiz submission failed");
    }

    const data = await res.json();   // ✅ Now it's inside async
    setResult(data);
  } catch (error) {
    console.error("Submit Error:", error);
    alert("Quiz submit failed. Check backend.");
  } finally {
    setLoading(false);
  }
};


  /*const data = await res.json();
  setResult(data);
  setLoading(false);
};*/

  const handleRestart = () => {
    setCurrent(0);
    setAnswers([]);
    setSelectedOption(null);
    setResult(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-lg font-medium text-gray-700">Loading your quiz...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">
            Career Path Quiz
          </h1>
          <p className="text-gray-600 text-lg">
            Discover the perfect career field based on your interests
          </p>
        </div>

        {/* Quiz Container */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          {!result ? (
            <>
              <ProgressBar current={current} total={questions.length} />
              
              <div className="mt-10">
                <QuizQuestion
                  question={questions[current]}
                  onSelect={handleSelect}
                  selectedOption={selectedOption}
                />
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-4 mt-10">
                <button
                  onClick={handleBack}
                  disabled={current === 0}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <ArrowLeft size={20} />
                  Back
                </button>
                
                <button
                  onClick={handleNext}
                  disabled={!selectedOption}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {current + 1 === questions.length ? 'Complete Quiz' : 'Next'}
                  <ArrowRight size={20} />
                </button>
              </div>
            </>
          ) : (
            <ResultCard result={result} onRestart={handleRestart} />
          )}
        </div>
      </div>
    </div>
  );
}
