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

  // ------------------------------
  //  Профайл мэдээллийг татах
  // ------------------------------
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

  // ------------------------------
  //  LOGO солих
  // ------------------------------
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setProfile(prev => ({ ...prev, logo: url }));
    }
  };

  // ------------------------------
  //  ПРОФАЙЛ UPDATE хийх
  // ------------------------------
  const handleSave = async () => {
    const userId = localStorage.getItem("employer_user_id");
    if (!userId) return;

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

      // SUCCESS MODAL SHOW
      setSuccessMessage("Профайл амжилттай хадгалагдлаа!");
      setIsSuccessOpen(true);

      setTimeout(() => {
        setIsSuccessOpen(false);
      }, 2000);

      setIsEditing(false);

    } catch (err) {
      console.error("Хадгалахад алдаа:", err);
      alert("Хадгалах үед алдаа гарлаа.");
    }
  };

  // ------------------------------
  //  LOGOUT
  // ------------------------------
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
          <label className="block text-lg font-semibold mb-2">Компанийн Лого</label>
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
        <div className="mb-6">
          <label className="block text-lg font-semibold mb-2">Компанийн нэр</label>
          <input
            type="text"
            value={profile.companyName}
            readOnly={!isEditing}
            onChange={(e) => setProfile(prev => ({ ...prev, companyName: e.target.value }))}
            className={`w-full p-3 rounded-md border ${
              isEditing ? "border-gray-600 bg-gray-700 text-white" : "border-gray-700 bg-gray-800 text-gray-400"
            }`}
          />
        </div>

        <div className="mb-6">
          <label className="block text-lg font-semibold mb-2">Салбар</label>
          <input
            type="text"
            value={profile.industry}
            readOnly={!isEditing}
            onChange={(e) => setProfile(prev => ({ ...prev, industry: e.target.value }))}
            className={`w-full p-3 rounded-md border ${
              isEditing ? "border-gray-600 bg-gray-700 text-white" : "border-gray-700 bg-gray-800 text-gray-400"
            }`}
          />
        </div>

        <div className="mb-6">
          <label className="block text-lg font-semibold mb-2">Байршил</label>
          <input
            type="text"
            value={profile.location}
            readOnly={!isEditing}
            onChange={(e) => setProfile(prev => ({ ...prev, location: e.target.value }))}
            className={`w-full p-3 rounded-md border ${
              isEditing ? "border-gray-600 bg-gray-700 text-white" : "border-gray-700 bg-gray-800 text-gray-400"
            }`}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-lg font-semibold mb-2">Имэйл</label>
            <input
              type="email"
              value={profile.email}
              readOnly
              className="w-full p-3 rounded-md border border-gray-700 bg-gray-800 text-gray-400"
            />
          </div>

          <div>
            <label className="block text-lg font-semibold mb-2">Утас</label>
            <input
              type="text"
              value={profile.phone}
              readOnly={!isEditing}
              onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
              className={`w-full p-3 rounded-md border ${
                isEditing ? "border-gray-600 bg-gray-700 text-white" : "border-gray-700 bg-gray-800 text-gray-400"
              }`}
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-lg font-semibold mb-2">Компанийн танилцуулга</label>
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

      {/* SUCCESS MODAL */}
      <SuccessModal isOpen={isSuccessOpen} message={successMessage} />
    </div>
  );
}
