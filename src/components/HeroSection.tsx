"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  "/hero/hero1.jpg",
  "/hero/hero2.jpg",
  "/hero/hero3.jpg",
  "/hero/hero4.jpg",
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const prev = () =>
    setCurrent((p) => (p - 1 + images.length) % images.length);
  const next = () =>
    setCurrent((p) => (p + 1) % images.length);

  return (
    <section className="relative h-screen w-full overflow-hidden text-white">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/Home_Background.jpg"
          alt="Tokyo Background"
          fill
          priority
          className="object-cover blur-[2px] scale-110"
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Layout */}
      <div className="relative flex h-full flex-col md:flex-row">
        {/* SLIDER (DESKTOP ONLY) */}
        <div className="hidden md:flex md:w-[70%] items-center justify-center">
          <div
            className="
              relative 
              w-[80%] 
              h-[70%] 
              overflow-hidden 
              rounded-3xl 
              shadow-2xl 
              border border-white/10 
              group
              scale-95 
              hover:scale-100 
              transition-transform 
              duration-500
            "
          >
            <div
              className="flex h-full transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {images.map((src, i) => (
                <div key={i} className="relative min-w-full h-full">
                  <Image
                    src={src}
                    alt={`slide-${i}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Controls */}
            <button
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 p-3 rounded-full opacity-0 group-hover:opacity-100 transition"
            >
              <ChevronLeft />
            </button>

            <button
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 p-3 rounded-full opacity-0 group-hover:opacity-100 transition"
            >
              <ChevronRight />
            </button>
          </div>
        </div>

        {/* CONTENT (MOBILE = 100%) */}
        <div className="w-full md:w-[30%] h-full flex flex-col justify-center items-center px-6 bg-black/40 backdrop-blur-sm">
          <h1 className="text-4xl font-extrabold mb-6 text-center">
            The <span className="text-blue-400">Next Step</span>
            <br />
            Japan 🚀
          </h1>

          <p className="text-gray-200 text-center mb-10 max-w-sm">
            Ур чадвар, хүсэл мөрөөдөлдөө тохирсон ажлаа олцгооё
          </p>

          <div className="flex flex-col gap-4 w-full max-w-xs">
            <Link
              href="/jobs"
              className="py-4 bg-blue-600 hover:bg-blue-700 rounded-full text-center font-semibold"
            >
              🧑‍🔧 Ажил хайгч
            </Link>

            <Link
              href="/employer/auth"
              className="py-4 bg-emerald-600 hover:bg-emerald-700 rounded-full text-center font-semibold"
            >
              🏢 Ажил олгогч
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
