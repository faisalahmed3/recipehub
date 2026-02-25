import React, { useContext } from "react";
import { Link, NavLink } from "react-router";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { FiLogIn, FiUserPlus, FiLogOut } from "react-icons/fi";
import { IoSparklesOutline } from "react-icons/io5";
import logo from "../../assets/RecipeHub.png";
import { AuthContext } from "../../providers/AuthProvider";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout()
      .then(() => console.log("Logged out successfully"))
      .catch((err) => console.error(err));
  };

  const getLink = (page) => (user ? page : "/login");

  const navLinkClass = ({ isActive }) =>
    `px-3 py-2 rounded-xl transition-all duration-200 whitespace-nowrap
     ${
       isActive
         ? "text-amber-200 bg-amber-300/10"
         : "text-amber-100/75 hover:text-amber-200 hover:bg-amber-300/10"
     }`;

  const navItems = (
    <>
      <li>
        <NavLink to="/" className={navLinkClass}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/all-recipes" className={navLinkClass}>
          All Recipes
        </NavLink>
      </li>
      <li>
        <NavLink to={getLink("/my-recipes")} className={navLinkClass}>
          My Recipes
        </NavLink>
      </li>
      <li>
        <NavLink to={getLink("/add-recipe")} className={navLinkClass}>
          Add Recipe
        </NavLink>
      </li>
    </>
  );

  return (
    <header className="fixed top-0 left-0 w-full z-[500]">
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/70 via-black/40 to-transparent pointer-events-none" />

      <div className="mx-auto w-full px-4 md:px-10 lg:px-20">
        <div className="relative mt-3 rounded-2xl overflow-hidden">
          {/* glow border */}
          <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-amber-200/20 via-amber-400/10 to-amber-200/20 blur-lg opacity-60 pointer-events-none" />

          {/* glass body */}
          <div className="relative rounded-2xl border border-amber-400/15 bg-gradient-to-b from-black/75 via-black/60 to-black/45 backdrop-blur-2xl shadow-[0_22px_80px_rgba(0,0,0,0.75)]">
            {/* shine line */}
            <div className="relative h-[2px] w-full overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-300/60 to-transparent" />
              <div className="absolute -left-1/3 top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-[shine_3.8s_linear_infinite]" />
            </div>

            {/* REAL FIX: use a flex row ourselves */}
            <div className="flex items-center justify-between gap-4 px-3 sm:px-5 min-h-[72px]">
              {/* LEFT: brand */}
              <div className="flex items-center gap-3 min-w-0">
                {/* mobile menu */}
                <div className="dropdown lg:hidden">
                  <label
                    tabIndex={0}
                    className="btn btn-ghost px-2 text-amber-100 hover:bg-amber-300/10"
                  >
                    <HiOutlineMenuAlt3 className="text-2xl" />
                  </label>

                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content mt-3 z-[999]
                           w-56 rounded-2xl bg-black/90 backdrop-blur-xl
                           border border-amber-400/15 shadow-[0_25px_80px_rgba(0,0,0,0.75)] p-2"
                  >
                    {navItems}
                  </ul>
                </div>

                <Link to="/" className="flex items-center gap-3 group min-w-0">
                  <div className="relative">
                    <div className="absolute -inset-2 rounded-2xl blur-xl opacity-30 bg-amber-300/40 group-hover:opacity-50 transition" />
                    <div className="relative rounded-2xl p-[2px] bg-gradient-to-br from-amber-200/40 via-amber-400/20 to-transparent">
                      <img
                        src={logo}
                        alt="RecipeHub logo"
                        className="w-10 sm:w-11 md:w-12 rounded-2xl bg-black/40 ring-1 ring-amber-300/25 group-hover:ring-amber-300/60 transition duration-300 group-hover:scale-[1.03]"
                      />
                    </div>
                  </div>

                  <div className="leading-tight min-w-0">
                    <h1 className="flex items-center gap-2 text-xl sm:text-2xl font-extrabold text-amber-50 tracking-wide truncate">
                      RecipeHub
                      <IoSparklesOutline className="text-amber-300/70 hidden sm:block" />
                    </h1>
                    <p className="text-[11px] sm:text-xs text-amber-100/60 truncate">
                      Crafted recipes, premium taste
                    </p>
                  </div>
                </Link>
              </div>

              {/* CENTER: menu (desktop) */}
              <nav className="hidden lg:block">
                <ul className="menu menu-horizontal flex flex-row items-center gap-1 font-semibold">
                  {navItems}
                </ul>
              </nav>

              {/* RIGHT: actions */}
              <div className="flex items-center gap-2 shrink-0">
                {!user ? (
                  <>
                    <Link
                      to="/login"
                      className="relative btn border-0 px-5 text-sm font-semibold rounded-full overflow-hidden"
                      style={{ background: "transparent" }}
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-[#d6c18a] via-[#ead9a6] to-[#bfa869] opacity-95" />
                      <span className="absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.45),transparent_50%)]" />
                      <span className="relative text-black inline-flex items-center gap-2">
                        <FiLogIn /> Login
                      </span>
                    </Link>

                    <Link
                      to="/register"
                      className="btn rounded-full px-5 text-sm bg-amber-300/10 hover:bg-amber-300/15 text-amber-100 border border-amber-400/20"
                    >
                      <span className="inline-flex items-center gap-2">
                        <FiUserPlus /> Register
                      </span>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/dashboard" className="flex items-center">
                      {user.photoURL ? (
                        <img
                          src={user.photoURL}
                          alt="User"
                          className="w-10 h-10 rounded-full object-cover ring-2 ring-amber-300/30 hover:ring-amber-300/70 transition"
                          title={user.displayName || "User"}
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-amber-300/15 border border-amber-300/20 flex items-center justify-center text-amber-100 font-bold">
                          {user?.email?.[0]?.toUpperCase()}
                        </div>
                      )}
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="relative btn border-0 px-5 text-sm font-semibold rounded-full overflow-hidden"
                      style={{ background: "transparent" }}
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-[#d6c18a] via-[#ead9a6] to-[#bfa869] opacity-95" />
                      <span className="absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.45),transparent_50%)]" />
                      <span className="relative text-black inline-flex items-center gap-2">
                        <FiLogOut /> Log Out
                      </span>
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-amber-300/25 to-transparent" />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shine {
          0% { transform: translateX(0); }
          100% { transform: translateX(220%); }
        }
      `}</style>
    </header>
  );
};

export default Navbar;