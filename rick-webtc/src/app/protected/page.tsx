"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Layout from "@/components/Layout";

export default function ProtectedPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("auth") === "true";
    setIsAuthenticated(auth);

    if (!auth) {
      router.push("/login");
    }
  }, [router]);

  if (!isAuthenticated) return null;

  return (
    <Layout>
      <h2 className="text-3xl">Página Protegida 🔒</h2>
      <p className="mt-2">Solo los usuarios autenticados pueden ver esto.</p>
    </Layout>
  );
}
