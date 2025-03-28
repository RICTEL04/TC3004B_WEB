"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error || !data.session) {
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
      }
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 p-4 flex justify-between items-center">
        <h1 className="text-2xl">Mi App</h1>
        {!isAuthenticated ? (
          <button
            onClick={() => router.push("/login")}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Iniciar Sesión
          </button>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Cerrar Sesión
          </button>
        )}
      </header>

      {/* Menú de Navegación */}
      <nav className="bg-gray-700 p-2 flex gap-4">
        <Link href="/" className="text-blue-400 hover:underline">Inicio</Link>
        <Link href="/public" className="text-blue-400 hover:underline">Pública</Link>
        {isAuthenticated && (
          <Link href="/protected" className="text-green-400 hover:underline">Protegida</Link>
        )}
      </nav>

      {/* Contenido dinámico */}
      <main className="p-6">{children}</main>
    </div>
  );
}
