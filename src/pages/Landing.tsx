
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { TrendingUp } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleGetStarted = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/auth");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <header className="px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-800">Stock Predictor</span>
          </div>

          {/* Sign Up Button */}
          <Button
            onClick={handleGetStarted}
            className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-full"
          >
            {user ? "Dashboard" : "Sign Up"}
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Smarter Investments Start with Smart Predictions
                </h1>
              </div>

              <Button
                onClick={handleGetStarted}
                className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-full text-lg"
              >
                Start Predicting
              </Button>
            </div>

            {/* Right Content - New Illustration */}
            <div className="relative">
              <img
                src="/lovable-uploads/83d26144-bdbd-43c6-aae4-3e9af09100b4.png"
                alt="Stock Market Analytics Illustration"
                className="w-full h-auto max-w-lg mx-auto"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Landing;
