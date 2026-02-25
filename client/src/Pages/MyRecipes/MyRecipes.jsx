import React, { useContext, useEffect, useMemo, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import Loading from "../../Components/Loading/Loading";
import {
  FiTrash2,
  FiEdit3,
  FiX,
  FiSearch,
  FiClock,
  FiHeart,
  FiTag,
  FiGlobe,
  FiImage,
  FiType,
  FiList,
  FiAlignLeft,
} from "react-icons/fi";

const MyRecipes = () => {
  const { user } = useContext(AuthContext);

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // UI: search + filter (optional but makes it feel premium)
  const [query, setQuery] = useState("");
  const [cuisine, setCuisine] = useState("All");

  useEffect(() => {
    const fetchUserRecipes = async () => {
      try {
        const res = await fetch(
          `https://savorly-sever.vercel.app/my-recipes?email=${user.email}`
        );
        const data = await res.json();
        setRecipes(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching user recipes:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) fetchUserRecipes();
  }, [user]);

  const cuisineTypes = useMemo(() => {
    const set = new Set(recipes.map((r) => r?.cuisine).filter(Boolean));
    return ["All", ...Array.from(set)];
  }, [recipes]);

  const filtered = useMemo(() => {
    let list = recipes;

    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter((r) => (r?.title || "").toLowerCase().includes(q));
    }
    if (cuisine !== "All") {
      list = list.filter((r) => r?.cuisine === cuisine);
    }
    return list;
  }, [recipes, query, cuisine]);

  const closeModal = () => {
    setShowModal(false);
    setSelectedRecipe(null);
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete this recipe?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#d6c18a",
      confirmButtonText: "Yes, delete",
      background: "#0b0b0b",
      color: "#f4f1e8",
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await fetch(
        `https://savorly-sever.vercel.app/recipes/${id}?email=${user.email}`,
        { method: "DELETE" }
      );
      const result = await res.json();

      if (result.success) {
        Swal.fire({
          title: "Deleted!",
          text: result.message || "Recipe removed.",
          icon: "success",
          confirmButtonColor: "#d6c18a",
          background: "#0b0b0b",
          color: "#f4f1e8",
        });
        setRecipes((prev) => prev.filter((r) => r._id !== id));
      } else {
        Swal.fire({
          title: "Error",
          text: result.message || "Failed to delete.",
          icon: "error",
          confirmButtonColor: "#dc2626",
        });
      }
    } catch (err) {
      console.error("Delete error:", err);
      Swal.fire({
        title: "Error",
        text: "Something went wrong.",
        icon: "error",
        confirmButtonColor: "#dc2626",
      });
    }
  };

  const handleUpdate = (recipe) => {
    setSelectedRecipe(recipe);
    setShowModal(true);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedRecipe = {
      title: form.title.value.trim(),
      image: form.image.value.trim(),
      ingredients: form.ingredients.value.trim(),
      instructions: form.instructions.value.trim(),
      cuisine: form.cuisine.value.trim(),
      prepTime: Number(form.prepTime.value),
      category: form.category.value.trim(),
    };

    try {
      const res = await fetch(
        `https://savorly-sever.vercel.app/recipes/${selectedRecipe._id}?email=${user.email}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedRecipe),
        }
      );
      const result = await res.json();

      if (result.success) {
        Swal.fire({
          title: "Updated!",
          text: result.message || "Recipe updated successfully.",
          icon: "success",
          confirmButtonColor: "#d6c18a",
          background: "#0b0b0b",
          color: "#f4f1e8",
        });

        setRecipes((prev) =>
          prev.map((r) =>
            r._id === selectedRecipe._id ? { ...r, ...updatedRecipe } : r
          )
        );
        closeModal();
      } else {
        Swal.fire({
          title: "Error",
          text: result.message || "Failed to update.",
          icon: "error",
          confirmButtonColor: "#dc2626",
        });
      }
    } catch (err) {
      console.error("Update error:", err);
      Swal.fire({
        title: "Error",
        text: "Something went wrong.",
        icon: "error",
        confirmButtonColor: "#dc2626",
      });
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="ivory-bg min-h-screen pt-28 pb-20 px-4 sm:px-8 lg:px-16 lato">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="green font-extrabold text-3xl sm:text-4xl md:text-5xl raleway tracking-wide">
            My Recipes
          </h1>
          <p className="mt-3 text-amber-100/60">
            Bigger cards, clearer details, cleaner actions.
          </p>
          <div className="mt-5 h-[2px] w-28 mx-auto bg-gradient-to-r from-transparent via-amber-300/60 to-transparent" />
        </div>

        {/* Controls */}
        <div className="mb-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-300/70 text-lg" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by recipe title..."
              className="w-full rounded-2xl border border-amber-300/15 bg-black/25 px-11 py-3 text-amber-50 placeholder:text-amber-100/40 focus:outline-none focus:ring-2 focus:ring-amber-300/40"
            />
          </div>

          <select
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
            className="w-full rounded-2xl border border-amber-300/15 bg-black/25 px-4 py-3 text-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-300/40"
          >
            {cuisineTypes.map((t) => (
              <option key={t} value={t} className="bg-black">
                {t}
              </option>
            ))}
          </select>
        </div>

        {/* Empty */}
        {filtered.length === 0 ? (
          <div className="rounded-[28px] border border-amber-300/15 bg-black/25 backdrop-blur-xl p-10 text-center shadow-[0_25px_90px_rgba(0,0,0,0.65)]">
            <p className="text-amber-100/70 text-lg">
              You haven’t added any recipes yet.
            </p>
            <p className="text-amber-100/45 mt-2">
              Add one and it will show up here instantly.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
            {filtered.map((recipe) => (
              <div
                key={recipe._id}
                className="relative overflow-hidden rounded-[34px] border border-amber-400/15 bg-gradient-to-b from-black/65 via-black/45 to-black/25 backdrop-blur-2xl shadow-[0_35px_120px_rgba(0,0,0,0.8)]"
              >
                {/* glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-200/10 via-amber-400/5 to-amber-200/10 blur-2xl opacity-60 pointer-events-none" />

                {/* Top image bigger */}
                <div className="relative">
                  <img
                    src={recipe.image || "https://via.placeholder.com/1000x700"}
                    alt={recipe.title}
                    className="w-full h-56 sm:h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />

                  {/* pill row */}
                  <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/15 bg-black/50 px-3.5 py-1.5 text-xs sm:text-sm text-amber-100/85">
                      <FiGlobe className="text-amber-300/80" />
                      {recipe.cuisine || "N/A"}
                    </span>

                    <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/15 bg-black/50 px-3.5 py-1.5 text-xs sm:text-sm text-amber-100/85">
                      <FiClock className="text-amber-300/80" />
                      {recipe.prepTime || 0} min
                    </span>

                    <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/15 bg-black/50 px-3.5 py-1.5 text-xs sm:text-sm text-amber-100/85">
                      <FiHeart className="text-amber-300/80" />
                      {recipe.likeCount || 0}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="relative p-6 sm:p-7 space-y-4">
                  <h2 className="text-2xl sm:text-3xl font-extrabold raleway text-amber-50 leading-tight">
                    {recipe.title}
                  </h2>

                  <div className="flex flex-wrap items-center gap-2 text-sm sm:text-base text-amber-100/70">
                    <span className="inline-flex items-center gap-2">
                      <FiTag className="text-amber-300/80" />
                      {recipe.category || "General"}
                    </span>
                  </div>

                  {/* Details - BIG + readable */}
                  <div className="grid gap-3 text-sm sm:text-base text-amber-100/65">
                    <p className="leading-relaxed">
                      <span className="text-amber-100/90 font-semibold">
                        Ingredients:
                      </span>{" "}
                      <span className="text-amber-100/75">
                        {recipe.ingredients}
                      </span>
                    </p>

                    <p className="leading-relaxed">
                      <span className="text-amber-100/90 font-semibold">
                        Instructions:
                      </span>{" "}
                      <span className="text-amber-100/75 line-clamp-3">
                        {recipe.instructions}
                      </span>
                    </p>
                  </div>

                  {/* Actions - bigger */}
                  <div className="pt-2 flex items-center justify-between gap-3">
                    <button
                      onClick={() => handleDelete(recipe._id)}
                      className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm sm:text-base font-semibold border border-red-500/25 bg-red-500/10 text-red-200 hover:bg-red-500/15 transition"
                    >
                      <FiTrash2 /> Delete
                    </button>

                    <button
                      onClick={() => handleUpdate(recipe)}
                      className="relative inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm sm:text-base font-semibold overflow-hidden"
                      style={{ background: "transparent" }}
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-[#d6c18a] via-[#ead9a6] to-[#bfa869] opacity-95" />
                      <span className="absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.45),transparent_50%)]" />
                      <span className="relative text-black inline-flex items-center gap-2">
                        <FiEdit3 /> Update
                      </span>
                    </button>
                  </div>
                </div>

                <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-amber-300/25 to-transparent" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Update Modal */}
      {showModal && selectedRecipe && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center px-4"
          role="dialog"
          aria-modal="true"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />

          <div className="relative w-full max-w-2xl overflow-hidden rounded-[28px] border border-amber-400/15 bg-gradient-to-b from-black/70 via-black/55 to-black/35 shadow-[0_35px_120px_rgba(0,0,0,0.85)]">
            {/* top shine */}
            <div className="relative h-[2px] w-full overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-300/60 to-transparent" />
              <div className="absolute -left-1/3 top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shine_3.8s_linear_infinite]" />
            </div>

            <div className="p-6 sm:p-8">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-amber-50">
                    Update Recipe
                  </h2>
                  <p className="text-amber-100/55 mt-1">
                    Clean edits. Premium look.
                  </p>
                </div>

                <button
                  onClick={closeModal}
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-amber-300/15 bg-black/30 text-amber-100 hover:bg-black/40 transition"
                  aria-label="Close"
                >
                  <FiX className="text-xl" />
                </button>
              </div>

              <form onSubmit={handleUpdateSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-amber-100/80 font-semibold">
                      <FiType className="text-amber-300/80" /> Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      defaultValue={selectedRecipe.title}
                      required
                      className="w-full rounded-2xl border border-amber-300/15 bg-black/25 px-4 py-3 text-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-300/40"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-amber-100/80 font-semibold">
                      <FiImage className="text-amber-300/80" /> Image URL
                    </label>
                    <input
                      type="text"
                      name="image"
                      defaultValue={selectedRecipe.image}
                      className="w-full rounded-2xl border border-amber-300/15 bg-black/25 px-4 py-3 text-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-300/40"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-amber-100/80 font-semibold">
                    <FiList className="text-amber-300/80" /> Ingredients
                  </label>
                  <textarea
                    name="ingredients"
                    defaultValue={selectedRecipe.ingredients}
                    required
                    rows={3}
                    className="w-full rounded-2xl border border-amber-300/15 bg-black/25 px-4 py-3 text-amber-50 resize-none focus:outline-none focus:ring-2 focus:ring-amber-300/40"
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-amber-100/80 font-semibold">
                    <FiAlignLeft className="text-amber-300/80" /> Instructions
                  </label>
                  <textarea
                    name="instructions"
                    defaultValue={selectedRecipe.instructions}
                    required
                    rows={4}
                    className="w-full rounded-2xl border border-amber-300/15 bg-black/25 px-4 py-3 text-amber-50 resize-none focus:outline-none focus:ring-2 focus:ring-amber-300/40"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-amber-100/80 font-semibold">
                      <FiGlobe className="text-amber-300/80" /> Cuisine
                    </label>
                    <input
                      type="text"
                      name="cuisine"
                      defaultValue={selectedRecipe.cuisine}
                      required
                      className="w-full rounded-2xl border border-amber-300/15 bg-black/25 px-4 py-3 text-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-300/40"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-amber-100/80 font-semibold">
                      <FiClock className="text-amber-300/80" /> Prep Time
                    </label>
                    <input
                      type="number"
                      name="prepTime"
                      defaultValue={selectedRecipe.prepTime}
                      required
                      min={1}
                      className="w-full rounded-2xl border border-amber-300/15 bg-black/25 px-4 py-3 text-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-300/40"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-amber-100/80 font-semibold">
                      <FiTag className="text-amber-300/80" /> Category
                    </label>
                    <input
                      type="text"
                      name="category"
                      defaultValue={selectedRecipe.category}
                      required
                      className="w-full rounded-2xl border border-amber-300/15 bg-black/25 px-4 py-3 text-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-300/40"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="rounded-full px-6 py-2 text-sm font-semibold border border-amber-300/15 bg-black/25 text-amber-100 hover:bg-black/35 transition"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="relative rounded-full px-7 py-2 text-sm font-semibold overflow-hidden"
                    style={{ background: "transparent" }}
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-[#d6c18a] via-[#ead9a6] to-[#bfa869] opacity-95" />
                    <span className="absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.45),transparent_50%)]" />
                    <span className="relative text-black">Save Changes</span>
                  </button>
                </div>
              </form>
            </div>

            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-amber-300/25 to-transparent" />
          </div>

          <style>{`
            @keyframes shine {
              0% { transform: translateX(0); }
              100% { transform: translateX(220%); }
            }
          `}</style>
        </div>
      )}
    </div>
  );
};

export default MyRecipes;