"use client";

import { useEffect, useState } from "react";
import JobList from "@/components/JobList";
import JobListSkeleton from "@/components/JobListSkeleton";
import NewsFeed from "@/components/NewsFeed";
import JobModal from "@/components/JobModal"; 
import { supabase } from "@/lib/supabaseClients";

interface Job {
  id: string | number;
  title: string;
  location: string;
  description: string;
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [searchQuery, setSearchQuery] = useState(""); // 🔍 Search
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  // Pagination
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("open_jobs")
        .select("*")
        .order("id", { ascending: true });

      if (error) console.error(error);
      else setJobs(data || []);

      setLoading(false);
    };

    fetchJobs();
  }, []);

  const handleViewJob = (job: Job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
  };

  // 🔍 Search filter
  const filteredJobs = jobs.filter((job) => {
    const query = searchQuery.toLowerCase();
    return (
      job.title.toLowerCase().includes(query) ||
      job.location.toLowerCase().includes(query) ||
      job.description.toLowerCase().includes(query)
    );
  });

  // Pagination (filtered jobs дээр)
  const totalJobs = filteredJobs.length;
  const totalPages = Math.ceil(totalJobs / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const jobsToShow = filteredJobs.slice(startIndex, endIndex);

  return (
    <main className="min-h-screen bg-gray-900 text-gray-100 px-6 py-10 pt-32">
      <section className="max-w-7xl mx-auto mb-10 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        
        {/* 🔍 Search Input */}
        <input
          type="text"
          placeholder="Ажил, ур чадвар эсвэл газар хайх..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full md:w-1/2 p-4 rounded-lg border border-gray-700 bg-gray-800 text-gray-100
            focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Page Size Selector */}
        <div>
          <label htmlFor="pageSize" className="mr-2">
            Нэг хуудас дээр харуулах:
          </label>
          <select
            id="pageSize"
            className="rounded-lg p-2 bg-gray-800 text-gray-100 border border-gray-700"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
      </section>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-7 gap-8">
        <section className="lg:col-span-5">
          <h2 className="text-3xl font-semibold mb-4 border-b border-gray-700 pb-2">
            Нээлттэй ажлын байрууд
          </h2>

          {/* Job List */}
          {loading ? (
            <JobListSkeleton count={pageSize} />
          ) : jobsToShow.length === 0 ? (
            <p className="text-gray-400 text-center py-10">
              Таны хайлтанд тохирох ажил олдсонгүй 😕
            </p>
          ) : (
            <JobList jobs={jobsToShow} onViewJob={handleViewJob} />
          )}

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <div className="flex justify-center mt-6 gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded-md transition ${
                    page === currentPage
                      ? "bg-blue-500 text-white"
                      : "bg-gray-700 hover:bg-gray-600"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          )}
        </section>

        <aside className="lg:col-span-2">
          <h2 className="text-3xl font-semibold mb-4 border-b border-gray-700 pb-2">
            Сүүлийн үеийн мэдээ
          </h2>
          <NewsFeed />
        </aside>
      </div>

      {/* Job Modal */}
      {selectedJob && (
        <JobModal 
          job={selectedJob} 
          isOpen={isModalOpen} 
          onClose={handleCloseModal} 
        />
      )}
    </main>
  );
}
