"use client";

import React from "react";
import { X } from "lucide-react";

interface CandidateModalProps {
  isOpen: boolean;
  candidate: any | null;
  onClose: () => void;
}

const CandidateModal: React.FC<CandidateModalProps> = ({ isOpen, candidate, onClose }) => {
  if (!isOpen || !candidate) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-gray-900 rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl border border-gray-700 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white transition"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold text-emerald-400 mb-3">
          {candidate.name}
        </h2>

        <p className="text-gray-300 mb-2">👨‍💼 {candidate.profession}</p>
        <p className="text-gray-300 mb-2">📍 {candidate.location}</p>
        <p className="text-gray-300 mb-2">🎂 Нас: {candidate.age}</p>
        <p className="text-gray-300 mb-2">🚻 Хүйс: {candidate.gender}</p>
        <p className="text-gray-300 mb-4">🧠 Туршлага: {candidate.experience}</p>

        <h3 className="text-lg font-semibold text-gray-200 mb-2">Ур чадварууд:</h3>

        <div className="flex flex-wrap gap-2 mb-6">
          {candidate.skills.map((skill: string, index: number) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-800 border border-gray-700 rounded-full text-gray-300 text-xs"
            >
              {skill}
            </span>
          ))}
        </div>

        <button
          onClick={onClose}
          className="mt-4 w-full py-2 bg-red-600 hover:bg-red-500 rounded-lg text-white font-bold"
        >
          Хаах
        </button>
      </div>
    </div>
  );
};

export default CandidateModal;
