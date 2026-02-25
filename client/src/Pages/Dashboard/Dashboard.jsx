import React, { useContext, useEffect, useMemo, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Link } from "react-router";
import Loading from "../../Components/Loading/Loading";
import {
  GiCookingPot,
  GiSaltShaker,
  GiChefToque,
  GiStarsStack,
} from "react-icons/gi";
import { FiMail, FiArrowRight, FiHome } from "react-icons/fi";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({ totalItems: 0, myItems: 0 });
  const [loading, setLoading] = useState(true);

  const avatar = useMemo(() => {
    return user?.photoURL || `https://i.pravatar.cc/200?u=${user?.email || "user"}`;
  }, [user]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const allRes = await fetch("https://savorly-sever.vercel.app/recipes");
        const allData = await allRes.json();

        let myData = [];
        if (user?.email) {
          const myRes = await fetch(
            `https://savorly-sever.vercel.app/my-recipes?email=${user.email}`
          );
          myData = await myRes.json();
        }

        setStats({
          totalItems: Array.isArray(allData) ? allData.length : 0,
          myItems: Array.isArray(myData) ? myData.length : 0,
        });
      } catch (err) {
        console.error("Failed to fetch stats", err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) fetchStats();
  }, [user]);

  if (loading) return <Loading />;

  return (
    <div className="ivory-bg min-h-screen pt-28 pb-20 px-4 sm:px-8 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Hero Header */}
        <div className="relative overflow-hidden rounded-[34px] border border-amber-400/15 bg-gradient-to-b from-black/70 via-black/55 to-black/35 backdrop-blur-2xl shadow-[0_35px_120px_rgba(0,0,0,0.8)] p-7 sm:p-10 mb-10">
          {/* glow */}
          <div className="pointer-events-none absolute -inset-1 bg-gradient-to-r from-amber-200/10 via-amber-400/5 to-amber-200/10 blur-2xl opacity-60" />
          {/* top shine */}
          <div className="relative h-[2px] w-full overflow-hidden mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-300/60 to-transparent" />
            <div className="absolute -left-1/3 top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shine_3.8s_linear_infinite]" />
          </div>

          <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="min-w-0">
              <p className="inline-flex items-center gap-2 text-amber-100/70 text-sm sm:text-base">
                <GiChefToque className="text-amber-300/80 text-xl" />
                Dashboard
              </p>

              <h1 className="raleway green font-extrabold text-3xl sm:text-4xl md:text-5xl mt-2 leading-tight">
                Hey {user?.displayName || "Chef"}!{" "}
                <span className="text-amber-200">👨‍🍳</span>
              </h1>

              <p className="lato text-amber-100/60 mt-3 max-w-2xl">
                Let’s see what’s cooking in your kitchen. Track your recipes, explore
                the community, and keep building your collection.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/15 bg-black/35 px-4 py-2 text-amber-100/80">
                  <FiMail className="text-amber-300/80" />
                  <span className="truncate max-w-[240px] sm:max-w-none">
                    {user?.email}
                  </span>
                </span>

                <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/15 bg-black/35 px-4 py-2 text-amber-100/80">
                  <GiStarsStack className="text-amber-300/80" />
                  Premium dark theme
                </span>
              </div>
            </div>

            {/* Avatar card */}
            <div className="relative w-full lg:w-[320px] shrink-0">
              <div className="rounded-[28px] border border-amber-400/15 bg-black/30 backdrop-blur-xl p-6 shadow-[0_25px_90px_rgba(0,0,0,0.65)]">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="absolute -inset-2 rounded-full blur-xl opacity-35 bg-amber-300/35" />
                    <img
                      src={avatar}
                      alt="User"
                      className="relative w-16 h-16 rounded-full object-cover ring-2 ring-amber-300/30"
                    />
                  </div>

                  <div className="min-w-0">
                    <p className="text-amber-100/60 text-xs">Signed in as</p>
                    <h2 className="raleway text-amber-50 font-extrabold text-lg truncate">
                      {user?.displayName || "Anonymous Chef"}
                    </h2>
                    <p className="text-amber-100/55 text-xs truncate">
                      {user?.email}
                    </p>
                  </div>
                </div>

                <div className="mt-5 h-[1px] w-full bg-gradient-to-r from-transparent via-amber-300/25 to-transparent" />

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <Link
                    to="/all-recipes"
                    className="rounded-2xl border border-amber-300/15 bg-black/25 px-4 py-3 text-center hover:bg-black/35 transition"
                  >
                    <p className="text-amber-100/60 text-xs">Total</p>
                    <p className="text-amber-50 font-extrabold text-xl">
                      {stats.totalItems}
                    </p>
                  </Link>

                  <Link
                    to="/my-recipes"
                    className="rounded-2xl border border-amber-300/15 bg-black/25 px-4 py-3 text-center hover:bg-black/35 transition"
                  >
                    <p className="text-amber-100/60 text-xs">Mine</p>
                    <p className="text-amber-50 font-extrabold text-xl">
                      {stats.myItems}
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-7 h-[1px] w-full bg-gradient-to-r from-transparent via-amber-300/25 to-transparent" />
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {/* Total Recipes */}
          <Link to="/all-recipes" className="group">
            <div className="relative overflow-hidden rounded-[34px] border border-amber-400/15 bg-gradient-to-b from-black/65 via-black/45 to-black/25 backdrop-blur-2xl shadow-[0_35px_120px_rgba(0,0,0,0.8)] p-7 h-full">
              <div className="pointer-events-none absolute -inset-1 bg-gradient-to-r from-amber-200/10 via-amber-400/5 to-amber-200/10 blur-2xl opacity-50 group-hover:opacity-70 transition" />
              <div className="flex items-start justify-between gap-4 relative">
                <div>
                  <p className="text-amber-100/60 text-sm">Explore</p>
                  <h3 className="raleway text-amber-50 font-extrabold text-2xl mt-1">
                    Total Recipes
                  </h3>
                </div>

                <div className="rounded-2xl border border-amber-300/15 bg-black/25 p-3">
                  <GiCookingPot className="text-4xl text-amber-300/90 group-hover:rotate-6 transition-transform duration-300" />
                </div>
              </div>

              <div className="mt-6 relative">
                <p className="text-5xl font-extrabold green">{stats.totalItems}</p>
                <p className="text-amber-100/55 mt-2">
                  Shared by all users across the platform.
                </p>
              </div>

              <div className="mt-6 inline-flex items-center gap-2 text-amber-200 font-semibold">
                View all <FiArrowRight className="group-hover:translate-x-1 transition" />
              </div>

              <div className="mt-6 h-[1px] w-full bg-gradient-to-r from-transparent via-amber-300/25 to-transparent" />
            </div>
          </Link>

          {/* My Recipes */}
          <Link to="/my-recipes" className="group">
            <div className="relative overflow-hidden rounded-[34px] border border-amber-400/15 bg-gradient-to-b from-black/65 via-black/45 to-black/25 backdrop-blur-2xl shadow-[0_35px_120px_rgba(0,0,0,0.8)] p-7 h-full">
              <div className="pointer-events-none absolute -inset-1 bg-gradient-to-r from-amber-200/10 via-amber-400/5 to-amber-200/10 blur-2xl opacity-50 group-hover:opacity-70 transition" />

              <div className="flex items-start justify-between gap-4 relative">
                <div>
                  <p className="text-amber-100/60 text-sm">Manage</p>
                  <h3 className="raleway text-amber-50 font-extrabold text-2xl mt-1">
                    My Recipes
                  </h3>
                </div>

                <div className="rounded-2xl border border-amber-300/15 bg-black/25 p-3">
                  <GiSaltShaker className="text-4xl text-amber-300/90 group-hover:rotate-6 transition-transform duration-300" />
                </div>
              </div>

              <div className="mt-6 relative">
                <p className="text-5xl font-extrabold green">{stats.myItems}</p>
                <p className="text-amber-100/55 mt-2">
                  Crafted with love by you. Keep adding more.
                </p>
              </div>

              <div className="mt-6 inline-flex items-center gap-2 text-amber-200 font-semibold">
                Open mine <FiArrowRight className="group-hover:translate-x-1 transition" />
              </div>

              <div className="mt-6 h-[1px] w-full bg-gradient-to-r from-transparent via-amber-300/25 to-transparent" />
            </div>
          </Link>

          {/* Profile Quick Card */}
          <div className="relative overflow-hidden rounded-[34px] border border-amber-400/15 bg-gradient-to-b from-black/65 via-black/45 to-black/25 backdrop-blur-2xl shadow-[0_35px_120px_rgba(0,0,0,0.8)] p-7">
            <div className="pointer-events-none absolute -inset-1 bg-gradient-to-r from-amber-200/10 via-amber-400/5 to-amber-200/10 blur-2xl opacity-50" />
            <div className="relative">
              <p className="text-amber-100/60 text-sm">Profile</p>
              <h3 className="raleway text-amber-50 font-extrabold text-2xl mt-1">
                Chef Card
              </h3>

              <div className="mt-6 flex items-center gap-4">
                <div className="relative">
                  <div className="absolute -inset-2 rounded-full blur-xl opacity-35 bg-amber-300/35" />
                  <img
                    src={avatar}
                    alt="User"
                    className="relative w-16 h-16 rounded-full object-cover ring-2 ring-amber-300/30"
                  />
                </div>

                <div className="min-w-0">
                  <p className="text-amber-50 font-extrabold truncate">
                    {user?.displayName || "Anonymous Chef"}
                  </p>
                  <p className="text-amber-100/55 text-sm truncate">
                    {user?.email}
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-amber-300/15 bg-black/25 p-4">
                <p className="text-amber-100/60 text-sm">
                  Tip: Add a recipe video link. It boosts engagement.
                </p>
              </div>

              <div className="mt-6 h-[1px] w-full bg-gradient-to-r from-transparent via-amber-300/25 to-transparent" />
            </div>
          </div>
        </div>

        {/* Home button */}
        <div className="flex items-center justify-center mt-10">
          <Link
            to="/"
            className="relative inline-flex items-center gap-2 rounded-full px-8 py-3 text-sm sm:text-base font-semibold overflow-hidden"
            style={{ background: "transparent" }}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-[#d6c18a] via-[#ead9a6] to-[#bfa869] opacity-95" />
            <span className="absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.45),transparent_50%)]" />
            <span className="relative text-black inline-flex items-center gap-2">
              <FiHome /> Home Page
            </span>
          </Link>
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

export default Dashboard;