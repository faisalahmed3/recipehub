import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router";
import Loading from "../../Components/Loading/Loading";
import {
  FiClock,
  FiHeart,
  FiTag,
  FiChevronLeft,
  FiExternalLink,
} from "react-icons/fi";
import { GiKnifeFork } from "react-icons/gi";

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await fetch(
          `https://savorly-sever.vercel.app/recipes/${id}`
        );
        if (!res.ok) throw new Error("Failed to fetch recipe");
        const data = await res.json();
        setRecipe(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  const ingredientsArray = useMemo(() => {
    if (!recipe) return [];
    if (Array.isArray(recipe.ingredients)) return recipe.ingredients;
    if (typeof recipe.ingredients === "string")
      return recipe.ingredients
        .split(",")
        .map((i) => i.trim())
        .filter(Boolean);
    return [];
  }, [recipe]);

  const extractYouTubeEmbedUrl = (url) => {
    try {
      const match = url.match(
        /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/
      );
      return match ? `https://www.youtube.com/embed/${match[1]}` : null;
    } catch {
      return null;
    }
  };

  const videoEmbedUrl = recipe?.video
    ? extractYouTubeEmbedUrl(recipe.video)
    : null;

  if (loading) return <Loading />;

  if (error)
    return (
      <div className="ivory-bg min-h-screen flex items-center justify-center px-4">
        <div className="max-w-xl w-full rounded-3xl border border-amber-400/15 bg-black/40 backdrop-blur-xl shadow-[0_30px_90px_rgba(0,0,0,0.75)] p-8 text-center">
          <h2 className="text-2xl font-extrabold text-red-400 raleway">
            Something went wrong
          </h2>
          <p className="mt-3 text-amber-100/70">{error}</p>
          <Link
            to="/all-recipes"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-black/30 px-5 py-2 text-amber-100 hover:bg-black/40 transition"
          >
            <FiChevronLeft /> Back to recipes
          </Link>
        </div>
      </div>
    );

  if (!recipe)
    return (
      <div className="ivory-bg min-h-screen flex items-center justify-center px-4">
        <div className="max-w-xl w-full rounded-3xl border border-amber-400/15 bg-black/40 backdrop-blur-xl shadow-[0_30px_90px_rgba(0,0,0,0.75)] p-8 text-center">
          <h2 className="text-2xl font-extrabold text-amber-50 raleway">
            Recipe not found
          </h2>
          <p className="mt-3 text-amber-100/70">
            This recipe may have been removed or the link is incorrect.
          </p>
          <Link
            to="/all-recipes"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-black/30 px-5 py-2 text-amber-100 hover:bg-black/40 transition"
          >
            <FiChevronLeft /> Back to recipes
          </Link>
        </div>
      </div>
    );

  return (
    <div className="ivory-bg min-h-screen raleway">
      <main className="max-w-6xl mx-auto px-4 sm:px-8 md:px-12 lg:px-20 pt-28 pb-16">
        {/* HERO CARD */}
        <section className="relative overflow-hidden rounded-[32px] border border-amber-400/15 bg-gradient-to-b from-black/60 via-black/40 to-black/20 backdrop-blur-2xl shadow-[0_30px_110px_rgba(0,0,0,0.78)]">
          {/* glow */}
          <div className="pointer-events-none absolute -inset-24 bg-[radial-gradient(circle_at_20%_10%,rgba(214,193,138,0.14),transparent_45%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_60%,rgba(214,193,138,0.10),transparent_55%)]" />

          {/* top shine */}
          <div className="relative h-[2px] w-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-300/55 to-transparent" />
            <div className="absolute -left-1/3 top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shine_3.8s_linear_infinite]" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 sm:p-8 md:p-10">
            {/* Image */}
            <div className="relative overflow-hidden rounded-3xl border border-amber-300/15 bg-black/30">
              {recipe.image ? (
                <>
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-[280px] sm:h-[360px] lg:h-[440px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                </>
              ) : (
                <div className="h-[280px] sm:h-[360px] lg:h-[440px] flex items-center justify-center text-amber-100/60">
                  No image available
                </div>
              )}

              {/* badge */}
              <div className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-black/40 px-4 py-2 text-sm text-amber-100/80 backdrop-blur">
                <GiKnifeFork className="text-amber-200" />
                <span className="font-semibold">{recipe.cuisine || "Cuisine"}</span>
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col justify-between">
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-amber-50 tracking-wide">
                  {recipe.title}
                </h1>

                <p className="mt-4 text-amber-100/65 leading-relaxed">
                  {recipe.shortDescription ||
                    "A premium recipe page with ingredients, steps, and an optional video guide. Cook it once and you’ll remember it."}
                </p>

                {/* meta chips */}
                <div className="mt-6 flex flex-wrap gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/15 bg-black/30 px-4 py-2 text-amber-100/75">
                    <FiClock className="text-amber-200/80" />
                    <span>
                      Prep:{" "}
                      <span className="text-amber-50 font-semibold">
                        {recipe.prepTime ?? "N/A"} min
                      </span>
                    </span>
                  </span>

                  <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/15 bg-black/30 px-4 py-2 text-amber-100/75">
                    <FiHeart className="text-amber-200/80" />
                    <span>
                      Likes:{" "}
                      <span className="text-amber-50 font-semibold">
                        {recipe.likeCount || 0}
                      </span>
                    </span>
                  </span>

                  <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/15 bg-black/30 px-4 py-2 text-amber-100/75">
                    <FiTag className="text-amber-200/80" />
                    <span className="line-clamp-1">
                      {recipe.categories?.length
                        ? recipe.categories.join(", ")
                        : "No categories"}
                    </span>
                  </span>
                </div>
              </div>

              {/* actions */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  to="/all-recipes"
                  className="inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-black/30 px-5 py-3 text-amber-100 hover:bg-black/40 transition"
                >
                  <FiChevronLeft /> Back
                </Link>

                <Link
                  to="/all-recipes"
                  className="relative inline-flex items-center justify-center rounded-full px-6 py-3 font-semibold overflow-hidden"
                  style={{ background: "transparent" }}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-[#d6c18a] via-[#ead9a6] to-[#bfa869] opacity-95" />
                  <span className="absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.45),transparent_50%)]" />
                  <span className="relative text-black">
                    Explore More Recipes
                  </span>
                </Link>

                {recipe.video && (
                  <a
                    href={recipe.video}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-black/30 px-5 py-3 text-amber-100 hover:bg-black/40 transition"
                  >
                    Video Link <FiExternalLink />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* bottom accent */}
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-amber-300/25 to-transparent" />
        </section>

        {/* DETAILS GRID */}
        <section className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Ingredients */}
          <div className="lg:col-span-1 rounded-3xl border border-amber-400/15 bg-black/35 backdrop-blur-xl shadow-[0_20px_70px_rgba(0,0,0,0.65)] overflow-hidden">
            <div className="px-6 py-5 border-b border-amber-300/15">
              <h2 className="text-xl sm:text-2xl font-extrabold text-amber-50">
                Ingredients
              </h2>
              <p className="mt-1 text-sm text-amber-100/55">
                Everything you need, in one place.
              </p>
            </div>

            <div className="p-6">
              {ingredientsArray.length > 0 ? (
                <ul className="space-y-3 text-amber-100/75">
                  {ingredientsArray.map((ingredient, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 rounded-2xl border border-amber-300/10 bg-black/20 px-4 py-3"
                    >
                      <span className="mt-[6px] h-2 w-2 rounded-full bg-amber-300/70 shrink-0" />
                      <span className="leading-relaxed">{ingredient}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-amber-100/55 italic">
                  No ingredients listed.
                </p>
              )}
            </div>
          </div>

          {/* Instructions */}
          <div className="lg:col-span-2 rounded-3xl border border-amber-400/15 bg-black/35 backdrop-blur-xl shadow-[0_20px_70px_rgba(0,0,0,0.65)] overflow-hidden">
            <div className="px-6 py-5 border-b border-amber-300/15">
              <h2 className="text-xl sm:text-2xl font-extrabold text-amber-50">
                Instructions
              </h2>
              <p className="mt-1 text-sm text-amber-100/55">
                Step-by-step, clean and readable.
              </p>
            </div>

            <div className="p-6">
              <div className="rounded-3xl border border-amber-300/10 bg-black/20 p-5 sm:p-6">
                <p className="whitespace-pre-line text-amber-100/80 text-base sm:text-lg leading-relaxed lato">
                  {recipe.instructions || "No instructions provided."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* VIDEO */}
        {videoEmbedUrl && (
          <section className="mt-10 rounded-3xl border border-amber-400/15 bg-black/35 backdrop-blur-xl shadow-[0_25px_80px_rgba(0,0,0,0.7)] overflow-hidden">
            <div className="px-6 py-5 border-b border-amber-300/15">
              <h2 className="text-xl sm:text-2xl font-extrabold text-amber-50">
                Watch the Recipe Video
              </h2>
              <p className="mt-1 text-sm text-amber-100/55">
                Follow along visually for perfect timing.
              </p>
            </div>

            <div className="p-6">
              <div className="relative overflow-hidden rounded-3xl border border-amber-300/10 bg-black/20">
                <div className="aspect-video">
                  <iframe
                    className="w-full h-full"
                    src={videoEmbedUrl}
                    title="YouTube recipe video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <style>{`
        @keyframes shine {
          0% { transform: translateX(0); }
          100% { transform: translateX(220%); }
        }
      `}</style>
    </div>
  );
};

export default RecipeDetails;