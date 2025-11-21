"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabaseClients";
import SuccessModal from "./SuccessModal";

export default function ContactUsSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e: { target: { name: string; value: string } }) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setError("");

    const { error: insertError } = await supabase
      .from("user_contact")
      .insert([
        {
          name: form.name,
          email: form.email,
          message: form.message,
        },
      ]);

    if (insertError) {
      console.error(insertError);
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
      className="relative py-32 bg-linear-to-br from-gray-900 via-gray-800 to-black text-gray-200 overflow-hidden"
    >
      {/* decorative blurred circles */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-indigo-600 rounded-full blur-[140px] opacity-30"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-600 rounded-full blur-[150px] opacity-20"></div>

      <div className="relative max-w-3xl mx-auto px-6">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-extrabold text-center mb-5 tracking-tight bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"
        >
          Холбоо барих
        </motion.h2>

        <p className="text-center text-gray-400 mb-12 text-lg">
          Танд асуух зүйл байвал бидэнд хэзээд хандаарай ✨
        </p>

        {error && (
          <p className="text-red-400 text-center mb-4 font-medium">{error}</p>
        )}

        {/* Form card */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl rounded-2xl p-10 flex flex-col gap-8"
        >
          {/* Name */}
          <div className="flex flex-col">
            <label className="text-sm mb-1 text-gray-300">Нэр</label>
            <input
              type="text"
              name="name"
              placeholder="Нэрээ оруулна уу"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full p-4 rounded-xl bg-gray-800/60 border border-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="text-sm mb-1 text-gray-300">Имэйл</label>
            <input
              type="email"
              name="email"
              placeholder="Имэйл хаяг"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full p-4 rounded-xl bg-gray-800/60 border border-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          {/* Message */}
          <div className="flex flex-col">
            <label className="text-sm mb-1 text-gray-300">Мессеж</label>
            <textarea
              name="message"
              placeholder="Та мессежээ энд бичнэ үү..."
              value={form.message}
              onChange={handleChange}
              required
              rows={5}
              className="w-full p-4 rounded-xl bg-gray-800/60 border border-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          {/* Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-4 bg-linear-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 rounded-xl text-white font-semibold text-lg shadow-lg transition"
          >
            Илгээх
          </motion.button>
        </motion.form>
      </div>

      <SuccessModal
        isOpen={showSuccess}
        message="Мессеж амжилттай илгээгдлээ!"
      />
    </section>
  );
}
