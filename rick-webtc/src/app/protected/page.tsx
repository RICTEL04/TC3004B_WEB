"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Layout from "@/components/Layout";
import { supabase } from "@/lib/supabaseClient";
import md5 from 'crypto-js/md5';

const PUBLIC_KEY = 'd2f34d724f1d139a828b2d7da58b10df';
const PRIVATE_KEY = '5aa8cbba26b2dbb7163e6a67eba24bc3ee7e350c'
const TS = new Date().getTime().toString();
const HASH = md5(TS + PRIVATE_KEY + PUBLIC_KEY).toString();
const API_URL = `https://gateway.marvel.com/v1/public/comics?apikey=${PUBLIC_KEY}&ts=${TS}&hash=${HASH}&limit=100`;

interface Comic {
  id: number;
  title: string; // Cambiado de name a title
  description: string | null;
  thumbnail: {
    path: string;
    extension: string;
  };
}

export default function ProtectedPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [comics, setComics] = useState<Comic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const checkAuth = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error || !data.session) {
        router.push("/login");
      } else {
        setIsAuthenticated(true);
      }
    };

    checkAuth();
  }, [router]);

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchComics = async () => {
      try {
        const ts = new Date().getTime().toString();
        const hash = md5(ts + PRIVATE_KEY + PUBLIC_KEY).toString();
        const API_URL = `https://gateway.marvel.com/v1/public/comics?apikey=${PUBLIC_KEY}&ts=${ts}&hash=${hash}&limit=100`;

        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("Error fetching data");
        }
        const data = await response.json();
        setComics(data.data.results);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    fetchComics();
  }, [isAuthenticated]);

  const filteredComics = comics.filter((comic) =>
    comic.title.toLowerCase().includes(search.toLowerCase()) // Cambiado de name a title
  );

  const totalPages = Math.ceil(filteredComics.length / itemsPerPage);
  const currentComics = filteredComics.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (!isAuthenticated) return null;
  if (loading) return <Layout><p className="text-center text-lg">Loading...</p></Layout>;
  if (error) return <Layout><p className="text-center text-red-500">Error: {error}</p></Layout>;

  return (
    <Layout>
      <h2 className="text-3xl">Página Protegida 🔒</h2>
      <p className="mt-2">Solo los usuarios autenticados pueden ver esto.</p>

      <input
        type="text"
        placeholder="Buscar personajes..."
        className="p-2 border rounded-md w-full mt-4 text-black"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-7 p-7">
        {currentComics.map((comic) => (
          <div key={comic.id} className="bg-white shadow-md rounded-lg overflow-hidden p-4">
            <Image
              src={`${comic.thumbnail.path}/portrait_xlarge.${comic.thumbnail.extension}`}
              alt={comic.title} // Cambiado de name a title
              width={150}
              height={225}
              className="w-full h-auto rounded"
              unoptimized
            />
            <h3 className="text-black text-lg font-bold mt-2">{comic.title}</h3> {/* Cambiado de name a title */}
            <p className="text-sm text-gray-600 mt-1">
              {comic.description ? comic.description : "No description available"}
            </p>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-3 mt-4">
        <button
          className="px-4 py-2 bg-gray-300 rounded-md"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <span className="px-4 py-2 bg-gray-200 rounded-md">
          Página {currentPage} de {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-gray-300 rounded-md"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Siguiente
        </button>
      </div>
    </Layout>
  );
}
