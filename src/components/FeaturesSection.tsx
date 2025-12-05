"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaMagic, FaBolt, FaRobot } from "react-icons/fa";

export default function FeaturesSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const particles = mounted
    ? Array.from({ length: 20 }).map((_, i) => ({
        id: i,
        x: Math.random() * 1500 - 500,
        y: Math.random() * 700,
      }))
    : [];

  const features = [
    {
      icon: <FaMagic className="text-5xl text-indigo-400 mb-6" />,
      title: "Ухаалаг тааруулалт",
      text: "AI суурилсан систем нь ажил хайгч болон ажил олгогчийн хэрэгцээг автоматаар тааруулна.",
    },
    {
      icon: <FaBolt className="text-5xl text-blue-400 mb-6" />,
      title: "Хурдан процесс",
      text: "Interview товлох, CV илгээх, хүсэлт баталгаажуулах гээд бүх ажиллагаа хурдтай.",
    },
    {
      icon: <FaRobot className="text-5xl text-pink-400 mb-6" />,
      title: "Автомат шалгаруулалт",
      text: "Ур чадвар, туршлага, шаардлагад тулгуурлан хамгийн тохирох ажилтанг санал болгоно.",
    },
  ];

  return (
    <section id="features" className="relative w-full py-32 bg-gray-900 text-gray-200 overflow-hidden">
      {/* Floating particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute w-1 h-1 bg-white/20 rounded-full"
          initial={{ x: p.x, y: p.y, opacity: 0 }}
          animate={{ y: [p.y, p.y - 600], opacity: [0, 0.7, 0] }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            delay: Math.random() * 4,
          }}
        />
      ))}

      {/* Background glowing circles */}
      <motion.div
        animate={{ x: [0, 20, 0], y: [0, -25, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
        className="absolute top-20 left-20 w-[380px] h-[380px] bg-purple-600/20 blur-3xl rounded-full"
      />

      <motion.div
        animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
        transition={{ duration: 14, repeat: Infinity }}
        className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-blue-600/20 blur-3xl rounded-full"
      />

      <div className="relative max-w-7xl mx-auto px-6">
        
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center text-5xl font-extrabold mb-8"
        >
          Бидний давуу талууд
        </motion.h2>

        {/* Underline */}
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: 180 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="h-1 bg-linear-to-r from-indigo-500 to-blue-500 mx-auto mb-16 rounded-full"
        />

        {/* Cards */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.22 } },
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-10"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 40 },
                show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
              }}
              whileHover={{
                y: -10,
                boxShadow: "0px 12px 35px rgba(80,120,255,0.15)",
                transition: { duration: 0.3 },
              }}
              className="relative bg-gray-800/70 backdrop-blur-xl border border-gray-700 rounded-2xl p-10 shadow-lg"
            >
              <motion.div
                className="absolute inset-0 bg-linear-to-r from-indigo-400/10 to-purple-400/10 blur-2xl rounded-3xl pointer-events-none opacity-0"
                whileHover={{ opacity: 0.25, transition: { duration: 0.4 } }}
              />
              {feature.icon}
              <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
