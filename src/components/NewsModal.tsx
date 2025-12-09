"use client";

import React, { useEffect, useState } from "react";
import { X } from "lucide-react";

interface NewsModalProps {
  isOpen: boolean;
  news: any | null;
  onClose: () => void;
}

const NewsModal: React.FC<NewsModalProps> = ({ isOpen, news, onClose }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setShow(true), 10); // animation trigger
    } else {
      setShow(false);
    }
  }, [isOpen]);

  if (!isOpen || !news) return null;

  return (
    <div
      className={`fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-opacity duration-300 
        ${show ? "opacity-100" : "opacity-0"}`}
      onClick={onClose}
    >
      <div
        className={`
          bg-gray-900 rounded-lg p-6 w-full max-w-xl shadow-2xl border border-gray-700 relative transform
          transition-all duration-300
          ${show ? "scale-100 opacity-100" : "scale-90 opacity-0"}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute right-4 top-4 text-gray-400 hover:text-white transition"
          onClick={onClose}
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold text-blue-400">{news.title}</h2>
        <p className="text-sm text-gray-400 mt-1">{news.date}</p>

        <div className="mt-4 text-gray-300 leading-relaxed">
          {news.content}
        </div>

        <button
          onClick={onClose}
          className="w-full mt-6 py-2 bg-red-600 hover:bg-red-500 rounded-lg text-white font-semibold transition"
        >
          Хаах
        </button>
      </div>
    </div>
  );
};

export default NewsModal;
