"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClients";
import SuccessModal from "@/components/SuccessModal";
import CandidateDashboard from "@/components/CandidateDashboard";

export default function EmployerAuth() {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleLogout = () => setIsLoggedIn(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (isLogin) {
      const { data } = await supabase
        .from("employer_accounts")
        .select("*")
        .eq("email", email)
        .eq("password", password)
        .single();
        
      if (!data) return setError("Имэйл эсвэл нууц үг буруу байна!");
      localStorage.setItem("employer_user_id", data.id);// localStorage-д хадгалах
      sessionStorage.setItem("employer_user_id", data.id); 


      // Амжилттай нэвтрэх
      setSuccessMessage("Амжилттай нэвтэрлээ!");
      setShowSuccessModal(true);

      setTimeout(() => {
        setIsLoggedIn(true);
        setShowSuccessModal(false);
      }, 1500);

      return;
    }

    // Бүртгүүлэх үед
    if (password !== confirmPassword) return setError("Нууц үг таарахгүй байна!");

    try {
      // Давтагдахгүй UUID үүсгэх
      const userId = crypto.randomUUID();

      // 1. employer_accounts руу insert хийх
      const { data: accountData, error: insertErr } = await supabase
        .from("employer_accounts")
        .insert([{
          id: userId,
          company_name: companyName,
          email,
          password
        }])
        .select()
        .single();

      if (insertErr) throw insertErr;

      // 2. employer_profile руу insert хийх
      const { error: profileErr } = await supabase
        .from("employer_profile")
        .insert([{
          id: userId,           // employer_accounts-ийн UUID-г ашиглана
          company_name: companyName
        }]);

      if (profileErr) throw profileErr;

      setSuccessMessage("Амжилттай бүртгүүллээ!");
      setShowSuccessModal(true);

      setTimeout(() => {
        setShowSuccessModal(false);
        setIsLogin(true); // Нэвтрэх form руу шилжих
      }, 1500);

    } catch (err) {
      console.log(err);
      console.error(err);
      setError("Бүртгүүлэхэд алдаа гарлаа!");
    }
  };

  if (isLoggedIn) return <CandidateDashboard onLogout={handleLogout} />;

  return (
    <>
      <SuccessModal isOpen={showSuccessModal} message={successMessage} />

      <div className="min-h-screen flex overflow-hidden bg-[#0b1210]">
        {/* LEFT – 70% SECTION */}
        <div className="hidden md:flex w-[70%] relative overflow-hidden px-12 py-14">
          <div className="absolute inset-0 bg-linear-to-br from-emerald-900 via-[#083a2e] to-black animate-gradientFlow" />
          <div className="absolute top-20 left-16 w-64 h-64 bg-emerald-500/20 blur-3xl rounded-full animate-floatSlow"></div>
          <div className="absolute bottom-20 right-24 w-80 h-80 bg-emerald-400/15 blur-3xl rounded-full animate-floatSlow delay-300"></div>

          <div className="relative z-10 text-white flex flex-col justify-between h-full">
            <div>
              <h1 className="text-6xl font-extrabold tracking-tight">
                MStaffing <span className="text-emerald-400">Pro</span>
              </h1>
              <p className="max-w-lg mt-4 text-lg text-emerald-100/80 leading-relaxed">
                Монгол — Японы ажлын зах зээлд чиглэсэн  
                <span className="text-emerald-300 font-semibold"> шинэ үеийн ажилд авах платформ.</span>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-7 mt-12">
              <div className="glass-card-emerald p-6 hover:scale-105 transition-transform duration-300">
                <h3 className="text-white text-lg font-semibold">🇲🇳 Монголын мэдээ</h3>
                <p className="text-emerald-100/80 text-sm mt-2">
                  Монголын технологийн салбар хурдацтай өсөж, Япон компаниуд хамтын ажиллагааг нэмэгдүүлж байна.
                </p>
              </div>
              <div className="glass-card-emerald p-6 hover:scale-105 transition-transform duration-300">
                <h3 className="text-white text-lg font-semibold">🇯🇵 Японы ажиллах хүч</h3>
                <p className="text-emerald-100/80 text-sm mt-2">
                  Японы IT, caregiver салбарууд Монгол мэргэжилтнүүдэд нээлттэй хэвээр байна.
                </p>
              </div>
            </div>

            <p className="text-emerald-200/60 mt-10">© 2025 MStaffing Emerald Edition</p>
          </div>
        </div>

        {/* RIGHT – FORM SECTION */}
        <div className="w-full md:w-[30%] flex items-center justify-center p-10 relative bg-[#0b1210]">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md bg-emerald-900/20 backdrop-blur-xl border border-emerald-500/30 p-10 rounded-3xl shadow-[0_8px_32px_0_rgba(16,255,155,0.3)] flex flex-col"
          >
            <h2 className="text-4xl text-white text-center mb-8 tracking-wide drop-shadow-md" style={{ fontFamily: '"Poppins", sans-serif' }}>
              {isLogin ? "Нэвтрэх" : "Бүртгүүлэх"}
            </h2>

            {!isLogin && (
              <input
                type="text"
                placeholder="Компанийн нэр"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full mb-5 px-5 py-3 rounded-2xl bg-emerald-800/25 border border-emerald-500/40 text-emerald-50 placeholder-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow-inner transition-all duration-300"
                required
              />
            )}

            <input
              type="email"
              placeholder="Имэйл"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mb-5 px-5 py-3 rounded-2xl bg-emerald-800/25 border border-emerald-500/40 text-emerald-50 placeholder-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow-inner transition-all duration-300"
              required
            />

            <input
              type="password"
              placeholder="Нууц үг"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mb-5 px-5 py-3 rounded-2xl bg-emerald-800/25 border border-emerald-500/40 text-emerald-50 placeholder-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow-inner transition-all duration-300"
              required
            />

            {!isLogin && (
              <input
                type="password"
                placeholder="Нууц үг давтах"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full mb-5 px-5 py-3 rounded-2xl bg-emerald-800/25 border border-emerald-500/40 text-emerald-50 placeholder-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow-inner transition-all duration-300"
                required
              />
            )}

            {error && <p className="text-red-400 text-center mb-4">{error}</p>}

            <button
              type="submit"
              className="w-full py-3 mt-2 bg-emerald-500/90 hover:bg-emerald-600/95 text-white rounded-2xl font-bold shadow-[0_4px_16px_rgba(16,255,155,0.4)] hover:shadow-[0_6px_20px_rgba(16,255,155,0.5)] transition-all duration-300 transform hover:-translate-y-1"
            >
              {isLogin ? "Нэвтрэх" : "Бүртгүүлэх"}
            </button>

            <p className="text-center text-emerald-200 mt-5 text-sm">
              {isLogin ? "Шинэ үү?" : "Бүртгэлтэй юу?"}{" "}
              <span
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError("");
                }}
                className="text-emerald-400 cursor-pointer hover:underline font-semibold"
              >
                {isLogin ? "Бүртгүүлэх" : "Нэвтрэх"}
              </span>
            </p>
          </form>
        </div>
      </div>

      {/* GLOBAL STYLES */}
      <style jsx global>{`
        .glass-card-emerald {
          background: rgba(14, 40, 30, 0.35);
          border: 1px solid rgba(16, 255, 155, 0.25);
          backdrop-filter: blur(14px);
          border-radius: 18px;
        }
        .animate-gradientFlow {
          animation: gradientFlow 15s ease infinite;
        }
        @keyframes gradientFlow {
          0% { filter: hue-rotate(0deg); }
          50% { filter: hue-rotate(25deg); }
          100% { filter: hue-rotate(0deg); }
        }
        .animate-floatSlow {
          animation: floatSlow 6s ease-in-out infinite;
        }
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-scaleIn {
          animation: scaleIn 0.5s ease-out;
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </>
  );
}
