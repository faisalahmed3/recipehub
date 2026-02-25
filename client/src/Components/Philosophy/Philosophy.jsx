import React from "react";
import { GiHeartBeats, GiHerbsBundle, GiKnifeThrust } from "react-icons/gi";

const Philosophy = () => {
  const items = [
    {
      icon: <GiKnifeThrust className="text-6xl text-amber-300/80" />,
      title: "Simplicity",
      desc: "Real kitchens. Real people. Clean steps and reliable results.",
    },
    {
      icon: <GiHerbsBundle className="text-6xl text-amber-300/80" />,
      title: "Freshness",
      desc: "Ingredients-first recipes that keep natural flavors in the spotlight.",
    },
    {
      icon: <GiHeartBeats className="text-6xl text-amber-300/80" />,
      title: "Passion",
      desc: "Cooking is love. We design every recipe for sharing and joy.",
    },
  ];

  return (
    <section className="px-4 sm:px-8 md:px-12 lg:px-20 py-16">
      <div className="text-center">
        <h1 className="raleway text-3xl sm:text-4xl md:text-5xl font-extrabold green">
          The RecipeHub Way
        </h1>
        <p className="mt-3 text-amber-100/60">
          A premium approach to everyday cooking.
        </p>
        <div className="mt-6 mx-auto h-[2px] w-44 bg-gradient-to-r from-transparent via-amber-300/60 to-transparent" />
      </div>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item, i) => (
          <div
            key={i}
            className="group border border-amber-400/20 rounded-[28px]
                       bg-black/30 backdrop-blur-xl p-8 text-center
                       shadow-[0_25px_70px_rgba(0,0,0,0.65)]
                       hover:shadow-[0_30px_95px_rgba(0,0,0,0.80)]
                       transition"
          >
            <div className="mx-auto w-fit rounded-2xl p-4 bg-amber-300/10 border border-amber-300/15 group-hover:bg-amber-300/15 transition">
              {item.icon}
            </div>
            <h2 className="mt-6 raleway text-2xl md:text-3xl font-extrabold text-amber-50">
              {item.title}
            </h2>
            <p className="mt-3 text-amber-100/65 leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Philosophy;