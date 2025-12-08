"use client";

import { supabase } from "@/lib/supabaseClients";
import { useEffect, useState } from "react";

export default function JobDetailPage({ params }: any) {
  const { id } = params;
  const [job, setJob] = useState<any>(null);

  useEffect(() => {
    const fetchJob = async () => {
      const { data } = await supabase
        .from("open_jobs")
        .select("*")
        .eq("id", id)
        .single();

      setJob(data);
    };

    fetchJob();
  }, [id]);

  if (!job) return <p className="p-6 text-gray-400">Уншиж байна...</p>;

  return (
    <div className="p-8 text-white">
      <h1 className="text-3xl font-bold text-emerald-400">{job.title}</h1>

      <div className="mt-6 space-y-3 text-gray-300">
        <p><strong>Байршил:</strong> {job.location}</p>
        <p><strong>Цалин:</strong> {job.salary}</p>
        <p><strong>Ажлын төрөл:</strong> {job.job_type}</p>
        <p><strong>Ажлын цаг:</strong> {job.work_schedule}</p>
        <p><strong>Тодорхойлолт:</strong> {job.description}</p>
        <p><strong>Шаардлага:</strong> {job.requirements}</p>
        <p><strong>Давуу тал:</strong> {job.benefits}</p>
      </div>
    </div>
  );
}
