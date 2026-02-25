import React from "react";
import logo from "../../assets/RecipeHub.png";
import Top from "../../Components/Top/Top";
import People from "../../Components/People/People";
import Tips from "../../Components/Tips/Tips";
import biryani from "../../assets/Biryani.png";
import jalebi from "../../assets/jalebi.png";
import tikka from "../../assets/Tikka.png";
import laddoo from "../../assets/laddoo.png";
import Philosophy from "../../Components/Philosophy/Philosophy";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

const Hero = () => {
  const slides = [
    { id: "slide1", src: biryani, alt: "Biryani", next: "slide2", prev: "slide4" },
    { id: "slide2", src: tikka, alt: "Tikka", next: "slide3", prev: "slide1" },
    { id: "slide3", src: jalebi, alt: "Jalebi", next: "slide4", prev: "slide2" },
    { id: "slide4", src: laddoo, alt: "Laddoo", next: "slide1", prev: "slide3" },
  ];

  return (
    <div className="ivory-bg pb-16">
      <section className="relative px-4 sm:px-10 md:px-20 pt-6">
        <div className="relative overflow-hidden rounded-[28px] border border-amber-400/15 bg-black/35 shadow-[0_35px_120px_rgba(0,0,0,0.75)]">
          {/* luxury glow */}
          <div className="pointer-events-none absolute -inset-6 bg-[radial-gradient(circle_at_20%_20%,rgba(214,193,138,0.18),transparent_55%)]" />
          <div className="pointer-events-none absolute -inset-6 bg-[radial-gradient(circle_at_80%_75%,rgba(214,193,138,0.10),transparent_55%)]" />

          {/* overlay for readability */}
          <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-black/65 via-black/25 to-black/55" />
          <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/55 via-transparent to-black/20" />

          {/* brand center */}
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
            <div className="relative">
              <div className="absolute -inset-4 blur-2xl opacity-30 bg-amber-300/30 rounded-full" />
              <img
                src={logo}
                alt="RecipeHub Logo"
                className="relative w-28 sm:w-36 md:w-52 mb-3 drop-shadow-2xl"
              />
            </div>

            <h1 className="green font-extrabold text-4xl sm:text-5xl md:text-7xl lg:text-8xl tracking-tight">
              RecipeHub
            </h1>

            <p className="lato mt-3 text-base sm:text-lg md:text-2xl text-amber-100/70 max-w-2xl">
              Where Every Dish Tells a Story.
            </p>

            <div className="mt-6 h-[2px] w-44 bg-gradient-to-r from-transparent via-amber-300/60 to-transparent" />
          </div>

          {/* carousel */}
          <div className="carousel w-full h-[320px] sm:h-[420px] md:h-[620px] lg:h-[720px]">
            {slides.map(({ id, src, alt, next, prev }) => (
              <div key={id} id={id} className="carousel-item relative w-full h-full">
                <img src={src} alt={alt} className="w-full h-full object-cover" />

                {/* arrows */}
                <div className="absolute left-4 right-4 top-1/2 z-30 flex -translate-y-1/2 justify-between">
                  <a
                    href={`#${prev}`}
                    className="btn btn-circle border rounded-lg border-amber-300/30 bg-black/45 text-amber-50 hover:bg-black/70 hover:border-amber-300/60 backdrop-blur-md"
                    aria-label="Previous"
                  >
                    <HiChevronLeft className="text-2xl" />
                  </a>
                  <a
                    href={`#${next}`}
                    className="btn btn-circle border rounded-lg border-amber-300/30 bg-black/45 text-amber-50 hover:bg-black/70 hover:border-amber-300/60 backdrop-blur-md"
                    aria-label="Next"
                  >
                    <HiChevronRight className="text-2xl" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Top />
      <Philosophy />
      <People />
      <Tips />
    </div>
  );
};

export default Hero;