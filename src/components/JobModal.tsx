"use client";

import React, { useState, useEffect } from 'react';
import SuccessModal from "@/components/SuccessModal";
import FailedModal from "@/components/FailedModal";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

interface Job {
  id: number | string;
  title: string;
  location: string;
  description: string;
  salary?: string | null;
  employer_company?: string | null; // ID
  job_type?: string | null;
  work_schedule?: string | null;
  requirements?: string | null;
  benefits?: string | null;
  industry?: string | null;
}

interface JobModalProps {
  job: Job;
  isOpen: boolean;
  onClose: () => void;
}

const supabase = createClientComponentClient(); // Supabase client

const JobModal: React.FC<JobModalProps> = ({ job, isOpen, onClose }) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [companyName, setCompanyName] = useState<string | null>(null);
  const [requestStatus, setRequestStatus] = useState<string | null>(null);
  const [canApply, setCanApply] = useState<boolean>(true);


  // 🔹 Modal нээгдсэн үед компанийн нэрийг fetch хийх
  useEffect(() => {
    if (!isOpen || !job.employer_company) return;
    const userId = sessionStorage.getItem("userId");
    if (!userId) return;

    const fetchRequestStatus = async () => {
      const { data, error } = await supabase
        .from("open_request")
        .select("status")
        .eq("jobid", job.id)
        .eq("workerid", userId)
        .limit(1) 
        .maybeSingle();

        if (error) {
          console.error("Error fetching request status:", error);
          return;
        }

        if (data?.status) {
          setRequestStatus(data.status);
          setCanApply(false);
        } else {
          setRequestStatus(null);
          setCanApply(true);
        }
    };
    fetchRequestStatus();  

    const fetchCompanyName = async () => {
      const { data, error } = await supabase
        .from('employer_accounts')
        .select('company_name')
        .eq('id', job.employer_company)
        .single();

      if (error) {
        console.error('Error fetching company name:', error);
        setCompanyName('Мэдээлэл олдсонгүй');
        return;
      }

      setCompanyName(data.company_name);
    };

    fetchCompanyName();
  }, [job.employer_company, isOpen]);

  const handleApply = async () => {
    const userId = sessionStorage.getItem("userId");

    if (!userId) {
      setShowError(true);
      setTimeout(() => setShowError(false), 1500);
      return;
    }

    try {
      const requestId = crypto.randomUUID(); // 🔥 random UUID

      const { error } = await supabase
        .from('open_request')
        .insert([
          {
            requestid: requestId,
            jobid: job.id,
            workerid: userId,
            status: 'pending',
            valid: true
            // createdate, updatedate → DB default
          }
        ]);

      if (error) throw error;
      // 📧 Компанид email илгээх
      await fetch("/api/notify-company", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requestId }),
      });

      setRequestStatus("pending");
      setCanApply(false);

      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        onClose();
      }, 1500);

    } catch (err) {
      console.log('Error applying for job:', err);
      setShowError(true);
      setTimeout(() => setShowError(false), 1500);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
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
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none"
                   viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-4">
            <p className="text-lg font-semibold text-gray-300">
              📍 Байршил: <span className="text-red-400">{job.location}</span>
            </p>

            {companyName && (
              <p className="text-gray-300">
                🏢 Компани: <span className="text-blue-300">{companyName}</span>
              </p>
            )}

            {job.salary && (
              <p className="text-gray-300">
                💰 Цалин: <span className="text-green-300">{job.salary}</span>
              </p>
            )}

            {job.job_type && (
              <p className="text-gray-300">
                📝 Ажил төрөл: <span className="text-blue-300">{job.job_type}</span>
              </p>
            )}

            {job.work_schedule && (
              <p className="text-gray-300">
                ⏰ Ажлын цаг: <span className="text-blue-300">{job.work_schedule}</span>
              </p>
            )}

            {job.industry && (
              <p className="text-gray-300">
                🏷️ Салбар: <span className="text-blue-300">{job.industry}</span>
              </p>
            )}

            <hr className="border-gray-700" />

            <h3 className="text-xl font-semibold text-gray-200">Ажлын тодорхойлолт</h3>
            <p className="text-gray-300 whitespace-pre-line">{job.description}</p>

            {job.requirements && (
              <>
                <h3 className="text-xl font-semibold text-gray-200 mt-4">Шаардлага</h3>
                <p className="text-gray-300 whitespace-pre-line">{job.requirements}</p>
              </>
            )}

            {job.benefits && (
              <>
                <h3 className="text-xl font-semibold text-gray-200 mt-4">Давуу талууд</h3>
                <p className="text-gray-300 whitespace-pre-line">{job.benefits}</p>
              </>
            )}

            <div className="pt-4">
              {canApply ? (
                <button
                  onClick={handleApply}
                  className="w-full py-3 bg-green-600 text-white rounded-lg
                            hover:bg-green-700 transition duration-300
                            font-semibold text-lg"
                >
                  Ажилд хүсэлт илгээх
                </button>
              ) : (
                <button
                  disabled
                  className="w-full py-3 bg-gray-600 text-gray-300 rounded-lg
                            cursor-not-allowed font-semibold text-lg"
                >
                  {requestStatus}
                </button>
              )}
            </div>

          </div>
        </div>
      </div>

      <FailedModal isOpen={showError} message="Эхлээд нэвтэрнэ үү!" />
      <SuccessModal isOpen={showSuccess} message="Ажилд хүсэлт амжилттай илгээлээ!" />
    </>
  );
};

export default JobModal;
