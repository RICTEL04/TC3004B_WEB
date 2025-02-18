"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Bienvenido</h1>
        <p className="mt-2">Página protegida.</p>
        <button
          onClick={() => router.push("/login")} // Simula logout
          className="mt-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}
