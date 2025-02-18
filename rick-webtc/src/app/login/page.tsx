"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulación de autenticación
    if (username === "admin" && password === "password") {
      router.push("/dashboard"); // Redirige a la pantalla protegida
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900">
      <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-white">Iniciar Sesión</h2>
        
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
        
        <form onSubmit={handleLogin} className="mt-4">
          <div>
            <label className="block text-gray-400">Usuario</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full mt-1 px-4 py-2 rounded bg-gray-700 text-white focus:outline-none"
              required
            />
          </div>

          <div className="mt-4">
            <label className="block text-gray-400">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 px-4 py-2 rounded bg-gray-700 text-white focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded transition"
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}
