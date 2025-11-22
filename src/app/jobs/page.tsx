"use client";

import { useEffect, useState } from "react";
import JobList from "@/components/JobList";
import NewsFeed from "@/components/NewsFeed";
// Шинээр JobModal-ийг импорт хийнэ
import JobModal from "@/components/JobModal"; 
import { supabase } from "@/lib/supabaseClients";


// Ажлын объектын бүтцийг тодорхойлсон interface (өмнөхтэй ижил)
interface Job {
  id: string | number;
  title: string;
  location: string;
  description: string;
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const { data, error } = await supabase.from("open_jobs").select("*");
      if (error) console.error(error);
      else setJobs(data || []);
    };

    fetchJobs();
  }, []);
  
  // 1. Модал нээлттэй эсэхийг удирдах state
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // 2. Модал дээр харуулах ажлын мэдээллийг хадгалах state
  // null эсвэл Job төрлийг ашиглана
  const [selectedJob, setSelectedJob] = useState<Job | null>(null); 

  // 3. Ажлын карт дээр дарах үед модалыг нээх функц
  const handleViewJob = (job: Job) => {
    setSelectedJob(job); // Сонгосон ажлыг хадгална
    setIsModalOpen(true); // Модалыг нээнэ
  };

  // 4. Модалыг хаах функц
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
  };

  return (
    <main className="min-h-screen bg-gray-900 text-gray-100 px-6 py-10 pt-32">
      {/* ... Хуудасны гарчиг болон хайлтын хэсэг ... (Өөрчлөгдөөгүй) */}
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">
        🧑‍🔧 Ажил хайгч
      </h1>

      <section className="max-w-7xl mx-auto mb-10">
        <input
          type="text"
          placeholder="Ажил, ур чадвар эсвэл газар хайх..."
          className="w-full p-4 rounded-lg border border-gray-700 bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </section>

      {/* Ажилын жагсаалт болон Мэдээний хэсэг */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-7 gap-8">
        
        {/* Ажилуудын жагсаалт - handleViewJob-ийг props-оор дамжуулна */}
        <section className="lg:col-span-5">
          <h2 className="text-3xl font-semibold mb-4 border-b border-gray-700 pb-2">Нээлттэй ажлын байрууд</h2>
          {/* JobList-д модалыг удирдах функц болон ажлуудыг дамжуулна */}
          <JobList jobs={jobs} onViewJob={handleViewJob} />
        </section>

        {/* Сүүлийн үеийн мэдээ */}
        <aside className="lg:col-span-2">
          <h2 className="text-3xl font-semibold mb-4 border-b border-gray-700 pb-2">Сүүлийн үеийн мэдээ</h2>
          <NewsFeed />
        </aside>
      </div>

      {/* Ажлын дэлгэрэнгүйг харуулах модал */}
      {selectedJob && ( // selectedJob-д утга байвал модалыг харуулна
        <JobModal 
          job={selectedJob} 
          isOpen={isModalOpen} 
          onClose={handleCloseModal} 
        />
      )}
    </main>
  );
}