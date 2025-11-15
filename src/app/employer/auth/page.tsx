"use client";

import { useState } from "react";
// Ажил хайгчдын мэдээллийн самбарыг импортлоно
import CandidateDashboard from "@/components/CandidateDashboard"; 

export default function EmployerAuth() {
  const [isLogin, setIsLogin] = useState(true);
  // Шинэ state: Ажил олгогч нэвтэрсэн эсэх
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  // Form fields
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleLogout = () => {
    setIsLoggedIn(false);
    setSuccessMessage("Амжилттай гарлаа.");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage("");
    setError("");

    if (isLogin) {
      // ✅ Нэвтрэх логик (жишээ)
      if (email === "test@gmail.com" && password === "test") {
        // Нэвтрэх амжилттай!
        setIsLoggedIn(true); // Нэвтэрсэн төлөвийг true болгоно
        setSuccessMessage("Амжилттай нэвтэрлээ! Таны самбар руу шилжиж байна...");
        setError("");
      } else {
        setError("Имэйл эсвэл нууц үг буруу байна!");
        setIsLoggedIn(false);
      }
    } else {
      // ✅ Бүртгүүлэх логик
      if (password !== confirmPassword) {
        setError("Нууц үг таарахгүй байна!");
        return;
      }

      setSuccessMessage(`Амжилттай бүртгүүллээ! ${companyName} компани. Одоо нэвтэрнэ үү.`);
      
      // Формыг цэвэрлэх
      setCompanyName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setIsLogin(true); // нэвтрэх рүү шилжих
    }
  };
  
  // ------------------------------------------------------------------
  // 1. Хэрэв Нэвтэрсэн бол Ажил хайгчдын самбарыг харуулна
  // ------------------------------------------------------------------
  if (isLoggedIn) {
    return (
      <CandidateDashboard onLogout={handleLogout} />
    );
  }

  // ------------------------------------------------------------------
  // 2. Нэвтрээгүй бол Нэвтрэх/Бүртгүүлэх формыг харуулна
  // ------------------------------------------------------------------
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">
          {isLogin ? "Ажил олгогч нэвтрэх" : "Ажил олгогч бүртгүүлэх"}
        </h2>

        {/* ... Формын input-ууд (Өмнөхтэй ижил) ... */}
        {!isLogin && (
          <input
            type="text"
            placeholder="Компанийн нэр"
            className="w-full p-3 rounded-md mb-4 bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />
        )}

        <input
          type="email"
          placeholder="Имэйл"
          className="w-full p-3 rounded-md mb-4 bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Нууц үг"
          className="w-full p-3 rounded-md mb-4 bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {!isLogin && (
          <input
            type="password"
            placeholder="Нууц үг давтах"
            className="w-full p-3 rounded-md mb-4 bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        )}

        {error && <p className="text-red-400 mb-4 text-center">{error}</p>}
        {successMessage && <p className="text-green-400 mb-4 text-center">{successMessage}</p>}

        <button
          type="submit"
          className="w-full bg-emerald-500 hover:bg-emerald-600 py-3 rounded-md font-semibold transition"
        >
          {isLogin ? "Нэвтрэх" : "Бүртгүүлэх"}
        </button>

        <p className="mt-4 text-center text-gray-400">
          {isLogin ? "Шинэ ажил олгогч уу? " : "Аль хэдийн бүртгэлтэй юу? "}
          <button
            type="button"
            className="text-emerald-400 hover:underline"
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
              setSuccessMessage("");
            }}
          >
            {isLogin ? "Бүртгүүлэх" : "Нэвтрэх"}
          </button>
        </p>
      </form>
    </div>
  );
}