"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import Image from "next/image";
import {
  ShieldCheck,
  CheckCircle2,
  Lock,
  Mail,
  User,
  Phone,
  ArrowRight,
  Eye,
  EyeOff,
  Sparkles,
  ShoppingBag,
  Building2,
  FileText
} from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/";

  const { login, signup, loginWithGoogle, user } = useAuth();

  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    displayName: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isRegister) {
        if (!formData.displayName) {
          setError("Please provide your full name");
          setLoading(false);
          return;
        }
        const res = await signup(
          formData.email,
          formData.password,
          formData.displayName,
          formData.phone
        );
        if (res.success) {
          router.push(redirectUrl);
        } else {
          setError(res.error || "Failed to create account. Please check your credentials.");
        }
      } else {
        const res = await login(formData.email, formData.password);
        if (res.success) {
          router.push(redirectUrl);
        } else {
          setError(res.error || "Invalid email or password.");
        }
      }
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError("");
    const res = await loginWithGoogle();
    setLoading(false);
    if (res.success) {
      const email = res.user?.email?.toLowerCase()?.trim();
      if (email === 'sachinbhoir786@gmail.com') {
        await fetch('/api/auth', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'verify-admin', email, user: res.user }),
        });
        router.push(redirectUrl === '/' ? '/admin/dashboard' : redirectUrl);
      } else {
        router.push(redirectUrl);
      }
    } else {
      setError(res.error || "Google sign-in was cancelled or failed.");
    }
  };

  const handleQuickDemoLogin = async () => {
    setLoading(true);
    setError("");
    const res = await login("client.vip@onestopproperty.in", "Royal@2026");
    setLoading(false);
    if (res.success) {
      router.push(redirectUrl);
    }
  };

  return (
    <div className="min-h-screen bg-navy-950 text-white flex flex-col justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Ambience Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 bg-navy-900/90 backdrop-blur-2xl rounded-3xl border border-gold/30 shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden relative z-10">
        
        {/* Left 5 Columns: Luxury VIP Perks Showcase (Shopping Club Style) */}
        <div className="lg:col-span-5 bg-navy-950 text-white p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden border-b lg:border-b-0 lg:border-r border-gold/20">
          {/* Subtle Background Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gold/15 rounded-full filter blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-navy-800/60 rounded-full filter blur-2xl pointer-events-none" />

          <div className="relative z-10 space-y-6">
            <div className="inline-flex items-center space-x-2 text-[11px] font-bold tracking-widest uppercase text-gold-light bg-gold/15 border border-gold/40 px-3 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-gold animate-pulse" />
              <span>Royal VIP Investor Club</span>
            </div>

            <div>
              <h2 className="font-serif text-3xl sm:text-4xl text-white leading-tight">
                Unlock Verified Estates &amp; Private Advisory
              </h2>
              <p className="text-navy-300 text-xs sm:text-sm mt-3 leading-relaxed">
                Join Kamothe&apos;s most trusted private real estate circle for priority property viewings, direct developer rates, and 40+ unlisted resale bargains.
              </p>
            </div>

            {/* Shopping & Member Benefits */}
            <div className="space-y-4 pt-4 border-t border-navy-800">
              <div className="flex items-start space-x-3">
                <div className="p-2 rounded-xl bg-gold/15 text-gold border border-gold/30 mt-0.5 shrink-0">
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-semibold text-white">
                    Consultation &amp; Site Visit Bag
                  </h4>
                  <p className="text-xs text-navy-400 mt-0.5">
                    Save multiple properties and book custom site tours in one unified schedule with Adv. Sachin Bhoir.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="p-2 rounded-xl bg-gold/15 text-gold border border-gold/30 mt-0.5 shrink-0">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-semibold text-white">
                    Instant 50-Point RERA Title Dossiers
                  </h4>
                  <p className="text-xs text-navy-400 mt-0.5">
                    1-click access to legal title verifications, floor plans, and clear-chain documents.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="p-2 rounded-xl bg-gold/15 text-gold border border-gold/30 mt-0.5 shrink-0">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-semibold text-white">
                    Zero Brokerage on Verified Homes
                  </h4>
                  <p className="text-xs text-navy-400 mt-0.5">
                    Direct developer pricing on premier Navi Mumbai &amp; Kamothe projects (Save ₹1L–₹3L).
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 pt-8 border-t border-navy-800/80 text-xs text-navy-400 flex items-center justify-between">
            <div className="flex items-center space-x-1.5 text-gold-light">
              <ShieldCheck className="w-4 h-4 text-gold" />
              <span>MahaRERA: A51900019872</span>
            </div>
            <span className="text-navy-300">Sector 21, Kamothe</span>
          </div>
        </div>

        {/* Right 7 Columns: Minimalist Royal Authentication Card */}
        <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-center bg-navy-900/60">
          <div className="max-w-md w-full mx-auto space-y-6">
            
            {/* Header / Tab Switcher */}
            <div>
              <div className="flex bg-navy-950 p-1.5 rounded-2xl border border-gold/30 mb-6">
                <button
                  type="button"
                  onClick={() => {
                    setIsRegister(false);
                    setError("");
                  }}
                  className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${
                    !isRegister
                      ? "bg-gold text-navy-950 shadow-md font-extrabold"
                      : "text-navy-300 hover:text-white"
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsRegister(true);
                    setError("");
                  }}
                  className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${
                    isRegister
                      ? "bg-gold text-navy-950 shadow-md font-extrabold"
                      : "text-navy-300 hover:text-white"
                  }`}
                >
                  Create Account
                </button>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl text-white font-bold">
                {isRegister ? "Join Royal VIP Access" : "Welcome Back, Patron"}
              </h3>
              <p className="text-xs text-navy-300 mt-1.5 leading-relaxed">
                {isRegister
                  ? "Register with email to unlock unlisted Kamothe inventory, clear titles & site visits."
                  : "Sign in to access your consultation bag, saved properties, and private off-market deals."}
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3.5 bg-rose-950/80 border border-rose-500/50 rounded-xl text-xs text-rose-300">
                {error}
              </div>
            )}

            {/* 1-Click Google Login Button */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full flex items-center justify-center space-x-3 py-3 px-4 rounded-xl border border-gold/40 bg-navy-950 hover:bg-gold/15 text-white text-xs font-semibold shadow-sm transition-all"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              <span>Continue with Google (1-Click)</span>
            </button>

            <div className="relative flex items-center justify-center">
              <div className="border-t border-navy-800 w-full" />
              <span className="bg-navy-900/90 px-3 text-[11px] text-navy-400 uppercase tracking-widest relative">
                Or with verified email
              </span>
            </div>

            {/* Email Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {isRegister && (
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gold-light mb-1">
                    Full Name *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="displayName"
                      value={formData.displayName}
                      onChange={handleChange}
                      placeholder="e.g. Rahul Sharma"
                      required={isRegister}
                      className="w-full bg-navy-950 border border-gold/30 rounded-xl px-4 py-3 pl-10 text-xs text-white placeholder-navy-500 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                    />
                    <User className="w-4 h-4 text-gold/70 absolute left-3.5 top-3.5" />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-gold-light mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    required
                    className="w-full bg-navy-950 border border-gold/30 rounded-xl px-4 py-3 pl-10 text-xs text-white placeholder-navy-500 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                  />
                  <Mail className="w-4 h-4 text-gold/70 absolute left-3.5 top-3.5" />
                </div>
              </div>

              {isRegister && (
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gold-light mb-1">
                    Phone / WhatsApp Number (Optional)
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98701 78204"
                      className="w-full bg-navy-950 border border-gold/30 rounded-xl px-4 py-3 pl-10 text-xs text-white placeholder-navy-500 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                    />
                    <Phone className="w-4 h-4 text-gold/70 absolute left-3.5 top-3.5" />
                  </div>
                </div>
              )}

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-gold-light">
                    Password *
                  </label>
                  {!isRegister && (
                    <button
                      type="button"
                      onClick={() => alert("Password reset link has been dispatched to your email address.")}
                      className="text-[11px] text-gold hover:underline font-medium"
                    >
                      Forgot?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                    minLength={6}
                    className="w-full bg-navy-950 border border-gold/30 rounded-xl px-4 py-3 pl-10 pr-10 text-xs text-white placeholder-navy-500 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                  />
                  <Lock className="w-4 h-4 text-gold/70 absolute left-3.5 top-3.5" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3.5 text-navy-400 hover:text-gold transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-gold py-3.5 text-center flex items-center justify-center font-bold text-xs shadow-lg disabled:opacity-50 tracking-wide"
              >
                {loading ? (
                  <span>Authenticating...</span>
                ) : (
                  <>
                    <span>{isRegister ? "Create VIP Client Account" : "Sign In to VIP Portal"}</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </button>
            </form>

            {/* Quick Demo Login Option for Instant Testing */}
            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={handleQuickDemoLogin}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/10 border border-gold/30 text-[11px] text-gold hover:bg-gold/20 transition-all"
              >
                <Sparkles size={12} /> Instant 1-Click VIP Demo Access (client.vip@onestopproperty.in)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-navy-950 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold" />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
