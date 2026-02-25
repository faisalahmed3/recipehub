import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Loading from "../Loading/Loading";
import { FaHeart } from "react-icons/fa";

const Top = () => {
  const [topRecipes, setTopRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopRecipes = async () => {
      try {
        const res = await fetch("https://savorly-sever.vercel.app/recipes/top");
        if (!res.ok) throw new Error("Failed to fetch top recipes");
        const data = await res.json();
        setTopRecipes(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchTopRecipes();
  }, []);

  if (loading) return <Loading />;
  if (error) return <p className="text-center text-red-500 py-10">{error}</p>;

  return (
    <section className="px-4 sm:px-12 md:px-24 raleway pt-16">
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold green tracking-tight">
          Top Recipes
        </h1>
        <p className="mt-3 text-amber-100/60 text-sm sm:text-base">
          Community favorites with the most love.
        </p>
        <div className="mt-6 mx-auto h-[2px] w-48 bg-gradient-to-r from-transparent via-amber-300/60 to-transparent" />
      </div>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
        {topRecipes.length === 0 ? (
          <p className="text-center col-span-3 text-amber-100/70">
            No top recipes available.
          </p>
        ) : (
          topRecipes.map((recipe) => (
            <div
              key={recipe._id}
              className="group border-2 border-amber-600/40 rounded-[28px] overflow-hidden bg-black/30 backdrop-blur-xl shadow-[0_25px_70px_rgba(0,0,0,0.65)] hover:shadow-[0_30px_95px_rgba(0,0,0,0.80)] transition"
            >
              <div className="relative">
                <img
                  src={recipe.image || "https://via.placeholder.com/800x500.png?text=No+Image"}
                  alt={recipe.title}
                  className="w-full h-52 object-cover group-hover:scale-[1.03] transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-xs border border-amber-300/25 bg-black/45 text-amber-100/80 backdrop-blur">
                    {recipe.cuisine || "N/A"}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs border border-amber-300/25 bg-black/45 text-amber-100/80 backdrop-blur inline-flex items-center gap-2">
                    <FaHeart className="text-amber-300/80" />
                    {recipe.likeCount || 0}
                  </span>
                </div>
              </div>

              <div className="p-6 text-center space-y-3">
                <h2 className="text-2xl font-extrabold text-amber-50 tracking-tight">
                  {recipe.title}
                </h2>

                <button
                  onClick={() => navigate(`/recipe/${recipe._id}`)}
                  className="mt-2 w-full rounded-full px-5 py-3 font-semibold text-black
                             bg-gradient-to-r from-[#d6c18a] via-[#ead9a6] to-[#bfa869]
                             hover:brightness-110 transition"
                >
                  View Details
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="flex justify-center mt-12">
        <button
          onClick={() => navigate("/all-recipes")}
          className="rounded-full px-7 py-3 font-semibold text-black
                     bg-gradient-to-r from-[#d6c18a] via-[#ead9a6] to-[#bfa869]
                     hover:brightness-110 transition"
        >
          See All Recipes
        </button>
      </div>
    </section>
  );
};

export default Top;