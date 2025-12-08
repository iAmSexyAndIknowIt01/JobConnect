"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClients";
import EmployerNavbar from "@/components/EmployerNavbar";
import JobDetailModal from "./JobDetailModal";
import JobEditModal from "./JobEditModal";
import JobDeleteModal from "./JobDeleteModal";
import { exportToCSV } from "@/utils/exportCsv";

export default function EmployerJobListPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Pagination
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5); // 5, 10, 15 боломжтой
  const [totalJobs, setTotalJobs] = useState(0); // нийт ажлын байрны тоо

  // Modals
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [editJob, setEditJob] = useState<any>(null);
  const [deleteJobId, setDeleteJobId] = useState<number | null>(null);

  const fetchJobs = async () => {
    setLoading(true);
    const employerID = localStorage.getItem("employer_user_id");
    if (!employerID) return;

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, count, error } = await supabase
      .from("open_jobs")
      .select("*", { count: "exact" })
      .eq("employer_company", employerID)
      .order("created_at", { ascending: false })
      .range(from, to);

    if (!error) {
      setJobs(data || []);
      setTotalJobs(count || 0);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchJobs();
  }, [page, limit]);

  const isModalOpen = selectedJob || editJob || deleteJobId;

  return (
    <div className="relative min-h-screen bg-gray-900 text-white pb-20">
      <EmployerNavbar />

      {/* Арын хэсэг */}
      <div className={`${isModalOpen ? "filter blur-sm" : ""}`}>
        <div className="p-8 max-w-7xl mx-auto bg-gray-800 border border-gray-700 rounded-xl shadow-xl mt-8 overflow-x-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-emerald-400">Ажлын байрны жагсаалт</h1>

            <div className="flex items-center gap-4">
              <label htmlFor="limit" className="text-gray-300">Харагдах тоо:</label>
              <select
                id="limit"
                value={limit}
                onChange={(e) => { setLimit(Number(e.target.value)); setPage(1); }}
                className="bg-gray-700 text-white px-2 py-1 rounded"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
              </select>

              <button
                className="bg-yellow-500 hover:bg-yellow-400 px-4 py-2 rounded text-black font-semibold"
                onClick={() => exportToCSV(jobs, "jobs.csv")}
              >
                CSV экспорт
              </button>
            </div>
          </div>

          {loading ? (
            <p className="text-gray-400">Түр хүлээнэ үү...</p>
          ) : jobs.length === 0 ? (
            <p className="text-gray-500">Ажлын зар олдсонгүй.</p>
          ) : (
            <>
              <table className="w-full text-left border-collapse min-w-[1200px]">
                <thead>
                  <tr className="bg-gray-700 text-white text-sm">
                    <th className="p-3 border border-gray-600">Гарчиг</th>
                    <th className="p-3 border border-gray-600">Байршил</th>
                    <th className="p-3 border border-gray-600">Цалин</th>
                    <th className="p-3 border border-gray-600">Төрөл</th>
                    <th className="p-3 border border-gray-600">Шаардлага</th>
                    <th className="p-3 border border-gray-600">Давуу тал</th>
                    <th className="p-3 border border-gray-600">Үйлдэл</th>
                  </tr>
                </thead>
                <tbody>
                  {jobs.map((job) => (
                    <tr key={job.id} className="bg-gray-900 text-gray-200 h-[65px]">
                      <td className="p-3 border border-gray-700 max-w-[200px] truncate">{job.title}</td>
                      <td className="p-3 border border-gray-700 max-w-[150px] truncate">{job.location}</td>
                      <td className="p-3 border border-gray-700 max-w-[120px] truncate">{job.salary}</td>
                      <td className="p-3 border border-gray-700 max-w-[150px] truncate">{job.job_type}</td>
                      <td className="p-3 border border-gray-700 max-w-60 truncate">{job.requirements}</td>
                      <td className="p-3 border border-gray-700 max-w-60 truncate">{job.benefits}</td>
                      <td className="p-3 border border-gray-700">
                        <div className="flex gap-2">
                          <button
                            className="bg-emerald-600 hover:bg-emerald-500 px-3 py-1 rounded text-sm"
                            onClick={() => setSelectedJob(job)}
                          >
                            Дэлгэрэнгүй
                          </button>

                          <button
                            className="bg-blue-600 hover:bg-blue-500 px-3 py-1 rounded text-sm"
                            onClick={() => setEditJob(job)}
                          >
                            Засах
                          </button>

                          <button
                            className="bg-red-600 hover:bg-red-500 px-3 py-1 rounded text-sm"
                            onClick={() => setDeleteJobId(job.id)}
                          >
                            Устгах
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination */}
              <div className="flex justify-center gap-4 mt-6">
                <button
                  className="px-4 py-2 bg-gray-700 rounded disabled:opacity-40"
                  disabled={page <= 1}
                  onClick={() => setPage(page - 1)}
                >
                  Өмнөх
                </button>
                <button
                  className="px-4 py-2 bg-gray-700 rounded disabled:opacity-40"
                  disabled={page * limit >= totalJobs} // totalJobs-с хэтэрвэл идэвхгүй
                  onClick={() => setPage(page + 1)}
                >
                  Дараах
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Modal overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-md z-50 flex items-center justify-center">
          {selectedJob && (
            <JobDetailModal job={selectedJob} onClose={() => setSelectedJob(null)} />
          )}
          {editJob && (
            <JobEditModal job={editJob} onClose={() => setEditJob(null)} onUpdated={fetchJobs} />
          )}
          {deleteJobId && (
            <JobDeleteModal jobId={deleteJobId} onClose={() => setDeleteJobId(null)} onDeleted={fetchJobs} />
          )}
        </div>
      )}
    </div>
  );
}
