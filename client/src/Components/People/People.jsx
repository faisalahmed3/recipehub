import React from "react";
import { FaQuoteLeft } from "react-icons/fa";

const People = () => {
  const reviews = [
    {
      text: "Savorly completely changed the way I cook at home. The recipes are easy to follow and always a hit with my family!",
      name: "Priya R.",
    },
    {
      text: "I love how fresh and creative the dishes are. Savorly makes me actually look forward to cooking every night!",
      name: "Mark D.",
    },
    {
      text: "From quick lunches to fancy dinners, Savorly helps me cook with confidence every single time.",
      name: "Rachel M.",
    },
    {
      text: "I never knew healthy cooking could taste this good. Savorly makes it fun and flavorful!",
      name: "Leo A.",
    },
    {
      text: "The design is beautiful, the recipes are reliable, and the results are always delicious. What more could you ask for?",
      name: "Fatima Y.",
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-8 md:px-16 lg:px-20">
      <div className="text-center">
        <h1 className="raleway text-3xl sm:text-4xl md:text-5xl font-extrabold green">
          What People Say
        </h1>
        <p className="mt-3 text-amber-100/60">Real words from real kitchens.</p>
        <div className="mt-6 mx-auto h-[2px] w-44 bg-gradient-to-r from-transparent via-amber-300/60 to-transparent" />
      </div>

      <div className="mt-12 flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="snap-start min-w-[280px] md:min-w-[340px] max-w-md
                       border border-amber-400/20 rounded-[28px]
                       bg-black/30 backdrop-blur-xl p-7
                       shadow-[0_25px_70px_rgba(0,0,0,0.65)]"
          >
            <FaQuoteLeft className="text-amber-300/60 text-2xl" />
            <p className="mt-4 text-amber-100/70 leading-relaxed text-base md:text-lg">
              {review.text}
            </p>
            <div className="mt-6 h-[1px] w-full bg-gradient-to-r from-transparent via-amber-300/25 to-transparent" />
            <h2 className="mt-5 font-extrabold text-amber-50 text-lg md:text-xl">
              — {review.name}
            </h2>
          </div>
        ))}
      </div>
    </section>
  );
};

export default People;