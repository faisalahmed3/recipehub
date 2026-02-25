import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../providers/AuthProvider";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [error, setError] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;

    const email = form.email.value;
    const password = form.password.value;

    setError(null);

    login(email, password)
      .then(() => navigate(from, { replace: true }))
      .catch((err) => setError(err.message));
  };

  return (
    <div className="min-h-screen ivory-bg flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Outer glow wrapper */}
        <div className="relative">
          <div className="absolute -inset-1 rounded-[28px] blur-2xl opacity-30 bg-gradient-to-r from-amber-200/30 via-amber-400/20 to-amber-200/30"></div>

          <div className="relative card bg-base-100 shadow-2xl rounded-[28px] border border-amber-600/25 overflow-hidden">
            {/* Top accent bar */}
            <div className="h-[3px] w-full bg-gradient-to-r from-transparent via-amber-400/70 to-transparent"></div>

            <div className="card-body p-8 sm:p-10">
              {/* Title */}
              <div className="text-center">
                <p className="tracking-[0.25em] text-xs text-amber-200/80 uppercase mb-2">
                  Welcome back
                </p>
                <h1 className="text-4xl sm:text-5xl font-bold green">
                  Login
                </h1>
                <p className="mt-3 text-sm sm:text-base text-amber-100/70">
                  Access your recipes and continue cooking like a pro.
                </p>
              </div>

              {/* Divider */}
              <div className="mt-7 mb-6 flex items-center gap-3">
                <span className="h-px flex-1 bg-amber-600/20"></span>
                <span className="text-amber-300/60 text-xs tracking-widest">
                  SIGN IN
                </span>
                <span className="h-px flex-1 bg-amber-600/20"></span>
              </div>

              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label className="block mb-2 green font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="example@email.com"
                    className="input w-full rounded-sm px-2.5"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2 green font-medium">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    className="input w-full rounded-sm px-2.5"
                    
                    required
                  />
                </div>

                {error && (
                  <div className="rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-3">
                    <p className="text-red-300 text-sm">{error}</p>
                  </div>
                )}

                <button type="submit" className="btn golden-bg w-full btn-hv mt-2 rounded-sm">
                  Login
                </button>
              </form>

              {/* Bottom */}
              <div className="mt-7 text-center">
                <p className="text-sm text-amber-100/70">
                  Don’t have an account?{" "}
                  <Link
                    to="/register"
                    className="text-amber-300 font-semibold hover:underline"
                  >
                    Register Now
                  </Link>
                </p>
              </div>

              {/* Subtle footer note */}
              <p className="mt-6 text-center text-xs text-amber-100/50">
                RecipeHub • Where every dish tells a story
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;