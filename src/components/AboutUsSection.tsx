"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaUsers, FaSearch, FaHandshake } from "react-icons/fa";

export default function AboutUsSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // ❗ SSR үед Particles render хийхгүй → hydration error алга болно
  const particles = mounted
    ? Array.from({ length: 25 }).map((_, i) => ({
        id: i,
        x: Math.random() * 1500 - 500,
        y: Math.random() * 700,
      }))
    : [];

  return (
    <section
      id="about-us"
      className="relative w-full py-32 bg-gray-900 text-gray-200 overflow-hidden"
    >
      {/* ⭐ Floating particles */}
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

      {/* ✨ Parallax glowing background circles */}
      <motion.div
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
        className="absolute top-10 left-20 w-[420px] h-[420px] bg-purple-600/20 blur-3xl rounded-full"
      />
      <motion.div
        animate={{ x: [0, -25, 0], y: [0, 30, 0] }}
        transition={{ duration: 14, repeat: Infinity }}
        className="absolute bottom-10 right-10 w-[380px] h-[380px] bg-blue-600/20 blur-3xl rounded-full"
      />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* HEADING */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center text-5xl font-extrabold mb-8"
        >
          Бидний тухай
        </motion.h2>

        {/* Animated underline */}
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: 160 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="h-1 bg-linear-to-r from-indigo-500 to-blue-500 mx-auto mb-16 rounded-full"
        />

        {/* DESCRIPTION */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-lg text-gray-300 leading-relaxed text-center max-w-3xl mx-auto mb-20"
        >
          JobConnect нь Японд ажиллах Монгол иргэдийг ажил олгогч нартай холбох
          технологид суурилсан платформ бөгөөд ажил хайх болон hiring процессийг
          илүү ухаалаг, илүү хурдтай, илүү найдвартай болгодог.
        </motion.p>

        {/* CARD LIST – stagger animation */}
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
          {[{
            icon: <FaUsers className="text-5xl text-indigo-400 mb-6" />,
            title: "Ажил хайгчдад",
            text: "Ур чадвар, туршлагадаа суурилсан профайл үүсгэж, тохирох ажлын санал автоматаар авах боломжтой.",
          },{
            icon: <FaSearch className="text-5xl text-blue-400 mb-6" />,
            title: "Ажил олгогч нарт",
            text: "Нээлттэй ажлын байр оруулж, хамгийн сайн тохирох ажил хайгч руу шууд хүсэлт илгээж холбогдоно.",
          },{
            icon: <FaHandshake className="text-5xl text-pink-400 mb-6" />,
            title: "Найдвартай холболт",
            text: "Хоёр талын хэрэгцээг ухаалгаар тааруулж, hiring процессыг илүү үр дүнтэй, хялбар болгоно.",
          }].map((card, index) => (
            <motion.div
              key={index}
              variants={{ hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0, transition: { duration: 0.7 } } }}
              whileHover={{ y: -10, boxShadow: "0px 12px 35px rgba(80,120,255,0.15)", transition: { duration: 0.3 } }}
              className="relative bg-gray-800/70 backdrop-blur-xl border border-gray-700 rounded-2xl p-10 shadow-lg"
            >
              <motion.div
                className="absolute inset-0 bg-linear-to-r from-indigo-400/10 to-purple-400/10 blur-2xl rounded-3xl pointer-events-none opacity-0"
                whileHover={{ opacity: 0.25, transition: { duration: 0.4 } }}
              />
              {card.icon}
              <h3 className="text-2xl font-semibold mb-3">{card.title}</h3>
              <p className="text-gray-400 leading-relaxed">{card.text}</p>
            </motion.div>
          ))}
        </motion.div>
                {/* BOTTOM TEXT */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center text-lg mt-20 text-gray-400 max-w-4xl mx-auto leading-relaxed"
        >
          JobConnect — Японд ажиллах Монгол иргэдийн карьерын хөгжлийг технологиор дэмжинэ.
        </motion.p>
        
      </div>
    </section>
  );
}
