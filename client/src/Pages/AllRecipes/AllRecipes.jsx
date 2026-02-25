import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import { AiOutlineHeart, AiOutlineSearch } from "react-icons/ai";
import { FiFilter } from "react-icons/fi";
import Loading from "../../Components/Loading/Loading";

const AllRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [cuisineFilter, setCuisineFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch all recipes
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await fetch("https://savorly-sever.vercel.app/recipes");
        const data = await res.json();
        setRecipes(data);
        setFilteredRecipes(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching recipes:", err);
        setError("Failed to load recipes.");
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  // Cuisine types
  const cuisineTypes = useMemo(
    () => ["All", ...new Set(recipes.map((r) => r.cuisine).filter(Boolean))],
    [recipes]
  );

  const filterRecipes = (query, cuisine) => {
    let filtered = recipes;

    if (query) {
      const q = query.toLowerCase();
      filtered = filtered.filter((recipe) =>
        recipe.title?.toLowerCase().includes(q)
      );
    }

    if (cuisine && cuisine !== "All") {
      filtered = filtered.filter((recipe) => recipe.cuisine === cuisine);
    }

    setFilteredRecipes(filtered);
  };

  const handleFilterChange = (e) => {
    const selected = e.target.value;
    setCuisineFilter(selected);
    filterRecipes(searchQuery, selected);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    filterRecipes(query, cuisineFilter);
  };

  // Handle Like
  const handleLike = async (id) => {
    try {
      const res = await fetch(
        `https://savorly-sever.vercel.app/recipes/${id}/like`,
        { method: "PATCH" }
      );
      const result = await res.json();

      if (result.success) {
        const updated = recipes.map((r) =>
          r._id === id ? { ...r, likeCount: (r.likeCount || 0) + 1 } : r
        );
        setRecipes(updated);

        // Re-apply filter on updated data
        let filtered = updated;
        if (searchQuery) {
          const q = searchQuery.toLowerCase();
          filtered = filtered.filter((recipe) =>
            recipe.title?.toLowerCase().includes(q)
          );
        }
        if (cuisineFilter !== "All") {
          filtered = filtered.filter((recipe) => recipe.cuisine === cuisineFilter);
        }
        setFilteredRecipes(filtered);
      }
    } catch (err) {
      console.error("Error liking recipe:", err);
    }
  };

  if (loading) return <Loading />;
  if (error) return <p className="text-center text-red-500 py-10">{error}</p>;

  return (
    <div className="ivory-bg raleway">
      {/* Premium Header */}
      <div className="px-4 sm:px-10 md:px-14 lg:px-24 pt-8">
        <div className="relative overflow-hidden rounded-3xl border border-amber-400/15 bg-gradient-to-b from-black/60 via-black/40 to-black/20 backdrop-blur-xl shadow-[0_30px_90px_rgba(0,0,0,0.7)]">
          <div className="absolute -inset-16 bg-[radial-gradient(circle_at_20%_10%,rgba(214,193,138,0.12),transparent_45%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_60%,rgba(214,193,138,0.08),transparent_55%)] pointer-events-none" />

          <div className="px-6 sm:px-10 py-10 sm:py-12 text-center">
            <h1 className="green text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-wide">
              All Recipes
            </h1>
            <p className="mt-3 text-amber-100/60 text-sm sm:text-base">
              Browse, filter, and find something worth cooking tonight.
            </p>

            {/* Search + Filter Bar */}
            <div className="mt-8 flex flex-col lg:flex-row items-stretch lg:items-center justify-center gap-4">
              {/* Search */}
              <div className="w-full lg:w-[520px]">
                <div className="relative">
                  <AiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-300/80 text-xl" />
                  <input
                    type="text"
                    placeholder="Search by recipe title..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="
                      w-full
                      rounded-full
                      border border-amber-400/20
                      bg-black/40
                      px-12 py-3
                      text-amber-50 placeholder:text-amber-100/40
                      outline-none
                      focus:border-amber-300/40
                      focus:ring-2 focus:ring-amber-300/20
                      backdrop-blur-xl
                    "
                  />
                </div>
              </div>

              {/* Filter */}
              <div className="w-full lg:w-auto">
                <div className="flex items-center gap-3 rounded-full border border-amber-400/20 bg-black/40 px-4 py-3 backdrop-blur-xl">
                  <FiFilter className="text-amber-300/80 text-lg shrink-0" />
                  <span className="text-amber-100/70 text-sm whitespace-nowrap">
                    Cuisine
                  </span>
                  <select
                    value={cuisineFilter}
                    onChange={handleFilterChange}
                    className="
                      bg-transparent
                      text-amber-50
                      outline-none
                      cursor-pointer
                      pr-2
                    "
                  >
                    {cuisineTypes.map((type, index) => (
                      <option key={index} value={type} className="text-black">
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Results count */}
            <div className="mt-6 text-amber-100/50 text-sm">
              Showing <span className="text-amber-200 font-semibold">{filteredRecipes.length}</span>{" "}
              recipes
            </div>
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 px-4 sm:px-10 md:px-14 lg:px-24 py-12">
        {filteredRecipes.map((recipe) => (
          <div
            key={recipe._id}
            className="
              group
              relative
              overflow-hidden
              rounded-3xl
              border border-amber-400/15
              bg-gradient-to-b from-black/45 via-black/30 to-black/20
              backdrop-blur-xl
              shadow-[0_22px_70px_rgba(0,0,0,0.75)]
              transition
              hover:-translate-y-1
              hover:shadow-[0_30px_90px_rgba(0,0,0,0.85)]
            "
          >
            {/* glow */}
            <div className="absolute -inset-20 bg-[radial-gradient(circle_at_30%_20%,rgba(214,193,138,0.14),transparent_45%)] opacity-0 group-hover:opacity-100 transition pointer-events-none" />

            {/* image */}
            <div className="relative">
              <img
                src={
                  recipe.image ||
                  "https://via.placeholder.com/500x320.png?text=No+Image"
                }
                alt={recipe.title}
                className="w-full h-52 sm:h-56 object-cover"
              />
              {/* image overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />

              {/* cuisine pill */}
              {recipe.cuisine && (
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center rounded-full border border-amber-300/20 bg-black/40 px-3 py-1 text-xs text-amber-100/80 backdrop-blur">
                    {recipe.cuisine}
                  </span>
                </div>
              )}
            </div>

            <div className="p-6 space-y-4">
              <div className="text-center space-y-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-amber-50 tracking-wide">
                  {recipe.title}
                </h1>

                <div className="text-sm sm:text-base text-amber-100/65 space-y-1">
                  <p>
                    Prep Time:{" "}
                    <span className="text-amber-100 font-semibold">
                      {recipe.prepTime} mins
                    </span>
                  </p>
                  <p className="line-clamp-1">
                    Category:{" "}
                    <span className="text-amber-100 font-semibold">
                      {recipe.categories?.join(", ") || "N/A"}
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-center justify-center pt-2">
                <button
                  onClick={() => handleLike(recipe._id)}
                  className="
                    inline-flex items-center gap-2
                    rounded-full
                    border border-amber-400/15
                    bg-black/30
                    px-4 py-2
                    text-amber-100/80
                    hover:text-red-300
                    hover:border-amber-300/25
                    hover:bg-black/40
                    transition
                  "
                  title="Like Recipe"
                >
                  <AiOutlineHeart className="text-xl" />
                  <span className="font-semibold">{recipe.likeCount || 0}</span>
                </button>

                <Link
                  to={`/recipe/${recipe._id}`}
                  className="relative btn border-0 px-5 rounded-full overflow-hidden"
                  style={{ background: "transparent" }}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-[#d6c18a] via-[#ead9a6] to-[#bfa869] opacity-95" />
                  <span className="absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.45),transparent_50%)]" />
                  <span className="relative text-black font-semibold">
                    View Details
                  </span>
                </Link>
              </div>
            </div>

            {/* bottom accent */}
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-amber-300/25 to-transparent" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllRecipes;