"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const accessToken = searchParams.get("access_token");

  useEffect(() => {
    if (!accessToken) {
      setError("");
    }
  }, [accessToken]);

  const handleResetPassword = async () => {
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
      setTimeout(() => router.push("/login"), 3000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl mb-4">Restablecer Contraseña</h2>

        {error && <p className="text-red-500">{error}</p>}
        {success ? (
          <p className="text-green-500">Contraseña actualizada correctamente. Redirigiendo...</p>
        ) : (
          <>
            <input
              type="password"
              placeholder="Nueva contraseña"
              className="p-2 border rounded w-full mb-2 text-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirmar contraseña"
              className="p-2 border rounded w-full mb-4 text-black"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              onClick={handleResetPassword}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full"
            >
              Cambiar contraseña
            </button>
          </>
        )}
      </div>
    </div>
  );
}
