import React from "react";
import { GiCookingPot, GiSaltShaker, GiLemon, GiKnifeFork } from "react-icons/gi";

const Tips = () => {
  const tips = [
    {
      icon: <GiCookingPot className="text-6xl text-amber-300/80" />,
      title: "Always Preheat Your Pan",
      desc: "Locks in flavor and gives you that perfect sear.",
    },
    {
      icon: <GiSaltShaker className="text-6xl text-amber-300/80" />,
      title: "Season As You Go",
      desc: "Build flavor step by step, not at the end.",
    },
    {
      icon: <GiLemon className="text-6xl text-amber-300/80" />,
      title: "Balance Your Flavors",
      desc: "A little acid (lemon/vinegar) lifts almost any dish.",
    },
    {
      icon: <GiKnifeFork className="text-6xl text-amber-300/80" />,
      title: "Let Garlic Rest",
      desc: "Wait 10 minutes after chopping for best flavor and benefits.",
    },
  ];

  return (
    <section className="mb-16 px-4 sm:px-8 md:px-12 lg:px-20 py-12">
      <div className="text-center">
        <h1 className="raleway text-3xl sm:text-4xl md:text-5xl font-extrabold green">
          Quick Tips to Cook Like a Pro
        </h1>
        <p className="mt-3 text-amber-100/60">
          Small habits that make a big difference.
        </p>
        <div className="mt-6 mx-auto h-[2px] w-52 bg-gradient-to-r from-transparent via-amber-300/60 to-transparent" />
      </div>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
        {tips.map((t, i) => (
          <div
            key={i}
            className="border border-amber-400/20 rounded-[28px]
                       bg-black/30 backdrop-blur-xl p-7 text-center
                       shadow-[0_25px_70px_rgba(0,0,0,0.65)]
                       hover:shadow-[0_30px_95px_rgba(0,0,0,0.80)]
                       transition"
          >
            <div className="mx-auto w-fit rounded-2xl p-4 bg-amber-300/10 border border-amber-300/15">
              {t.icon}
            </div>
            <h2 className="mt-6 text-xl sm:text-2xl font-extrabold text-amber-50 raleway">
              {t.title}
            </h2>
            <p className="mt-3 text-amber-100/65 leading-relaxed">{t.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Tips;