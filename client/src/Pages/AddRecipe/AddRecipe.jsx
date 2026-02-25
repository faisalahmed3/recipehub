import React, { useContext, useMemo, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProvider";
import {
  FiImage,
  FiType,
  FiList,
  FiAlignLeft,
  FiGlobe,
  FiClock,
  FiYoutube,
  FiTag,
  FiThumbsUp,
  FiPlusCircle,
} from "react-icons/fi";

const AddRecipe = () => {
  const { user } = useContext(AuthContext);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const categories = useMemo(
    () => ["Breakfast", "Lunch", "Dinner", "Dessert", "Vegan"],
    []
  );

  const handleToggleCategory = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const extractYouTubeEmbedUrl = (url) => {
    try {
      const match = url?.match(
        /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/
      );
      return match ? `https://www.youtube.com/embed/${match[1]}` : null;
    } catch {
      return null;
    }
  };

  const handleAddRecipe = async (e) => {
    e.preventDefault();

    const form = e.target;
    const image = form.image.value.trim();
    const title = form.title.value.trim();
    const ingredients = form.ingredients.value.trim();
    const instructions = form.instructions.value.trim();
    const cuisine = form.cuisine.value;
    const prepTime = form.prepTime.value;
    const video = form.video.value.trim();

    const newRecipe = {
      image,
      title,
      ingredients,
      instructions,
      cuisine,
      prepTime: parseInt(prepTime, 10),
      categories: selectedCategories,
      video,
      likeCount: 0,
      userEmail: user?.email || "anonymous",
    };

    try {
      const res = await fetch("https://savorly-sever.vercel.app/recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRecipe),
      });

      const data = await res.json();

      if (data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Recipe added!",
          text: "Your recipe is live now.",
          confirmButtonColor: "#d6c18a",
          background: "#0b0b0b",
          color: "#f4f1e8",
        });
        form.reset();
        setSelectedCategories([]);
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to add recipe",
          text: "Please try again.",
          confirmButtonColor: "#dc2626",
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: err.message || "Something went wrong!",
        confirmButtonColor: "#dc2626",
      });
    }
  };

  // lightweight preview (optional)
  const [videoPreview, setVideoPreview] = useState(null);
  const handleVideoPreview = (e) => {
    const url = e.target.value;
    setVideoPreview(extractYouTubeEmbedUrl(url));
  };

  return (
    <div className="ivory-bg raleway min-h-screen pt-28 pb-16 px-4 sm:px-8 lg:px-20">
      <div className="max-w-5xl mx-auto">
        {/* Title */}
        <div className="text-center mb-10">
          <h1 className="green font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-wide">
            Add a New Recipe
          </h1>
          <p className="mt-3 text-amber-100/60">
            Clean inputs, premium look. Submit once, cook forever.
          </p>
          <div className="mt-5 h-[2px] w-28 mx-auto bg-gradient-to-r from-transparent via-amber-300/60 to-transparent" />
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Form */}
          <div className="lg:col-span-2">
            <div className="relative overflow-hidden rounded-[28px] border border-amber-400/15 bg-gradient-to-b from-black/60 via-black/40 to-black/20 backdrop-blur-2xl shadow-[0_30px_110px_rgba(0,0,0,0.78)]">
              {/* top shine */}
              <div className="relative h-[2px] w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-300/55 to-transparent" />
                <div className="absolute -left-1/3 top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shine_3.8s_linear_infinite]" />
              </div>

              <form onSubmit={handleAddRecipe} className="p-6 sm:p-8 space-y-6">
                {/* Image URL */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-amber-100/80 font-semibold">
                    <FiImage className="text-amber-300/80" /> Image URL
                  </label>
                  <input
                    type="text"
                    name="image"
                    required
                    placeholder="Paste image link (jpg/png/webp)"
                    className="w-full rounded-2xl border border-amber-300/15 bg-black/25 px-4 py-3 text-amber-50 placeholder:text-amber-100/40 focus:outline-none focus:ring-2 focus:ring-amber-300/40"
                  />
                  <p className="text-xs text-amber-100/45">
                    Tip: use a high-res food photo for best results.
                  </p>
                </div>

                {/* Title */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-amber-100/80 font-semibold">
                    <FiType className="text-amber-300/80" /> Recipe Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    required
                    placeholder="e.g., Smoky Chicken Biryani"
                    className="w-full rounded-2xl border border-amber-300/15 bg-black/25 px-4 py-3 text-amber-50 placeholder:text-amber-100/40 focus:outline-none focus:ring-2 focus:ring-amber-300/40"
                  />
                </div>

                {/* Ingredients */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-amber-100/80 font-semibold">
                    <FiList className="text-amber-300/80" /> Ingredients
                  </label>
                  <textarea
                    rows="3"
                    name="ingredients"
                    required
                    placeholder="List ingredients separated by commas"
                    className="w-full rounded-2xl border border-amber-300/15 bg-black/25 px-4 py-3 text-amber-50 placeholder:text-amber-100/40 focus:outline-none focus:ring-2 focus:ring-amber-300/40"
                  />
                </div>

                {/* Instructions */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-amber-100/80 font-semibold">
                    <FiAlignLeft className="text-amber-300/80" /> Instructions
                  </label>
                  <textarea
                    rows="5"
                    name="instructions"
                    required
                    placeholder="Write step-by-step instructions"
                    className="w-full rounded-2xl border border-amber-300/15 bg-black/25 px-4 py-3 text-amber-50 placeholder:text-amber-100/40 focus:outline-none focus:ring-2 focus:ring-amber-300/40"
                  />
                </div>

                {/* Cuisine + Prep */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-amber-100/80 font-semibold">
                      <FiGlobe className="text-amber-300/80" /> Cuisine
                    </label>
                    <select
                      name="cuisine"
                      required
                      className="w-full rounded-2xl border border-amber-300/15 bg-black/25 px-4 py-3 text-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-300/40"
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select cuisine
                      </option>
                      <option value="Italian">Italian</option>
                      <option value="Mexican">Mexican</option>
                      <option value="Indian">Indian</option>
                      <option value="Chinese">Chinese</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-amber-100/80 font-semibold">
                      <FiClock className="text-amber-300/80" /> Prep Time (min)
                    </label>
                    <input
                      type="number"
                      name="prepTime"
                      required
                      min={1}
                      placeholder="e.g., 30"
                      className="w-full rounded-2xl border border-amber-300/15 bg-black/25 px-4 py-3 text-amber-50 placeholder:text-amber-100/40 focus:outline-none focus:ring-2 focus:ring-amber-300/40"
                    />
                  </div>
                </div>

                {/* Video */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-amber-100/80 font-semibold">
                    <FiYoutube className="text-amber-300/80" /> YouTube Video
                    (optional)
                  </label>
                  <input
                    type="text"
                    name="video"
                    placeholder="https://www.youtube.com/watch?v=xxxxx"
                    onChange={handleVideoPreview}
                    className="w-full rounded-2xl border border-amber-300/15 bg-black/25 px-4 py-3 text-amber-50 placeholder:text-amber-100/40 focus:outline-none focus:ring-2 focus:ring-amber-300/40"
                  />
                  <p className="text-xs text-amber-100/45">
                    Works with youtube.com/watch?v=… or youtu.be/…
                  </p>
                </div>

                {/* Categories */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-amber-100/80 font-semibold">
                    <FiTag className="text-amber-300/80" /> Categories
                  </label>

                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => {
                      const active = selectedCategories.includes(cat);
                      return (
                        <button
                          type="button"
                          key={cat}
                          onClick={() => handleToggleCategory(cat)}
                          className={[
                            "rounded-full px-4 py-2 text-sm font-semibold border transition",
                            active
                              ? "bg-amber-300/15 text-amber-100 border-amber-300/30"
                              : "bg-black/20 text-amber-100/65 border-amber-300/15 hover:border-amber-300/30 hover:bg-black/30",
                          ].join(" ")}
                        >
                          {cat}
                        </button>
                      );
                    })}
                  </div>

                  <p className="text-xs text-amber-100/45">
                    Selected:{" "}
                    <span className="text-amber-100/70">
                      {selectedCategories.length
                        ? selectedCategories.join(", ")
                        : "None"}
                    </span>
                  </p>
                </div>

                {/* Like Count (read-only) */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-amber-100/80 font-semibold">
                    <FiThumbsUp className="text-amber-300/80" /> Like Count
                  </label>
                  <input
                    type="number"
                    value={0}
                    readOnly
                    className="w-full rounded-2xl border border-amber-300/10 bg-black/20 px-4 py-3 text-amber-100/60 cursor-not-allowed"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="relative w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full px-8 py-3 font-semibold overflow-hidden"
                  style={{ background: "transparent" }}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-[#d6c18a] via-[#ead9a6] to-[#bfa869] opacity-95" />
                  <span className="absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.45),transparent_50%)]" />
                  <span className="relative text-black inline-flex items-center gap-2">
                    <FiPlusCircle /> Add Recipe
                  </span>
                </button>
              </form>

              <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-amber-300/25 to-transparent" />
            </div>
          </div>

          {/* Right: Preview Card */}
          <aside className="lg:col-span-1">
            <div className="rounded-[28px] border border-amber-400/15 bg-black/35 backdrop-blur-xl shadow-[0_25px_90px_rgba(0,0,0,0.72)] overflow-hidden sticky top-28">
              <div className="px-6 py-5 border-b border-amber-300/15">
                <h3 className="text-xl font-extrabold text-amber-50">
                  Preview
                </h3>
                <p className="text-sm text-amber-100/55 mt-1">
                  Optional video preview if the link is valid.
                </p>
              </div>

              <div className="p-6 space-y-4">
                <div className="rounded-3xl border border-amber-300/10 bg-black/20 p-4">
                  <p className="text-amber-100/70 text-sm">
                    Posted by:{" "}
                    <span className="text-amber-50 font-semibold">
                      {user?.email || "anonymous"}
                    </span>
                  </p>
                </div>

                <div className="rounded-3xl border border-amber-300/10 bg-black/20 overflow-hidden">
                  {videoPreview ? (
                    <div className="aspect-video">
                      <iframe
                        className="w-full h-full"
                        src={videoPreview}
                        title="YouTube preview"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    <div className="p-6 text-center text-amber-100/55">
                      Add a YouTube link to see a preview here.
                    </div>
                  )}
                </div>

                <div className="rounded-3xl border border-amber-300/10 bg-black/20 p-4">
                  <p className="text-amber-100/60 text-sm leading-relaxed">
                    Keep instructions readable:
                    <span className="block mt-2 text-amber-100/75">
                      Use short steps, add timings, and mention heat level.
                    </span>
                  </p>
                </div>
              </div>

              <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-amber-300/25 to-transparent" />
            </div>
          </aside>
        </div>
      </div>

      <style>{`
        @keyframes shine {
          0% { transform: translateX(0); }
          100% { transform: translateX(220%); }
        }
      `}</style>
    </div>
  );
};

export default AddRecipe;