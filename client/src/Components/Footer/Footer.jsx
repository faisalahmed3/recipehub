import React from "react";
import { Link } from "react-router";
import { FaFacebook, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import { HiOutlineMail, HiOutlineLocationMarker } from "react-icons/hi";
import logo from "../../assets/RecipeHub.png";

const Footer = () => {
  return (
    <footer className="relative ivory-bg border-t border-amber-400/20">
      {/* soft glow */}
      <div className="pointer-events-none absolute inset-x-0 -top-10 h-24 bg-gradient-to-b from-amber-300/10 via-transparent to-transparent blur-2xl" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(214,193,138,0.08),transparent_60%)]" />

      <div className="relative lg:mx-28 px-6 md:px-10 py-12">
        {/* top accent line */}
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-amber-300/50 to-transparent" />

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute -inset-3 rounded-2xl blur-2xl opacity-30 bg-amber-300/30" />
                <img
                  src={logo}
                  alt="RecipeHub Logo"
                  className="relative w-14 sm:w-16 rounded-2xl ring-1 ring-amber-300/25"
                />
              </div>
              <div>
                <h1 className="green font-extrabold text-2xl sm:text-3xl tracking-tight">
                  RecipeHub
                </h1>
                <p className="text-amber-100/60 text-sm">
                  Crafted recipes, premium taste.
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-3 text-sm text-amber-100/70">
              <p className="flex items-center justify-center md:justify-start gap-2">
                <HiOutlineMail className="text-amber-300/70 text-lg" />
                <span>support@RecipeHub.app</span>
              </p>
              <p className="flex items-center justify-center md:justify-start gap-2">
                <HiOutlineLocationMarker className="text-amber-300/70 text-lg" />
                <span>Chattogram, Bangladesh</span>
              </p>
            </div>
          </div>

          {/* Links */}
          <div className="text-center md:text-left">
            <h2 className="text-amber-50 font-extrabold text-lg mb-4">
              Explore
            </h2>

            <nav className="flex flex-col gap-3 raleway">
              {[
                { to: "/", label: "Home" },
                { to: "/all-recipes", label: "All Recipes" },
                { to: "/my-recipes", label: "My Recipes" },
                { to: "/add-recipe", label: "Add Recipe" },
              ].map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="group inline-flex items-center justify-center md:justify-start gap-2 text-amber-100/75 hover:text-amber-200 transition"
                >
                  <span className="h-[6px] w-[6px] rounded-full bg-amber-300/40 group-hover:bg-amber-300/70 transition" />
                  <span className="relative">
                    {item.label}
                    <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-gradient-to-r from-amber-300/60 to-transparent group-hover:w-full transition-all duration-300" />
                  </span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Social */}
          <div className="text-center md:text-left">
            <h2 className="text-amber-50 font-extrabold text-lg mb-4">
              Follow
            </h2>

            <div className="flex justify-center md:justify-start gap-4">
              {[
                {
                  href: "https://www.facebook.com/faisal.ahmed.58115",
                  icon: <FaFacebook />,
                  label: "Facebook",
                },
                {
                  href: "https://www.instagram.com/_faisal_ahmed132/",
                  icon: <FaInstagram />,
                  label: "Instagram",
                },
                {
                  href: "https://www.linkedin.com/in/faisal-ahmed4417/",
                  icon: <FaLinkedin />,
                  label: "LinkedIn",
                },
                {
                  href: "https://github.com/faisalahmed3",
                  icon: <FaGithub />,
                  label: "GitHub",
                },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="group w-11 h-11 rounded-2xl grid place-items-center
                             border border-amber-300/20 bg-black/30 backdrop-blur
                             shadow-[0_18px_50px_rgba(0,0,0,0.6)]
                             hover:border-amber-300/45 hover:bg-amber-300/10 transition"
                >
                  <span className="text-xl text-amber-100/80 group-hover:text-amber-200 transition">
                    {s.icon}
                  </span>
                </a>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-amber-300/15 bg-black/25 p-4 text-sm text-amber-100/65">
              New recipes every week. Save favorites, cook smarter.
            </div>
          </div>
        </div>

        {/* bottom */}
        <div className="mt-12">
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-amber-300/25 to-transparent" />
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-amber-100/60">
            <p className="lato">
              © {new Date().getFullYear()} RecipeHub — All rights reserved
            </p>
            <div className="flex items-center gap-3">
              <span className="text-amber-300/40">•</span>
              <span className="hover:text-amber-200 transition cursor-pointer">
                Privacy
              </span>
              <span className="text-amber-300/40">•</span>
              <span className="hover:text-amber-200 transition cursor-pointer">
                Terms
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;