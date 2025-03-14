"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import { User, Lock, Mail } from "lucide-react";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (username && email && password) {
      localStorage.setItem("user", JSON.stringify({ username, email, password }));
      router.push("/login");
    } else {
      setError("Todos los campos son obligatorios");
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="w-full max-w-md bg-gray-800 p-8 rounded-xl shadow-xl">
          <h2 className="text-3xl font-semibold text-center text-white">Registro</h2>
          {error && <p className="text-red-500 text-center mt-3">{error}</p>}
          <form onSubmit={handleRegister} className="mt-6">
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
            <div className="relative mt-4">
              <label className="block text-gray-400 font-medium">Correo</label>
              <div className="flex items-center bg-gray-700 rounded-lg mt-1 px-3">
                <Mail className="text-gray-400" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full py-2 px-3 bg-transparent text-white focus:outline-none"
                  required
                  placeholder="Ingresa tu correo"
                />
              </div>
            </div>
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
            <button
              type="submit"
              className="w-full mt-6 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-semibold transition duration-300 ease-in-out"
            >
              Registrarse
            </button>
          </form>
          <div className="mt-4 text-center">
            <a href="/login" className="text-gray-400 hover:underline">¿Ya tienes cuenta? Inicia sesión</a>
          </div>
        </div>
      </div>
    </Layout>
  );
}
