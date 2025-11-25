"use client";

import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center h-screen text-white overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/Home_Background.jpg"
          alt="Tokyo Background"
          fill
          priority
          className="object-cover object-center scale-110 blur-[2px]"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/40 to-black/80"></div>
      </div>

      {/* Content */}
      <div className="text-center px-6 max-w-3xl animate-fadeIn">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight whitespace-nowrap">
          The <span className="text-blue-400">Next Step</span> <br/>Japan🚀
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-12">
          Ур чадвар, хүсэл мөрөөдлөөрөө тохирсон ажлаа хайж, шинэ боломжуудыг нээцгээе.
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-6">
          <Link
            href="/jobs"
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-full text-lg font-semibold shadow-lg transition"
          >
            🧑‍🔧 Ажил хайгч
          </Link>
          <Link
            href="/employer/auth"
            className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 rounded-full text-lg font-semibold shadow-lg transition"
          >
            🏢 Ажил олгогч
          </Link>
        </div>
      </div>
    </section>
  );
}
