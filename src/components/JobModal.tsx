// src/components/JobModal.tsx
import React from 'react';

// Ажлын бүтцийг тодорхойлно
interface Job {
  id: number | string;
  title: string;
  location: string;
  description: string;
}

// Props-ийн бүтцийг тодорхойлно
interface JobModalProps {
  job: Job;
  isOpen: boolean;
  onClose: () => void;
}

const JobModal: React.FC<JobModalProps> = ({ job, isOpen, onClose }) => {
  if (!isOpen) {
    return null; 
  }

  return (
    // МОДАЛЫН ГАДНАХ ТАЛБАР (OVERLAY) - Энд өөрчлөлтийг хийж байна
    <div 
      // Өөрчлөлт: backdrop-blur-sm-ийг нэмсэн.
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" 
      onClick={onClose} 
    >
      {/* Модалын доторх талбар */}
      <div 
        className="bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 shadow-2xl transform transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start border-b border-gray-700 pb-4 mb-4">
          <h2 className="text-3xl font-bold text-blue-400">{job.title}</h2>
          {/* Хаах товч */}
          <button 
            className="text-gray-400 hover:text-gray-100 transition"
            onClick={onClose}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Ажлын дэлгэрэнгүй мэдээлэл */}
        <div className="space-y-4">
          <p className="text-lg font-semibold text-gray-300">
            📍 Байршил: <span className="text-red-400">{job.location}</span>
          </p>
          <hr className="border-gray-700"/>
          
          <h3 className="text-xl font-semibold text-gray-200">Ажлын тодорхойлолт</h3>
          <p className="text-gray-300 whitespace-pre-line">{job.description}</p>
          
          <div className="pt-4">
            <button className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300 font-semibold text-lg">
              Ажилд хүсэлт илгээх
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobModal;