import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../providers/AuthProvider";
import { updateProfile } from "firebase/auth";

const Register = () => {
  const { register } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;

    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;

    try {
      setError(null);

      const result = await register(email, password);
      const user = result.user;

      await updateProfile(user, {
        displayName: name,
        photoURL: photo,
      });

      navigate("/");
    } catch (err) {
      setError(err.message);
    }
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
                  Join RecipeHub
                </p>
                <h1 className="text-4xl sm:text-5xl font-bold green">
                  Register
                </h1>
                <p className="mt-3 text-sm sm:text-base text-amber-100/70">
                  Create your account and start saving your favorite recipes.
                </p>
              </div>

              {/* Divider */}
              <div className="mt-7 mb-6 flex items-center gap-3">
                <span className="h-px flex-1 bg-amber-600/20"></span>
                <span className="text-amber-300/60 text-xs tracking-widest">
                  SIGN UP
                </span>
                <span className="h-px flex-1 bg-amber-600/20"></span>
              </div>

              <form onSubmit={handleRegister} className="space-y-5">
                <div>
                  <label className="block mb-2 green font-medium">Name</label>
                  <input
                    type="text"
                    name="name"
                    className="input w-full rounded-sm px-2.5"
                    placeholder="Your name"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2 green font-medium">
                    Photo URL
                  </label>
                  <input
                    type="text"
                    name="photo"
                    className="input w-full rounded-sm px-2.5"
                    placeholder="https://..."
                    defaultValue="https://i.ibb.co/5hfH60nw/shutterstock-2480850611.jpg"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2 green font-medium">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="input w-full rounded-sm px-2.5"
                    placeholder="yourname@email.com"
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
                    className="input w-full rounded-sm px-2.5"
                    placeholder="••••••••"
                    required
                  />
                </div>

                {error && (
                  <div className="rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-3">
                    <p className="text-red-300 text-sm">{error}</p>
                  </div>
                )}

                <button type="submit" className="btn golden-bg w-full btn-hv mt-2 rounded-sm">
                  Register
                </button>
              </form>

              {/* Bottom */}
              <div className="mt-7 text-center">
                <p className="text-sm text-amber-100/70">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-amber-300 font-semibold hover:underline "
                  >
                    Login Now
                  </Link>
                </p>
              </div>

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

export default Register;