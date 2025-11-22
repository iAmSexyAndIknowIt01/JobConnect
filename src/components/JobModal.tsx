"use client";

import React, { useState } from 'react';
import SuccessModal from "@/components/SuccessModal";
import FailedModal from "@/components/FailedModal";

interface Job {
  id: number | string;
  title: string;
  location: string;
  description: string;
}

interface JobModalProps {
  job: Job;
  isOpen: boolean;
  onClose: () => void;
}

const JobModal: React.FC<JobModalProps> = ({ job, isOpen, onClose }) => {
  const [showSuccess, setShowSuccess] = useState(false);

  const [showError, setShowError] = useState(false);


  if (!isOpen) return null;

  const handleApply = () => {
    const userId = sessionStorage.getItem("userId");

    console.log("User ID:", userId);
    // ❌ Хэрэв хэрэглэгч нэвтрээгүй бол
    if (!userId) {
      setShowError(true);
      setTimeout(() => setShowError(false), 1500);
      return;
    }

    // ✅ Нэвтэрсэн → хүсэлт амжилттай илгээнэ
    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
      onClose(); // JobModal хаагдана
    }, 1500);
  };

  return (
    <>
      {/* Modal Background */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        {/* Modal Box */}
        <div
          className="bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-start border-b border-gray-700 pb-4 mb-4">
            <h2 className="text-3xl font-bold text-blue-400">{job.title}</h2>

            <button
              className="text-gray-400 hover:text-gray-100 transition"
              onClick={onClose}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Job Details */}
          <div className="space-y-4">
            <p className="text-lg font-semibold text-gray-300">
              📍 Байршил: <span className="text-red-400">{job.location}</span>
            </p>

            <hr className="border-gray-700" />

            <h3 className="text-xl font-semibold text-gray-200">Ажлын тодорхойлолт</h3>
            <p className="text-gray-300 whitespace-pre-line">
              {job.description}
            </p>

            <div className="pt-4">
              <button
                onClick={handleApply}
                className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300 font-semibold text-lg"
              >
                Ажилд хүсэлт илгээх
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Хэрвээ нэвтрээгүй бол харуулах мэссеж */}
      <FailedModal 
        isOpen={showError}
        message="Эхлээд нэвтэрнэ үү!"
      />

      {/* Амжилттай илгээсэн */}
      <SuccessModal
        isOpen={showSuccess}
        message="Ажилд хүсэлт амжилттай илгээлээ!"
      />
    </>
  );
};

export default JobModal;
