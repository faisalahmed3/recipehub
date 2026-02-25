import React from "react";
import { Link } from "react-router";
import { FiHome, FiArrowLeft } from "react-icons/fi";
import logo from "../../assets/RecipeHub.png";

const Error = () => {
  return (
    <div className="ivory-bg min-h-screen flex items-center justify-center px-4 sm:px-8 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-amber-300/10 rounded-full blur-[120px]" />
      <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[120px]" />

      <div className="relative w-full max-w-5xl">
        {/* Glass Card */}
        <div className="relative overflow-hidden rounded-[36px] border border-amber-400/15 bg-gradient-to-b from-black/70 via-black/55 to-black/35 backdrop-blur-2xl shadow-[0_40px_140px_rgba(0,0,0,0.85)] p-8 sm:p-12 text-center">
          
          {/* Top shine */}
          <div className="relative h-[2px] w-full overflow-hidden mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-300/60 to-transparent" />
            <div className="absolute -left-1/3 top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shine_4s_linear_infinite]" />
          </div>

          {/* Logo */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative">
              <div className="absolute -inset-3 rounded-3xl blur-xl opacity-40 bg-amber-300/30" />
              <img
                src={logo}
                alt="RecipeHub logo"
                className="relative w-20 sm:w-24 md:w-28"
              />
            </div>

            <h1 className="green font-extrabold text-4xl sm:text-5xl md:text-6xl mt-4 tracking-wide">
              RecipeHub
            </h1>
          </div>

          {/* 404 Title */}
          <h2 className="text-6xl sm:text-7xl md:text-8xl font-extrabold text-amber-200 drop-shadow-lg">
            404
          </h2>

          <p className="mt-4 text-amber-100/70 text-lg sm:text-xl max-w-2xl mx-auto">
            The page you’re looking for doesn’t exist or has been moved.
            Let’s get you back to something delicious.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/"
              className="relative inline-flex items-center gap-2 rounded-full px-8 py-3 text-sm sm:text-base font-semibold overflow-hidden"
              style={{ background: "transparent" }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#d6c18a] via-[#ead9a6] to-[#bfa869] opacity-95" />
              <span className="absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.45),transparent_50%)]" />
              <span className="relative text-black inline-flex items-center gap-2">
                <FiHome /> Back to Home
              </span>
            </Link>

            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 rounded-full px-8 py-3 text-sm sm:text-base font-semibold border border-amber-300/20 bg-black/25 text-amber-100 hover:bg-black/40 transition"
            >
              <FiArrowLeft /> Go Back
            </button>
          </div>

          {/* Bottom line */}
          <div className="mt-10 h-[1px] w-full bg-gradient-to-r from-transparent via-amber-300/25 to-transparent" />
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

export default Error;