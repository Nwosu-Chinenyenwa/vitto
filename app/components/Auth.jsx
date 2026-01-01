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
        toast.success("¡Sesión iniciada con éxito!");
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
        toast.success("¡Cuenta creada! Te enviamos un correo de bienvenida.");
        onClose();
      }
    } catch (err) {
      setError(err.message || "Algo salió mal.");
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

      setSuccess("¡Listo! Revisa tu correo para el enlace de recuperación.");
    } catch (err) {
      setError(err.message || "No pudimos enviar el enlace de recuperación.");
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
      setSuccess("¡Contraseña actualizada! Ya puedes iniciar sesión.");
      setTimeout(() => {
        setMode("auth");
        setIsLogin(true);
      }, 2000);
    } catch (err) {
      setError(err.message || "El enlace es inválido o ya expiró.");
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
                  Iniciar Sesión
                </button>
                <button
                  onClick={() => setIsLogin(false)}
                  className={`flex-1 py-3 text-black font-bold text-lg transition-colors cursor-pointer ${!isLogin ? "bg-[#0277bd] text-white" : "bg-[#e0e0e0]"}`}
                >
                  Registrarse
                </button>
              </div>

              <div className="p-6">
                <h2 className="text-2xl font-[400] uppercase text-[#555555] text-[14px] mb-6 border-b-1 border-[#dedede] pb-2">
                  {isLogin ? "Iniciar Sesión" : "Crear Cuenta"}
                </h2>

                <form className="space-y-6" onSubmit={handleAuthSubmit}>
                  <div>
                    <label className="block text-[#888888] font-medium mb-1">
                      Correo Electrónico
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-[#f6f7f8] focus:outline-none focus:border-[#0079d3]"
                      required
                    />
                    <p className="text-xs text-[#888888] mt-2">
                      Usa un correo válido.
                    </p>
                  </div>

                  {!isLogin && (
                    <div>
                      <label className="block text-[#888888] font-medium mb-1">
                        Nombre de Usuario
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
                      Contraseña
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 bg-[#f6f7f8] focus:outline-none focus:border-[#0079d3]"
                      required
                    />
                    <p className="text-xs text-[#888888] mt-2">
                      Mínimo 8 caracteres, no uses una común.
                    </p>
                  </div>

                  {error && <p className="text-red-500 text-sm">{error}</p>}

                  <button
                    type="submit"
                    disabled={loading}
                    className={`py-[15px] px-[30px] text-white font-[400] text-[14px] cursor-pointer transition-colors ${loading ? "bg-gray-400" : "bg-[#00bcd4]"}`}
                  >
                    {loading ? "Cargando..." : isLogin ? "Entrar" : "Registrarme"}
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
                      ¿Olvidaste tu contraseña?
                    </button>
                  </div>
                )}
              </div>
            </>
          )}

          {mode === "forgot" && (
            <div className="p-6">
              <h2 className="text-2xl font-[400] uppercase text-[#555555] text-[14px] mb-6 border-b-1 border-[#dedede] pb-2">
                Recuperar Contraseña
              </h2>
              <form className="space-y-6" onSubmit={handleForgotSubmit}>
                <div>
                  <label className="block text-[#888888] font-medium mb-1">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-[#f6f7f8] focus:outline-none focus:border-[#0079d3]"
                    required
                  />
                  <p className="text-xs text-[#888888] mt-2">
                    Te enviaremos un enlace seguro para recuperar tu cuenta.
                  </p>
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                {success && <p className="text-green-600 text-sm">{success}</p>}
                <button
                  type="submit"
                  disabled={loading}
                  className={`py-[15px] px-[30px] text-white font-[400] text-[14px] cursor-pointer transition-colors ${loading ? "bg-gray-400" : "bg-[#00bcd4]"}`}
                >
                  {loading ? "Enviando..." : "Enviar Enlace"}
                </button>
                <button
                  type="button"
                  onClick={() => setMode("auth")}
                  className="block mt-4 text-sm text-[#0277bd] hover:underline"
                >
                  Regresar al Inicio de Sesión
                </button>
              </form>
            </div>
          )}

          {mode === "reset" && (
            <div className="p-6">
              <h2 className="text-2xl font-[400] uppercase text-[#555555] text-[14px] mb-6 border-b-1 border-[#dedede] pb-2">
                Establecer Nueva Contraseña
              </h2>
              <form className="space-y-6" onSubmit={handleResetSubmit}>
                <div>
                  <label className="block text-[#888888] font-medium mb-1">
                    Nueva Contraseña
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-[#f6f7f8] focus:outline-none focus:border-[#0079d3]"
                    required
                  />
                  <p className="text-xs text-[#888888] mt-2">
                    Mínimo 8 caracteres.
                  </p>
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                {success && <p className="text-green-600 text-sm">{success}</p>}
                <button
                  type="submit"
                  disabled={loading}
                  className={`py-[15px] px-[30px] text-white font-[400] text-[14px] cursor-pointer transition-colors ${loading ? "bg-gray-400" : "bg-[#00bcd4]"}`}
                >
                  {loading ? "Guardando..." : "Cambiar Contraseña"}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
}