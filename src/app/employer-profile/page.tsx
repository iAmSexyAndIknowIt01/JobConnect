"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClients";
import EmployerNavbar from "@/components/EmployerNavbar";
import SuccessModal from "@/components/SuccessModal";

export default function EmployerProfilePage() {
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    logo: null as string | null,
    companyName: "",
    industry: "",
    location: "",
    email: "",
    phone: "",
    description: ""
  });

  // Success Modal state
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const userId = localStorage.getItem("employer_user_id");
      if (!userId) return;

      try {
        const { data: accountData } = await supabase
          .from("employer_accounts")
          .select("email")
          .eq("id", userId)
          .single();

        const { data: profileData } = await supabase
          .from("employer_profile")
          .select("company_name, industry, location, phone, description")
          .eq("id", userId)
          .single();

        setProfile({
          logo: null,
          companyName: profileData?.company_name || "",
          industry: profileData?.industry || "",
          location: profileData?.location || "",
          email: accountData?.email || "",
          phone: profileData?.phone || "",
          description: profileData?.description || ""
        });

      } catch (err) {
        console.error("Profile татахад алдаа:", err);
      }
    };

    fetchProfile();
  }, []);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setProfile(prev => ({ ...prev, logo: url }));
    }
  };

  const handleSave = async () => {
    const userId = localStorage.getItem("employer_user_id");
    if (!userId) return;

    // ----------------------------------------
    // Заавал бөглөх талбаруудыг шалгах
    // ----------------------------------------
    if (
      !profile.companyName ||
      !profile.industry ||
      !profile.location ||
      !profile.phone ||
      !profile.description
    ) {
      alert("Бүх талбарыг заавал бөглөнө үү!");
      return;
    }

    try {
      const { error: profileErr } = await supabase
        .from("employer_profile")
        .update({
          company_name: profile.companyName,
          industry: profile.industry,
          location: profile.location,
          phone: profile.phone,
          description: profile.description
        })
        .eq("id", userId);

      if (profileErr) throw profileErr;

      setSuccessMessage("Профайл амжилттай хадгалагдлаа!");
      setIsSuccessOpen(true);
      setTimeout(() => setIsSuccessOpen(false), 2000);

      setIsEditing(false);

    } catch (err) {
      console.error("Хадгалахад алдаа:", err);
      alert("Хадгалах үед алдаа гарлаа.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("employer_user_id");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white pb-20">
      <EmployerNavbar onLogout={handleLogout} />

      <div className="p-8 max-w-3xl mx-auto bg-gray-800 border border-gray-700 rounded-xl shadow-xl mt-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-emerald-400">Ажил Олгогчийн Профайл</h1>
          <button
            onClick={() => setIsEditing(prev => !prev)}
            className="bg-emerald-600 hover:bg-emerald-500 text-white py-2 px-4 rounded-lg font-semibold"
          >
            {isEditing ? "Харах" : "Засах"}
          </button>
        </div>

        {/* LOGO */}
        <div className="mb-6">
          <label className="block text-lg font-semibold mb-2">Компанийн Лого <span className="text-red-500">*</span></label>
          <div className="flex items-center gap-4">
            <div className="w-28 h-28 bg-gray-700 border border-gray-600 rounded-lg flex items-center justify-center overflow-hidden">
              {profile.logo ? (
                <img src={profile.logo} alt="Logo" className="w-full h-full object-cover" />
              ) : (
                <span className="text-gray-400 text-sm">Лого байхгүй</span>
              )}
            </div>
            {isEditing && (
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
                className="text-gray-300"
              />
            )}
          </div>
        </div>

        {/* FORM FIELDS */}
        {[
          { label: "Компанийн нэр", key: "companyName" },
          { label: "Салбар", key: "industry" },
          { label: "Байршил", key: "location" },
          { label: "Утас", key: "phone" },
          { label: "Компанийн танилцуулга", key: "description" }
        ].map(field => (
          <div className="mb-6" key={field.key}>
            <label className="block text-lg font-semibold mb-2">
              {field.label} <span className="text-red-500">*</span>
            </label>
            {field.key === "description" ? (
              <textarea
                rows={5}
                value={profile.description}
                readOnly={!isEditing}
                onChange={(e) =>
                  setProfile(prev => ({ ...prev, description: e.target.value }))
                }
                className={`w-full p-3 rounded-md border ${
                  isEditing ? "border-gray-600 bg-gray-700 text-white" : "border-gray-700 bg-gray-800 text-gray-400"
                }`}
              />
            ) : (
              <input
                type={field.key === "phone" ? "text" : "text"}
                value={profile[field.key as keyof typeof profile] as string}
                readOnly={!isEditing}
                onChange={(e) =>
                  setProfile(prev => ({ ...prev, [field.key]: e.target.value }))
                }
                className={`w-full p-3 rounded-md border ${
                  isEditing ? "border-gray-600 bg-gray-700 text-white" : "border-gray-700 bg-gray-800 text-gray-400"
                }`}
              />
            )}
          </div>
        ))}

        {/* Email */}
        <div className="mb-6">
          <label className="block text-lg font-semibold mb-2">Имэйл</label>
          <input
            type="email"
            value={profile.email}
            readOnly
            className="w-full p-3 rounded-md border border-gray-700 bg-gray-800 text-gray-400"
          />
        </div>

        {isEditing && (
          <button
            onClick={handleSave}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-lg text-lg shadow-md"
          >
            Хадгалах
          </button>
        )}
      </div>

      <SuccessModal isOpen={isSuccessOpen} message={successMessage} />
    </div>
  );
}
