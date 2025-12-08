"use client";

import React from "react";

interface JobDetailModalProps {
  job: any;
  onClose: () => void;
}

export default function JobDetailModal({ job, onClose }: JobDetailModalProps) {
  const fields = [
    { label: "Гарчиг", key: "title" },
    { label: "Төрөл", key: "job_type" },
    { label: "Байршил", key: "location" },
    { label: "Цалин", key: "salary" },
    { label: "Ажиллах хуваарь", key: "work_schedule" },
    { label: "Шаардлага", key: "requirements" },
    { label: "Давуу тал", key: "benefits" },
    { label: "Салбар", key: "industry" },
    { label: "Тайлбар", key: "description" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Background blur overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal content */}
      <div
        className="relative bg-gray-800 text-white p-6 rounded-xl max-w-3xl w-full z-10 shadow-xl overflow-y-auto max-h-[80vh]"
        onClick={(e) => e.stopPropagation()} // overlay click-д modal хаалгадгүй
      >
        <h2 className="text-2xl font-bold mb-4">Ажлын байрны дэлгэрэнгүй</h2>

        <div className="grid grid-cols-1 gap-3">
          {fields.map((field) => (
            <div key={field.key}>
              <span className="font-semibold">{field.label}:</span>{" "}
              <span>{job[field.key] || "-"}</span>
            </div>
          ))}
        </div>

        <button
          className="mt-6 bg-red-600 hover:bg-red-500 px-4 py-2 rounded"
          onClick={onClose}
        >
          Хаах
        </button>
      </div>
    </div>
  );
}
