"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function StatsSection() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const particles = mounted
    ? Array.from({ length: 18 }).map((_, i) => ({
        id: i,
        x: Math.random() * 1500 - 500,
        y: Math.random() * 700,
      }))
    : [];

  const stats = [
    { number: "12,500+", label: "Ажил хайгч" },
    { number: "1,200+", label: "Ажил олгогч" },
    { number: "8,900+", label: "Амжилттай холболт" },
  ];

  return (
    <section className="relative w-full py-32 bg-gray-900 text-gray-200 overflow-hidden">
      {/* Particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute w-1 h-1 bg-white/20 rounded-full"
          initial={{ x: p.x, y: p.y, opacity: 0 }}
          animate={{ y: [p.y, p.y - 600], opacity: [0, 0.7, 0] }}
          transition={{
            duration: Math.random() * 5 + 6,
            repeat: Infinity,
            delay: Math.random() * 4,
          }}
        />
      ))}

      {/* Glow background */}
      <motion.div
        animate={{ x: [0, 30, 0], y: [0, -30, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
        className="absolute top-10 left-10 w-[420px] h-[420px] bg-purple-600/20 blur-3xl rounded-full"
      />
      <motion.div
        animate={{ x: [0, -25, 0], y: [0, 40, 0] }}
        transition={{ duration: 15, repeat: Infinity }}
        className="absolute bottom-10 right-10 w-[380px] h-[380px] bg-blue-600/20 blur-3xl rounded-full"
      />

      <div className="relative max-w-7xl mx-auto px-6 text-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-5xl font-extrabold mb-8"
        >
          Манай үзүүлэлтүүд
        </motion.h2>

        {/* Underline */}
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: 180 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="h-1 bg-linear-to-r from-indigo-500 to-blue-500 mx-auto mb-20 rounded-full"
        />

        {/* Stats numbers */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.25 } } }}
          className="grid grid-cols-1 md:grid-cols-3 gap-14"
        >
          {stats.map((s, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 40 },
                show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
              }}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.25 },
              }}
              className="bg-gray-800/60 border border-gray-700 p-10 rounded-2xl backdrop-blur-lg shadow-xl"
            >
              <h3 className="text-4xl font-bold text-indigo-400">{s.number}</h3>
              <p className="text-gray-400 mt-3 text-lg">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
