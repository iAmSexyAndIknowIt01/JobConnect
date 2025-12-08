"use client";

import React, { useState } from "react";
import { supabase } from "@/lib/supabaseClients";

interface JobEditModalProps {
  job: any;
  onClose: () => void;
  onUpdated: () => void;
}

export default function JobEditModal({ job, onClose, onUpdated }: JobEditModalProps) {
  const [formData, setFormData] = useState({ ...job });

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

  const handleChange = (key: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    const { error } = await supabase
      .from("open_jobs")
      .update(formData)
      .eq("id", job.id);

    if (!error) {
      onUpdated();
      onClose();
    } else {
      alert("Засахад алдаа гарлаа!");
      console.error(error);
    }
  };

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
        <h2 className="text-2xl font-bold mb-4">Ажлын байр засах</h2>

        <div className="grid grid-cols-1 gap-3">
          {fields.map((field) => (
            <div key={field.key} className="flex flex-col">
              <label className="font-semibold">{field.label}:</label>
              <input
                type="text"
                value={formData[field.key] || ""}
                onChange={(e) => handleChange(field.key, e.target.value)}
                className="mt-1 p-2 rounded bg-gray-700 text-white border border-gray-600"
              />
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button
            className="bg-gray-600 hover:bg-gray-500 px-4 py-2 rounded"
            onClick={onClose}
          >
            Болих
          </button>
          <button
            className="bg-emerald-600 hover:bg-emerald-500 px-4 py-2 rounded"
            onClick={handleSave}
          >
            Хадгалах
          </button>
        </div>
      </div>
    </div>
  );
}
