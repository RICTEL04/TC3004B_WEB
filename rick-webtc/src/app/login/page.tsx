"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import { User, Lock } from "lucide-react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (username === "admin" && password === "password") {
      localStorage.setItem("auth", "true");
      router.push("/protected");
    } else {
      setError("Credenciales incorrectas");
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="w-full max-w-md bg-gray-800 p-8 rounded-xl shadow-xl">
          <h2 className="text-3xl font-semibold text-center text-white">Iniciar Sesión</h2>
          
          {error && <p className="text-red-500 text-center mt-3">{error}</p>}

          <form onSubmit={handleLogin} className="mt-6">
            {/* Usuario */}
            <div className="relative">
              <label className="block text-gray-400 font-medium">Usuario</label>
              <div className="flex items-center bg-gray-700 rounded-lg mt-1 px-3">
                <User className="text-gray-400" size={18} />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full py-2 px-3 bg-transparent text-white focus:outline-none"
                  required
                  placeholder="Ingresa tu usuario"
                />
              </div>
            </div>

            {/* Contraseña */}
            <div className="relative mt-4">
              <label className="block text-gray-400 font-medium">Contraseña</label>
              <div className="flex items-center bg-gray-700 rounded-lg mt-1 px-3">
                <Lock className="text-gray-400" size={18} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full py-2 px-3 bg-transparent text-white focus:outline-none"
                  required
                  placeholder="********"
                />
              </div>
            </div>

            {/* Botón */}
            <button
              type="submit"
              className="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold transition duration-300 ease-in-out"
            >
              Ingresar
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
