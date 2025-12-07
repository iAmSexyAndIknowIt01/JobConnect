"use client";

import React, { useState } from "react";
import EmployerNavbar from "@/components/EmployerNavbar";
import SuccessModal from "@/components/SuccessModal";
import { supabase } from "@/lib/supabaseClients"; // Supabase client

const EmployerAddJob = () => {
  const [title, setTitle] = useState("");
  const [jobType, setJobType] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [workSchedule, setWorkSchedule] = useState("");
  const [requirements, setRequirements] = useState("");
  const [benefits, setBenefits] = useState("");
  const [industry, setIndustry] = useState("");
  const [description, setDescription] = useState("");

  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const employerId = sessionStorage.getItem("employer_user_id");
    console.log("Employer ID:", employerId);
    if (
      !title || !jobType || !location || !salary ||
      !workSchedule || !requirements || !benefits ||
      !industry || !description
    ) {
      alert("Бүх талбарыг заавал бөглөх ёстой!");
      return;
    }

    const jobData = {
      title,
      location,
      description,
      salary,
      industry,
      status: "1",
      valid: "1",
      job_type: jobType,
      work_schedule: workSchedule,
      requirements,
      benefits,
      employer_company: employerId,
      created_at: new Date(),
      updated_at: new Date(),
    };

    try {
      const { data, error } = await supabase
        .from("open_jobs")
        .insert([jobData]);

      if (error) {
        console.error("Insert хийхэд алдаа:", error);
        alert("Ажил нэмэхэд алдаа гарлаа.");
        return;
      }

      setSuccessMessage("Ажил амжилттай нэмэгдлээ!");
      setIsSuccessOpen(true);
      setTimeout(() => setIsSuccessOpen(false), 2000);

      setTitle("");
      setJobType("");
      setLocation("");
      setSalary("");
      setWorkSchedule("");
      setRequirements("");
      setBenefits("");
      setIndustry("");
      setDescription("");

    } catch (err) {
      console.error("Алдаа:", err);
      alert("Ажил нэмэх үед алдаа гарлаа.");
    }
  };

  // const handleLogout = () => {
  //   localStorage.removeItem("employer_user_id");
  // };

  return (
    <div className="min-h-screen bg-gray-900 text-white pb-20">
      <EmployerNavbar />

      <div className="p-8 max-w-4xl mx-auto bg-gray-800 border border-gray-700 rounded-xl shadow-xl mt-8">
        <h1 className="text-3xl font-bold text-emerald-400 mb-6">Ажлын шинэ зар нэмэх</h1>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Ажлын нэр */}
          <div>
            <label className="block text-lg font-semibold mb-2">
              Ажлын нэр <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Программист, Маркетер, Дизайнер гэх мэт"
              required
              className="w-full p-3 rounded-md border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Ажлын төрөл */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-lg font-semibold mb-2">
                Ажлын төрөл <span className="text-red-500">*</span>
              </label>
              <select
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
                required
                className="w-full p-3 rounded-md border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="">Сонгоно уу</option>
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="contract">Contract</option>
                <option value="internship">Internship</option>
              </select>
            </div>

            <div>
              <label className="block text-lg font-semibold mb-2">
                Ажлын байршил <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Tokyo, Chiyoda-ku гэх мэт"
                required
                className="w-full p-3 rounded-md border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Салбар */}
          <div>
            <label className="block text-lg font-semibold mb-2">
              Салбар / Industry <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              placeholder="IT, Finance, Education гэх мэт"
              required
              className="w-full p-3 rounded-md border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Цалин */}
          <div>
            <label className="block text-lg font-semibold mb-2">
              Цалин бүтэц <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              placeholder="¥300,000 – ¥500,000 / сар"
              required
              className="w-full p-3 rounded-md border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Ажлын хуваарь */}
          <div>
            <label className="block text-lg font-semibold mb-2">
              Ажлын хуваарь <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={workSchedule}
              onChange={(e) => setWorkSchedule(e.target.value)}
              placeholder="9:00 – 18:00, Shift, Flexible гэх мэт"
              required
              className="w-full p-3 rounded-md border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Шаардлага */}
          <div>
            <label className="block text-lg font-semibold mb-2">
              Шаардлага / Requirements <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={4}
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              placeholder="Боловсрол, туршлага, ур чадвар"
              required
              className="w-full p-3 rounded-md border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Давуу тал */}
          <div>
            <label className="block text-lg font-semibold mb-2">
              Ажлын давуу тал / Benefits <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={3}
              value={benefits}
              onChange={(e) => setBenefits(e.target.value)}
              placeholder="Housing allowance, Insurance, Commuting support гэх мэт"
              required
              className="w-full p-3 rounded-md border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Тайлбар */}
          <div>
            <label className="block text-lg font-semibold mb-2">
              Ажлын тайлбар / Job Description <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ажлын гол үүрэг, төсөл болон боломжуудыг дэлгэрэнгүй бичнэ үү"
              required
              className="w-full p-3 rounded-md border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-lg text-lg shadow-md"
          >
            Ажил нэмэх
          </button>
        </form>
      </div>

      <SuccessModal isOpen={isSuccessOpen} message={successMessage} />
    </div>
  );
};

export default EmployerAddJob;
