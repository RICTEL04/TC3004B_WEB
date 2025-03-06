"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Layout from "@/components/Layout";

const PUBLIC_KEY = 'd2f34d724f1d139a828b2d7da58b10df';
const TS = '1741295875929';
const HASH = 'aca5940c04af13ee101b44ab9634665d';
const API_URL = `https://gateway.marvel.com/v1/public/characters?apikey=${PUBLIC_KEY}&ts=${TS}&hash=${HASH}&limit=100`;

interface Comic {
  id: number;
  name: string;
  description: string | null;
  creators: string;
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

  useEffect(() => {
    const auth = localStorage.getItem("auth") === "true";
    setIsAuthenticated(auth);

    if (!auth) {
      router.push("/login");
      return;
    }

    const fetchComics = async () => {
      try {
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
  }, [router]);

  if (!isAuthenticated) return null;
  if (loading) return <Layout><p className="text-center text-lg">Loading...</p></Layout>;
  if (error) return <Layout><p className="text-center text-red-500">Error: {error}</p></Layout>;

  return (
    <Layout>
      <h2 className="text-3xl">Página Protegida 🔒</h2>
      <p className="mt-2">Solo los usuarios autenticados pueden ver esto.</p>
      <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-5 gap-7 p-7">
        {comics.map((comic) => (
          <div key={comic.id} className="bg-white shadow-md rounded-lg overflow-hidden p-4">
            <Image
              src={`${comic.thumbnail.path}/portrait_xlarge.${comic.thumbnail.extension}`}
              alt={comic.name}
              width={150}
              height={225}
              className="w-full h-auto rounded"
              unoptimized
            />
            <h3 className="text-black text-lg font-bold mt-2">{comic.name}</h3>
            <p className="text-sm text-gray-600 mt-1">
              {comic.description ? comic.description : "No description available"}
            </p>
          </div>
        ))}
      </div>
    </Layout>
  );
}
