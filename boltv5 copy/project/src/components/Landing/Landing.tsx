import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { LogIn, Brain, Sparkles, Shield } from 'lucide-react';

const Landing: React.FC = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-indigo-175 text-black">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold">
          AmICooked
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-indigo-300">
            .chat
            </span>
            </span>

          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-6xl font-bold mb-8 leading-tight">
            Real-time
            <span
              className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-indigo-300 animate-fadeIn"
              style={{ animationDelay: '0.3s', animationFillMode: 'both' }}
            >
          {" "}Mental Clarity
          </span>
          </h1>

          <p className="text-xl mb-12 leading-relaxed text-center text-black">
          The AI companion for overwhelmed minds.
          <br />
          Catch distractions, stay focused, and build better habits.
            </p>
          
          <button 
            onClick={() => loginWithRedirect()}
            className="bg-white text-purple-900 px-8 py-4 rounded-full font-semibold 
                     hover:bg-purple-100 transition-all transform hover:scale-110 
                     shadow-lg hover:shadow-xl flex items-center justify-center 
                     mx-auto gap-2 group"
          >
            <LogIn size={20} className="group-hover:rotate-12 transition-transform" />
            How Cooked Am I?
          </button>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 hover:bg-white/10 hover:scale-105 
                     shadow-lg hover:shadow-xl transition-all">
            <div className="bg-purple-500/30 rounded-full w-12 h-12 flex items-center justify-center mb-6">
              <Brain className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-4">AI-Powered Insights</h3>
            <p className="text-purple-950">
              Advanced algorithms analyze your work patterns to provide personalized recommendations.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 hover:bg-white/10 hover:scale-105 
                     shadow-lg hover:shadow-xl transition-all">
            <div className="bg-purple-500/30 rounded-full w-12 h-12 flex items-center justify-center mb-6">
              <Sparkles className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Focus Tracking</h3>
            <p className="text-purple-950">
              Monitor your productivity patterns and identify peak performance hours.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 hover:bg-white/10 hover:scale-105 
                     shadow-lg hover:shadow-xl transition-all">
            <div className="bg-purple-500/30 rounded-full w-12 h-12 flex items-center justify-center mb-6">
              <Shield className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Privacy First</h3>
            <p className="text-purple-950">
              Your data is encrypted and secured with enterprise-grade protection.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-8 mt-20">
        <div className="text-center text-purple-300 text-sm">
          Built for HackDavis 2025 ❤️
        </div>
      </footer>
    </div>
  );
};

export default Landing;
