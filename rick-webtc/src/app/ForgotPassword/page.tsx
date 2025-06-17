"use client";

import { useState } from "react";
import Layout from "@/components/Layout";
import { Mail } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:3000//reset-password",
    });
    
  
    if (error) {
      setMessage("Error al enviar el enlace");
    } else {
      setMessage("Si el correo está registrado, recibirás un enlace para restablecer tu contraseña.");
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="w-full max-w-md bg-gray-800 p-8 rounded-xl shadow-xl">
          <h2 className="text-3xl font-semibold text-center text-white">Recuperar Contraseña</h2>
          {message && <p className="text-green-500 text-center mt-3">{message}</p>}
          <form onSubmit={handleReset} className="mt-6">
            <div className="relative">
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
            <button
              type="submit"
              className="w-full mt-6 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg font-semibold transition duration-300 ease-in-out"
            >
              Enviar enlace
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
