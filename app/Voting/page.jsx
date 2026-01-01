"use client";

import { useEffect, useState } from "react";
import { account, databases, ID, Query } from "../../lib/appwrite";
import celebrities from "../data/celebrities.json";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const DATABASE_ID = process.env.NEXT_PUBLIC_DATABASE_ID;
const VOTES_COLLECTION_ID = process.env.NEXT_PUBLIC_VOTES_COLLECTION_ID;

export default function VotingPage() {
  const [user, setUser] = useState(null);
  const [voteCounts, setVoteCounts] = useState({});
  const [totalVotes, setTotalVotes] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await account.get();
        setUser(currentUser);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
    fetchVoteCounts();
  }, []);

  const fetchVoteCounts = async () => {
    try {
      const response = await databases.listDocuments(DATABASE_ID, VOTES_COLLECTION_ID);
      const counts = {};
      let total = 0;
      response.documents.forEach((doc) => {
        const celebId = doc.celeb_id;
        counts[celebId] = (counts[celebId] || 0) + 1;
        total += 1;
      });
      setVoteCounts(counts);
      setTotalVotes(total);
    } catch (err) {
      console.error("Error fetching votes:", err);
    }
  };

  const handleVote = async (celebId) => {
    if (!user) {
      setError("Debes iniciar sesión para votar.");
      router.push("/Entertainment");
      return;
    }

    try {
      const existingVotes = await databases.listDocuments(
        DATABASE_ID,
        VOTES_COLLECTION_ID,
        [Query.equal("user_id", user.$id), Query.equal("celeb_id", celebId)]
      );

      if (existingVotes.total > 0) {
        toast.error("¡Ya votaste por esta celebridad!");
        return;
      }

      await databases.createDocument(
        DATABASE_ID,
        VOTES_COLLECTION_ID,
        ID.unique(),
        {
          user_id: user.$id,
          celeb_id: celebId,
          voted_at: new Date().toISOString(),
        }
      );

      setVoteCounts((prev) => ({
        ...prev,
        [celebId]: (prev[celebId] || 0) + 1,
      }));
      setTotalVotes((prev) => prev + 1);

      toast.success("¡Voto registrado exitosamente! 🇲🇽");
      setError(null);
    } catch (err) {
      console.error(err);
      toast.error("Error al votar: " + err.message);
    }
  };

  if (loading) return <p className="text-center text-2xl mt-32">Cargando votaciones...</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Vota por tu Celebridad Mexicana Favorita
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            Elige al ídolo que más te inspira
          </p>
          <p className="text-lg text-gray-500">
            Total de votos: <span className="font-bold text-red-600">{totalVotes}</span>
          </p>
        </div>

        {error && (
          <p className="text-center text-red-600 bg-red-50 py-3 rounded-lg mb-8 max-w-2xl mx-auto">
            {error}
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {celebrities.map((celeb) => {
            const votes = voteCounts[celeb.id] || 0;

            return (
              <div
                key={celeb.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="relative h-96 overflow-hidden">
                  <img
                    src={celeb.image}
                    alt={celeb.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <p className="text-sm opacity-90">{celeb.category}</p>
                  </div>
                </div>

                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{celeb.name}</h2>
                  <p className="text-gray-600 text-sm mb-6 line-clamp-3">{celeb.description}</p>

                  <div className="flex items-center justify-between mb-6">
                    <span className="text-gray-600">Votos</span>
                    <span className="text-3xl font-bold text-red-600">{votes}</span>
                  </div>

                  <button
                    onClick={() => handleVote(celeb.id)}
                    className="w-full py-4 bg-red-600 text-white font-bold text-lg rounded-xl hover:bg-red-700 transition-colors duration-300"
                  >
                    Votar por {celeb.name}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}