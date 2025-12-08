"use client";

import React from "react";
import { supabase } from "@/lib/supabaseClients";

interface JobDeleteModalProps {
  jobId: number;
  onClose: () => void;
  onDeleted: () => void;
}

export default function JobDeleteModal({ jobId, onClose, onDeleted }: JobDeleteModalProps) {
  const handleDelete = async () => {
    const { error } = await supabase.from("open_jobs").delete().eq("id", jobId);

    if (!error) {
      onDeleted();
      onClose();
    } else {
      alert("Устгах үед алдаа гарлаа!");
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
        className="relative bg-gray-800 text-white p-6 rounded-xl max-w-md w-full z-10 shadow-xl"
        onClick={(e) => e.stopPropagation()} // overlay click-д modal хаалгадгүй
      >
        <h2 className="text-xl font-bold mb-4">Ажлын байр устгах</h2>
        <p>Та энэ ажлын байрны мэдээллийг устгахдаа итгэлтэй байна уу?</p>

        <div className="flex justify-end gap-2 mt-6">
          <button
            className="bg-gray-600 hover:bg-gray-500 px-4 py-2 rounded"
            onClick={onClose}
          >
            Болих
          </button>
          <button
            className="bg-red-600 hover:bg-red-500 px-4 py-2 rounded"
            onClick={handleDelete}
          >
            Устгах
          </button>
        </div>
      </div>
    </div>
  );
}
