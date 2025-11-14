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
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-gray-900 text-gray-100 p-8 rounded-xl w-11/12 max-w-lg relative">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-100 text-xl"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-2">{title}</h2>
            <p className="text-gray-400 mb-2">Байршил: {location}</p>
            <p className="text-gray-300 mb-6">{description}</p>

            <button className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-md font-semibold transition">
              Өргөдөл илгээх
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
