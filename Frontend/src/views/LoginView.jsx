import React, { useState } from 'react';
import { 
  GraduationCap, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Sparkles, 
  Ticket, 
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export default function LoginView({ onLoginSuccess, showToast }) {
  const [email, setEmail] = useState('aniket.sharma@campus.edu');
  const [password, setPassword] = useState('••••••••••••');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [fullName, setFullName] = useState('Aniket Sharma');
  const [collegeId, setCollegeId] = useState('STU-2026-7829');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      if (showToast) showToast('Error', 'Please enter your campus email address.', 'error');
      return;
    }
    if (showToast) {
      showToast('Welcome back!', 'Successfully signed in as Aniket Sharma.', 'success');
    }
    onLoginSuccess();
  };

  const handleSocialLogin = (provider) => {
    if (showToast) {
      showToast(`${provider} Login`, `Authenticating via your college ${provider} SSO...`, 'info');
    }
    setTimeout(() => {
      onLoginSuccess();
    }, 600);
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    if (showToast) {
      showToast('Password Reset', 'Password recovery link sent to your registered campus email.', 'info');
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 flex items-stretch">
      
      {/* LEFT COLUMN: Clean Vector Graphic & Hero Message */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-950 p-12 text-white flex-col justify-between overflow-hidden">
        
        {/* Ambient glow backgrounds */}
        <div className="absolute top-0 -left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 -right-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl pointer-events-none"></div>

        {/* Top Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-indigo-600/90 border border-indigo-400/30 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-tight">Campus</span>
            <span className="text-xl font-extrabold text-indigo-400 tracking-tight">Connect</span>
          </div>
        </div>

        {/* Vector Graphic Placeholder Illustration */}
        <div className="relative z-10 my-auto py-8">
          <div className="w-full max-w-lg mx-auto bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 shadow-2xl relative">
            
            {/* Vector Illustration Graphic SVG */}
            <div className="w-full h-56 flex items-center justify-center relative">
              <svg viewBox="0 0 500 260" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Background Shapes */}
                <rect x="40" y="20" width="420" height="220" rx="16" fill="url(#grad1)" fillOpacity="0.4" />
                <circle cx="100" cy="80" r="45" fill="#6366f1" fillOpacity="0.3" />
                <circle cx="410" cy="180" r="55" fill="#818cf8" fillOpacity="0.25" />
                
                {/* Campus Quad Building silhouette */}
                <path d="M120 190V110L160 80L200 110V190H120Z" fill="#312e81" stroke="#818cf8" strokeWidth="2" />
                <rect x="145" y="140" width="30" height="50" rx="4" fill="#a5b4fc" />
                <circle cx="160" cy="115" r="8" fill="#e0e7ff" />
                
                {/* Modern Campus Arch */}
                <path d="M220 190V130C220 100 280 100 280 130V190H220Z" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
                
                {/* Festival Stage with Spotlights */}
                <path d="M300 190V90L370 70V190H300Z" fill="#312e81" stroke="#c084fc" strokeWidth="2" />
                <line x1="335" y1="70" x2="260" y2="190" stroke="#f472b6" strokeWidth="2" strokeDasharray="4 4" opacity="0.6" />
                <line x1="335" y1="70" x2="410" y2="190" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 4" opacity="0.6" />
                
                {/* Floating Event Badges */}
                <g transform="translate(60, 50)">
                  <rect width="110" height="34" rx="8" fill="#4f46e5" />
                  <text x="14" y="22" fill="#ffffff" fontSize="12" fontWeight="bold" fontFamily="sans-serif">🎵 Band Night</text>
                </g>

                <g transform="translate(320, 110)">
                  <rect width="125" height="34" rx="8" fill="#059669" />
                  <text x="14" y="22" fill="#ffffff" fontSize="12" fontWeight="bold" fontFamily="sans-serif">🚀 Hackathon 24h</text>
                </g>

                <g transform="translate(200, 30)">
                  <rect width="120" height="34" rx="8" fill="#d97706" />
                  <text x="14" y="22" fill="#ffffff" fontSize="12" fontWeight="bold" fontFamily="sans-serif">🏏 Cricket Trials</text>
                </g>

                {/* Definitions */}
                <defs>
                  <linearGradient id="grad1" x1="0" y1="0" x2="500" y2="260" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#4f46e5" stopOpacity="0.3" />
                    <stop offset="1" stopColor="#1e1b4b" stopOpacity="0.8" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Slogan Text specified in prompt */}
            <div className="mt-6 text-center">
              <p className="text-xl font-bold tracking-tight text-white leading-snug">
                "Your Campus, One Connect. Discover events, meet people, and make the most of your college life."
              </p>
              <div className="mt-4 flex items-center justify-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-xs text-indigo-200 font-medium">Over 2,400 students active today</span>
              </div>
            </div>

          </div>
        </div>

        {/* Feature Pills */}
        <div className="relative z-10 grid grid-cols-3 gap-3 pt-4 border-t border-white/10 text-xs">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-slate-300">Verified Campus Events</span>
          </div>
          <div className="flex items-center gap-2">
            <Ticket className="w-4 h-4 text-indigo-400 shrink-0" />
            <span className="text-slate-300">Instant Student Passes</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-violet-400 shrink-0" />
            <span className="text-slate-300">Official Club Badges</span>
          </div>
        </div>

      </div>

      {/* RIGHT COLUMN: Welcome Back! Login Card */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 md:p-16">
        <div className="w-full max-w-md space-y-6">
          
          {/* Mobile brand header */}
          <div className="flex items-center gap-2 lg:hidden mb-6">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
              <GraduationCap className="w-5 h-5" />
            </div>
            <span className="text-xl font-extrabold text-slate-900">Campus Connect</span>
          </div>

          {/* Card Header */}
          <div>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100 inline-block mb-3">
              Student Portal Access
            </span>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight my-0">
              {isSignUp ? 'Create Student Account' : 'Welcome Back!'}
            </h1>
            <p className="text-sm text-slate-500 mt-2">
              {isSignUp 
                ? 'Register with your college email to access campus tickets.' 
                : 'Sign in to access your booked passes, discover events, and connect.'}
            </p>
          </div>

          {/* Quick Demo Switcher Pill */}
          <div className="p-3.5 rounded-xl bg-indigo-50/70 border border-indigo-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span className="text-xs font-semibold text-indigo-900">1-Click Evaluator Demo:</span>
            </div>
            <button
              onClick={() => {
                setEmail('aniket.sharma@campus.edu');
                setPassword('password123');
                if (showToast) showToast('Logged In', 'Demo access authorized as Aniket Sharma', 'success');
                onLoginSuccess();
              }}
              className="text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 px-3 py-1.5 rounded-lg transition shadow-xs"
            >
              Sign In as Aniket →
            </button>
          </div>

          {/* Main Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {isSignUp && (
              <>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Aniket Sharma"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    College Student ID
                  </label>
                  <input
                    type="text"
                    required
                    value={collegeId}
                    onChange={(e) => setCollegeId(e.target.value)}
                    placeholder="STU-2026-7829"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600 transition"
                  />
                </div>
              </>
            )}

            {/* Email Address */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student.name@campus.edu"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600 transition"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-slate-600 hover:text-slate-800">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-indigo-600 border-slate-300 focus:ring-indigo-500"
                />
                <span className="font-medium">Remember me</span>
              </label>
              <a
                href="#forgot"
                onClick={handleForgotPassword}
                className="font-semibold text-indigo-600 hover:text-indigo-700 hover:underline"
              >
                Forgot password?
              </a>
            </div>

            {/* Prominent Login Button */}
            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-200 flex items-center justify-center gap-2 transition transform active:scale-[0.99]"
            >
              <span>{isSignUp ? 'Create My Account' : 'Log In to Campus Connect'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Social Logins Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-slate-50 px-3 text-slate-400 font-semibold tracking-wider">
                or continue with
              </span>
            </div>
          </div>

          {/* Social Login Buttons: Google and Apple */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleSocialLogin('Google')}
              className="flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-xs transition"
            >
              {/* Google SVG */}
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Google</span>
            </button>

            <button
              type="button"
              onClick={() => handleSocialLogin('Apple')}
              className="flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-xs transition"
            >
              {/* Apple SVG */}
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.4c.64-.78 1.08-1.86.96-2.95-1 .04-2.14.67-2.8 1.45-.58.68-1.1 1.77-.96 2.83 1.12.09 2.18-.55 2.8-1.33z" />
              </svg>
              <span>Apple</span>
            </button>
          </div>

          {/* Toggle between Sign In and Sign Up */}
          <div className="text-center pt-2">
            <p className="text-xs text-slate-500">
              {isSignUp ? 'Already registered?' : "Don't have an account?"}{' '}
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="font-bold text-indigo-600 hover:text-indigo-700 hover:underline ml-1"
              >
                {isSignUp ? 'Log In here' : 'Sign up for Campus Connect'}
              </button>
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}
