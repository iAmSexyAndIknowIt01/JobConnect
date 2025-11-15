// src/components/JobCard.tsx
import React from 'react';

interface Job {
  id: number | string;
  title: string;
  location: string;
  description: string;
}

// Props-ийн бүтцэд Job-ийн объект болон onViewJob функцыг нэмнэ
interface JobCardProps {
  job: Job;
  onViewJob: () => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onViewJob }) => {
  return (
    <article 
        className="p-6 bg-gray-800 rounded-lg shadow-lg border border-gray-700 cursor-pointer transition duration-300 hover:bg-gray-700 hover:shadow-xl"
        // Карт дээр дарах үед ч модалыг нээх боломжтой
        onClick={onViewJob} 
    > 
      <h3 className="text-2xl font-bold text-blue-400 mb-2">{job.title}</h3>
      <p className="text-gray-400 mb-3 flex items-center">
        {/* ... SVG дүрс ... */}
        {job.location}
      </p>
      <p className="text-gray-300 mb-4">{job.description.substring(0, 100)}...</p> 
      <button 
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 font-semibold mt-2"
        onClick={(e) => {
          e.stopPropagation(); // Карт дээрх onClick-ийг зогсооно
          onViewJob();
        }}
      >
        Дэлгэрэнгүй &rarr;
      </button>
    </article>
  );
};

export default JobCard;