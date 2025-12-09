"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface NewsModalProps {
  isOpen: boolean;
  news: any | null;
  onClose: () => void;
}

const NewsModal: React.FC<NewsModalProps> = ({ isOpen, news, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && news && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* MODAL CONTAINER */}
          <motion.div
            className="relative w-full max-w-2xl bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl p-8 mx-4"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.85, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 40 }}
            transition={{
              duration: 0.28,
              type: "spring",
              stiffness: 140,
              damping: 14,
            }}
          >
            {/* CLOSE BUTTON */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-gray-400 hover:text-white transition"
            >
              <X className="w-7 h-7" />
            </button>

            {/* TITLE */}
            <h2 className="text-3xl font-semibold text-blue-400 leading-snug">
              {news.title}
            </h2>

            {/* DATE */}
            <p className="text-gray-500 text-sm mt-1">{news.date}</p>

            {/* DIVIDER */}
            <div className="my-4 border-b border-gray-700"></div>

            {/* CONTENT */}
            <p className="text-gray-300 leading-relaxed whitespace-pre-line">
              {news.content}
            </p>

            {/* SOURCE BOX */}
            {news.source && (
              <div className="mt-6 bg-gray-800 rounded-xl border border-gray-700 p-4">
                <p className="text-gray-400 text-xs tracking-wide uppercase">
                  Эх сурвалж
                </p>
                <p className="text-blue-400 font-semibold text-sm mt-1">
                  {news.source}
                </p>
              </div>
            )}

            {/* CLOSE BUTTON */}
            <button
              onClick={onClose}
              className="w-full mt-8 py-3 bg-red-600 hover:bg-red-500 rounded-lg text-white font-semibold transition shadow-md"
            >
              Хаах
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NewsModal;
