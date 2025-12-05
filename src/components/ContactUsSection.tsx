"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabaseClients";
import SuccessModal from "./SuccessModal";

export default function ContactUsSection() {
  const [mounted, setMounted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => setMounted(true), []);

  const particles = mounted
    ? Array.from({ length: 20 }).map((_, i) => ({
        id: i,
        x: Math.random() * 1500 - 400,
        y: Math.random() * 900,
      }))
    : [];

  const handleChange = (e: { target: { name: string; value: string } }) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");

    const { error: insertError } = await supabase.from("user_contact").insert([
      {
        name: form.name,
        email: form.email,
        message: form.message,
      },
    ]);

    if (insertError) {
      setError("Мэдээлэл илгээхэд алдаа гарлаа!");
      return;
    }

    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 1500);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section
      id="contact-us"
      className="relative py-32 bg-gray-900 text-gray-200 overflow-hidden"
    >
      {/* Floating particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute w-[3px] h-[3px] bg-white/15 rounded-full"
          initial={{ x: p.x, y: p.y, opacity: 0 }}
          animate={{
            y: [p.y, p.y - 700],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: Math.random() * 6 + 5,
            repeat: Infinity,
            delay: Math.random() * 4,
          }}
        />
      ))}

      {/* Glowing background blurs */}
      <motion.div
        animate={{ x: [0, 25, 0], y: [0, -30, 0] }}
        transition={{ duration: 13, repeat: Infinity }}
        className="absolute top-10 left-20 w-[380px] h-[380px] bg-indigo-600/20 blur-3xl rounded-full"
      />
      <motion.div
        animate={{ x: [0, -20, 0], y: [0, 25, 0] }}
        transition={{ duration: 15, repeat: Infinity }}
        className="absolute bottom-10 right-10 w-[360px] h-[360px] bg-purple-600/20 blur-3xl rounded-full"
      />

      <div className="relative max-w-3xl mx-auto px-6">
        {/* TITLE */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center text-5xl font-extrabold mb-5"
        >
          Холбоо барих
        </motion.h2>

        {/* Animated underline */}
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: 180 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="h-1 bg-linear-to-r from-indigo-500 to-blue-500 mx-auto mb-12 rounded-full"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center text-gray-400 mb-12 text-lg"
        >
          Та бидэнд асуулт, санал хүсэлтээ илгээгээрэй. Бид танд богино хугацаанд
          хариу өгөх болно.
        </motion.p>

        {error && (
          <p className="text-red-400 text-center mb-4 font-medium">{error}</p>
        )}

        {/* FORM CARD */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className="relative bg-gray-800/60 backdrop-blur-xl border border-gray-700 rounded-2xl p-10 shadow-xl"
        >
          {/* Glow hover layer */}
          <motion.div
            className="absolute inset-0 bg-linear-to-r from-indigo-400/10 to-purple-400/10 blur-2xl rounded-2xl opacity-0 pointer-events-none"
            whileHover={{ opacity: 0.25 }}
          />

          {/* Name */}
          <div className="flex flex-col mb-5">
            <label className="text-sm mb-1 text-gray-300">Нэр</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="p-4 rounded-xl bg-gray-900/50 border border-gray-700 text-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
              required
            />
          </div>

          {/* Email */}
          <div className="flex flex-col mb-5">
            <label className="text-sm mb-1 text-gray-300">Имэйл</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="p-4 rounded-xl bg-gray-900/50 border border-gray-700 text-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
              required
            />
          </div>

          {/* Message */}
          <div className="flex flex-col mb-8">
            <label className="text-sm mb-1 text-gray-300">Мессеж</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={5}
              className="p-4 rounded-xl bg-gray-900/50 border border-gray-700 text-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
              required
            />
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full py-4 bg-linear-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 rounded-xl font-semibold text-white text-lg shadow-lg"
          >
            Илгээх
          </motion.button>
        </motion.form>
      </div>

      <SuccessModal isOpen={showSuccess} message="Мессеж амжилттай илгээгдлээ!" />
    </section>
  );
}
