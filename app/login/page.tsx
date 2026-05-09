"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import logo from "@/public/logo.png";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid email or password");
      } else {
        router.push("/admin");
        router.refresh();
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-6">
      <div className="max-w-md w-full bg-white border border-forest/10 p-10 shadow-sm">
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 mb-4 relative">
            <Image
              src={logo}
              alt="JSB Interiors"
              fill
              className="object-contain"
            />
          </div>
          <h1 
            className="text-2xl font-bold text-forest"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Admin Portal
          </h1>
          <p className="text-forest/40 text-xs tracking-widest uppercase mt-2">
            JSB Interiors · Est. 1989
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 text-xs p-4 mb-6 border border-red-100 uppercase tracking-widest">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[0.65rem] tracking-[0.2em] uppercase text-forest/50 mb-2 font-medium">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              placeholder="[EMAIL_ADDRESS]"
              required
            />
          </div>

          <div>
            <label className="block text-[0.65rem] tracking-[0.2em] uppercase text-forest/50 mb-2 font-medium">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input pr-10"
                placeholder="Enter Password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-forest/40 hover:text-forest transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full justify-center mt-4 disabled:opacity-50"
          >
            {loading ? "Authenticating..." : "Sign In"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button 
            onClick={() => router.push("/")}
            className="text-[0.65rem] tracking-[0.2em] uppercase text-forest/30 hover:text-forest transition-colors"
          >
            ← Back to live site
          </button>
        </div>
      </div>
    </div>
  );
}
