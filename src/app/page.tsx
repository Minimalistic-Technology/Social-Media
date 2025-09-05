"use client"
import React, { useState } from 'react';
import { X, Eye, EyeOff, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface LandingPageProps {
  onLoginSuccess?: (path: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onLoginSuccess }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });

  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp);
    // Reset form when switching modes
    setFormData({
      email: '',
      password: '',
      name: '',
      confirmPassword: ''
    });
  };

const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation for sign up
    if (isSignUp && formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    // Simulate authentication process
    console.log('Form submitted:', formData);
    
    if (isSignUp) {
      // For signup: switch to login mode (keep modal open)
      setIsSignUp(false); // Switch from signup to login mode
      // Optionally clear the form or show success message
      setFormData({
        email: '', password: '', confirmPassword: '',
        name: ''
      });
    } else {
      // For login: navigate to home page
      if (onLoginSuccess) {
        // Close the modal
        setShowLogin(false);
        
        // Call the callback function to change the current page
        onLoginSuccess('/home');
      } else {
        // Fallback: use router to navigate
        router.push('/home');
      }
    }
  };
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-pink-900/20"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.3),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(255,119,198,0.2),transparent_50%)]"></div>

      {/* Header */}
      <header className="relative z-10 flex justify-between items-center px-8 py-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-sm"></div>
          </div>
          <span className="text-xl font-bold">Social Home</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex items-center min-h-[calc(100vh-88px)]">
        <div className="container mx-auto px-8 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
              your gateway to{' '}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                social media success
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-lg">
              Let's boost your online presence! Transform your brand with our cutting-edge social media strategies and tools.
            </p>
            
            <button
              onClick={() => setShowLogin(true)}
              className="group bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-purple-500/25 flex items-center space-x-2"
            >
              <span>Get Started</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Right Content - Image */}
          <div className="relative">
            <div className="relative bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-3xl p-8 backdrop-blur-sm border border-purple-500/20">
              <div className="space-y-6">
                {/* Mock laptop */}
                <div className="bg-gray-800 rounded-lg p-4 shadow-2xl relative overflow-hidden">
                  <div className="bg-gray-900 rounded h-50 flex items-center justify-center relative overflow-hidden">
                    <video 
                      src="sb1.mp4" 
                      className="absolute inset-0 w-full h-full object-cover rounded"
                      autoPlay 
                      loop 
                      muted
                      playsInline
                    />
                    <div className="relative z-10 text-center space-y-2">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg mx-auto"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full animate-bounce"></div>
              <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-green-400 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </main>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-2xl p-8 w-full max-w-md border border-gray-700 relative animate-in fade-in-0 zoom-in-95 duration-300">
            {/* Close button */}
            <button
              onClick={() => setShowLogin(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Modal Header */}
            <div className="text-center mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl mx-auto mb-4 flex items-center justify-center">
                <div className="w-6 h-6 bg-white rounded-sm"></div>
              </div>
              <h2 className="text-2xl font-bold mb-2">
                {isSignUp ? 'Create Account' : 'Welcome Back'}
              </h2>
              <p className="text-gray-400">
                {isSignUp ? 'Start your social media journey' : 'Sign in to your account'}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {isSignUp && (
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all placeholder-gray-400"
                    required={isSignUp}
                  />
                </div>
              )}

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all placeholder-gray-400"
                  required
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-12 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all placeholder-gray-400"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {isSignUp && (
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all placeholder-gray-400"
                    required={isSignUp}
                  />
                </div>
              )}

              {!isSignUp && (
                <div className="flex justify-end">
                  <a href="#" className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
                    Forgot password?
                  </a>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-500/25"
              >
                {isSignUp ? 'Create Account' : 'Sign In'}
              </button>
            </form>

            {/* Auth toggle */}
            <div className="text-center mt-6">
              <p className="text-gray-400">
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                <button
                  onClick={toggleAuthMode}
                  className="text-purple-400 hover:text-purple-300 font-semibold transition-colors"
                >
                  {isSignUp ? 'Sign In' : 'Sign Up'}
                </button>
              </p>
            </div>

            {/* Social login */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gray-900 text-gray-400">Or continue with</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating elements */}
      <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-purple-400 rounded-full animate-ping"></div>
      <div className="absolute bottom-1/3 left-1/4 w-3 h-3 bg-pink-400 rounded-full animate-pulse"></div>
      
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, white 2px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>
    </div>
  );
};

export default LandingPage;