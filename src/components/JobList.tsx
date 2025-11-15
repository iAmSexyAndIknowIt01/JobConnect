// src/components/JobList.tsx
import React from 'react';
import JobCard from "./JobCard"; // JobCard-ийг импортлоно

// Ажлын бүтцийг JobsPage-тэй ижил тодорхойлно
interface Job {
  id: number | string;
  title: string;
  location: string;
  description: string;
}

// Props-ийн бүтцэд onViewJob-ийг нэмнэ
interface JobListProps {
  jobs: Job[];
  onViewJob: (job: Job) => void; // Job-ийг авдаг, буцаалтгүй функц
}

// onViewJob-ийг JobCard руу дамжуулна
export default function JobList({ jobs, onViewJob }: JobListProps) {
  return (
    <section className="max-w-4xl mx-auto grid gap-6">
      {jobs.map((job) => (
        <JobCard 
          key={job.id} 
          job={job} // Бүх Job объектийг дамжуулж болно
          onViewJob={() => onViewJob(job)} // Тодорхой ажлыг дамжуулж байна
        />
      ))}
    </section>
  );
}