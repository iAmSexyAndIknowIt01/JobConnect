"use client";

import { useState } from "react";

interface JobCardProps {
  id: number | string;
  title: string;
  location: string;
  description: string;
}

export default function JobCard({ id, title, location, description }: JobCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-xl transition relative">
      <h2 className="text-2xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-300 mb-4">{location}</p>

      <button
        onClick={() => setOpen(true)}
        className="text-blue-400 font-semibold hover:underline"
      >
        Дэлгэрэнгүй
      </button>

      {open && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-gray-900 text-gray-100 rounded-xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto relative p-8">
            {/* Close button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-100 text-2xl font-bold"
            >
              ✕
            </button>

            {/* Title */}
            <h2 className="text-3xl font-bold mb-3">{title}</h2>

            {/* Location */}
            <p className="text-gray-400 italic mb-4">Байршил: {location}</p>

            {/* Description */}
            <div className="text-gray-300 mb-6 whitespace-pre-line">{description}</div>

            {/* Apply button */}
            <div className="flex justify-center">
              <button className="bg-blue-500 hover:bg-blue-600 px-8 py-3 rounded-md font-semibold transition">
                Өргөдөл илгээх
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
