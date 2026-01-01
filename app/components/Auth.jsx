"use client";

import { useState, useEffect, useRef } from "react";
import { LockClosedIcon } from "@heroicons/react/24/solid";
import { account, ID } from "@/lib/appwrite";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

export default function AuthModal({ onClose }) {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const secret = searchParams.get("secret");

  const [mode, setMode] = useState(userId && secret ? "reset" : "auth");
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target))
        onClose();
    };
    const handleEscape = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      if (isLogin) {
        await account.createEmailPasswordSession(email, password);
        toast.success("Login successful!");
        onClose();
      } else {
        const user = await account.create(
          ID.unique(),
          email,
          password,
          username
        );
        await fetch("/api/auth/welcome", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            name: username || "",
          }),
        });
        toast.success("Account created! Welcome email sent.");
        onClose();
      }
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL || window.location.origin}/?userId=[USER_ID]&secret=[SECRET]`;
      await account.createRecovery(email, resetUrl);

      await fetch("/api/auth/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name: username || "",
          resetUrl: resetUrl
            .replace("[USER_ID]", "{USER_ID}")
            .replace("[SECRET]", "{SECRET}"),
        }),
      });

      setSuccess("Reset link sent! Check your email.");
    } catch (err) {
      setError(err.message || "Failed to send reset link.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await account.updateRecovery(userId, secret, newPassword, newPassword);
      setSuccess("Password updated! You can now log in.");
      setTimeout(() => {
        setMode("auth");
        setIsLogin(true);
      }, 2000);
    } catch (err) {
      setError(err.message || "Invalid or expired link.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-40" />
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div
          ref={modalRef}
          className="w-full p-10 max-w-lg bg-white shadow-2xl"
        >
          {mode === "auth" && (
            <>
              <div className="flex">
                <button
                  onClick={() => setIsLogin(true)}
                  className={`flex-1 py-3 text-white font-bold text-[16px] transition-colors cursor-pointer ${isLogin ? "bg-[#0277bd]" : "bg-[#cccccc]"}`}
                >
                  Login
                </button>
                <button
                  onClick={() => setIsLogin(false)}
                  className={`flex-1 py-3 text-black font-bold text-lg transition-colors cursor-pointer ${!isLogin ? "bg-[#0277bd] text-white" : "bg-[#e0e0e0]"}`}
                >
                  Register
                </button>
              </div>

              <div className="p-6">
                <h2 className="text-2xl font-[400] uppercase text-[#555555] text-[14px] mb-6 border-b-1 border-[#dedede] pb-2">
                  {isLogin ? "Login" : "Register"}
                </h2>

                <form className="space-y-6" onSubmit={handleAuthSubmit}>
                  <div>
                    <label className="block text-[#888888] font-medium mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-[#f6f7f8] focus:outline-none focus:border-[#0079d3]"
                      required
                    />
                    <p className="text-xs text-[#888888] mt-2">
                      Use a valid email address.
                    </p>
                  </div>

                  {!isLogin && (
                    <div>
                      <label className="block text-[#888888] font-medium mb-1">
                        Username 
                      </label>
                      <input
                        type="text"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-4 py-3 bg-[#f6f7f8] focus:outline-none focus:border-[#0079d3]"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-[#888888] font-medium mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 bg-[#f6f7f8] focus:outline-none focus:border-[#0079d3]"
                      required
                    />
                    <p className="text-xs text-[#888888] mt-2">
                      At least 8 characters, not common.
                    </p>
                  </div>

                  {error && <p className="text-red-500 text-sm">{error}</p>}

                  <button
                    type="submit"
                    disabled={loading}
                    className={`py-[15px] px-[30px] text-white font-[400] text-[14px] cursor-pointer transition-colors ${loading ? "bg-gray-400" : "bg-[#00bcd4]"}`}
                  >
                    {loading ? "Loading..." : isLogin ? "Log In" : "Sign Up"}
                  </button>
                </form>

                {isLogin && (
                  <div className="mt-8 flex items-center text-sm">
                    <LockClosedIcon className="h-5 w-5 mr-2" />
                    <button
                      type="button"
                      onClick={() => setMode("forgot")}
                      className="hover:underline text-[#0277bd]"
                    >
                      Lost Password
                    </button>
                  </div>
                )}
              </div>
            </>
          )}

          {mode === "forgot" && (
            <div className="p-6">
              <h2 className="text-2xl font-[400] uppercase text-[#555555] text-[14px] mb-6 border-b-1 border-[#dedede] pb-2">
                Reset Password
              </h2>
              <form className="space-y-6" onSubmit={handleForgotSubmit}>
                <div>
                  <label className="block text-[#888888] font-medium mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-[#f6f7f8] focus:outline-none focus:border-[#0079d3]"
                    required
                  />
                  <p className="text-xs text-[#888888] mt-2">
                    We'll send a secure reset link.
                  </p>
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                {success && <p className="text-green-600 text-sm">{success}</p>}
                <button
                  type="submit"
                  disabled={loading}
                  className={`py-[15px] px-[30px] text-white font-[400] text-[14px] cursor-pointer transition-colors ${loading ? "bg-gray-400" : "bg-[#00bcd4]"}`}
                >
                  {loading ? "Sending..." : "Send Reset Link"}
                </button>
                <button
                  type="button"
                  onClick={() => setMode("auth")}
                  className="block mt-4 text-sm text-[#0277bd] hover:underline"
                >
                  Back to Login
                </button>
              </form>
            </div>
          )}

          {mode === "reset" && (
            <div className="p-6">
              <h2 className="text-2xl font-[400] uppercase text-[#555555] text-[14px] mb-6 border-b-1 border-[#dedede] pb-2">
                Set New Password
              </h2>
              <form className="space-y-6" onSubmit={handleResetSubmit}>
                <div>
                  <label className="block text-[#888888] font-medium mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-[#f6f7f8] focus:outline-none focus:border-[#0079d3]"
                    required
                  />
                  <p className="text-xs text-[#888888] mt-2">
                    At least 8 characters.
                  </p>
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                {success && <p className="text-green-600 text-sm">{success}</p>}
                <button
                  type="submit"
                  disabled={loading}
                  className={`py-[15px] px-[30px] text-white font-[400] text-[14px] cursor-pointer transition-colors ${loading ? "bg-gray-400" : "bg-[#00bcd4]"}`}
                >
                  {loading ? "Saving..." : "Update Password"}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
