"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import { useRouter } from "next/navigation"; // ✅ NEXT.JS navigation

interface Candidate {
  id: number;
  name: string;
  profession: string;
  skills: string[];
  location: string;
  experience: string;
  age: number;
  gender: "Эрэгтэй" | "Эмэгтэй" | "Бусад";
}

interface CandidateDashboardProps {
  onLogout: () => void;
}

const CANDIDATES: Candidate[] = [
  { id: 1, name: "Бат-Эрдэнэ", profession: "Full-Stack Developer", skills: ["React", "Node.js", "MongoDB", "TypeScript"], location: "Токио, Япон", experience: "5 жил", age: 29, gender: "Эрэгтэй" },
  { id: 2, name: "Сарнай", profession: "UI/UX Designer", skills: ["Figma", "Sketch", "Prototyping", "UX Research"], location: "Осака, Япон", experience: "3 жил", age: 25, gender: "Эмэгтэй" },
  { id: 3, name: "Ганзориг", profession: "Data Analyst", skills: ["Python", "SQL", "Tableau", "R"], location: "Сайтама, Япон", experience: "2 жил", age: 32, gender: "Эрэгтэй" },
  { id: 4, name: "Наран", profession: "Project Manager", skills: ["Scrum", "Agile", "Jira", "Risk Management"], location: "Итикава, Япон", experience: "7 жил", age: 35, gender: "Эмэгтэй" },
  { id: 5, name: "Тулга", profession: "Frontend Developer", skills: ["React", "CSS", "JavaScript", "Redux"], location: "Токио, Япон", experience: "1 жил", age: 24, gender: "Эрэгтэй" },
];

const CandidateDashboard: React.FC<CandidateDashboardProps> = ({ onLogout }) => {
  const router = useRouter(); // ⚡ React Router биш — зөв Next.js router

  const [searchTerm, setSearchTerm] = useState("");
  const [minAge, setMinAge] = useState("");
  const [maxAge, setMaxAge] = useState("");
  const [genderFilter, setGenderFilter] = useState("");

  // Бургер меню
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Click outside → меню хаах
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Шүүлтүүрийн логик
  const filteredCandidates = useMemo(() => {
    return CANDIDATES.filter((candidate) => {
      const matchesSearchTerm =
        candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
        candidate.profession.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.location.toLowerCase().includes(searchTerm.toLowerCase());

      const minAgeNum = parseInt(minAge);
      const maxAgeNum = parseInt(maxAge);

      return (
        matchesSearchTerm &&
        (minAge === "" || candidate.age >= minAgeNum) &&
        (maxAge === "" || candidate.age <= maxAgeNum) &&
        (genderFilter === "" || candidate.gender === genderFilter)
      );
    });
  }, [searchTerm, minAge, maxAge, genderFilter]);

  return (
    <div className="min-h-screen bg-gray-800 text-gray-100">
      {/* HEADER */}
      <header className="bg-gray-800 shadow-lg border-b border-gray-700 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Ажил Олгогчийн Самбар</h1>

          {/* Бургер меню */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="text-white text-3xl hover:text-emerald-400"
            >
              ☰
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-900 border border-gray-700 rounded-lg shadow-lg py-2 z-50">
                {/* Профайл → Next.js router.push */}
                <button
                  className="w-full text-left px-4 py-2 text-gray-200 hover:bg-gray-700"
                  onClick={() => {
                    setMenuOpen(false);
                    router.push("/employer-profile");
                  }}
                >
                  Профайл
                </button>

                {/* Ажил нэмэх → navigate */}
                <button
                  className="w-full text-left px-4 py-2 text-gray-200 hover:bg-gray-700"
                  onClick={() => {
                    setMenuOpen(false);
                    router.push("/add-job");
                  }}
                >
                  Ажил нэмэх
                </button>

                {/* Logout */}
                <button
                  className="w-full text-left px-4 py-2 text-red-400 hover:bg-gray-700"
                  onClick={onLogout}
                >
                  Гарах
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Шүүлтүүр */}
        <section className="mb-8 p-6 bg-gray-900 rounded-lg border border-gray-800">
          <h3 className="text-xl font-semibold mb-4 text-white border-b border-gray-700 pb-2">
            Шүүлтүүр
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            <input
              type="text"
              placeholder="Ур чадвар, нэр, байршил..."
              className="col-span-2 p-3 rounded-md bg-gray-800 border border-gray-700 text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <input
              type="number"
              placeholder="Нас (Мин)"
              className="p-3 rounded-md bg-gray-800 border border-gray-700 text-white"
              value={minAge}
              onChange={(e) => setMinAge(e.target.value)}
            />

            <input
              type="number"
              placeholder="Нас (Макс)"
              className="p-3 rounded-md bg-gray-800 border border-gray-700 text-white"
              value={maxAge}
              onChange={(e) => setMaxAge(e.target.value)}
            />

            <select
              className="p-3 rounded-md bg-gray-800 border border-gray-700 text-white cursor-pointer"
              value={genderFilter}
              onChange={(e) => setGenderFilter(e.target.value)}
            >
              <option value="">-- Бүх хүйс --</option>
              <option value="Эрэгтэй">Эрэгтэй</option>
              <option value="Эмэгтэй">Эмэгтэй</option>
              <option value="Бусад">Бусад</option>
            </select>
          </div>
        </section>

        <h2 className="text-2xl font-bold mb-6 text-white">
          Олдсон Ажил Хайгчид ({filteredCandidates.length})
        </h2>

        {/* Картууд */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCandidates.length > 0 ? (
            filteredCandidates.map((candidate) => (
              <div
                key={candidate.id}
                className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-emerald-500 transition"
              >
                <div className="mb-4 pb-3 border-b border-gray-700">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-emerald-400">{candidate.name}</h3>
                    <span className="text-xs px-2 py-1 bg-gray-700 rounded-md text-gray-300">
                      {candidate.experience}
                    </span>
                  </div>
                  <p className="text-md text-gray-400 mt-1">{candidate.profession}</p>
                </div>

                <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-300 mb-4">
                  <p>📍 {candidate.location}</p>
                  <p>🎂 Нас: {candidate.age}</p>
                  <p>🚻 Хүйс: {candidate.gender}</p>
                </div>

                <h4 className="text-md font-semibold mb-2 text-gray-200">Ур чадварууд:</h4>
                <div className="flex flex-wrap gap-2 mb-4">
                  {candidate.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-700 text-xs text-gray-300 rounded-full border border-gray-600 hover:bg-emerald-600 hover:text-white"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <button className="mt-4 w-full py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-white font-bold">
                  Дэлгэрэнгүй CV үзэх
                </button>
              </div>
            ))
          ) : (
            <p className="text-xl text-gray-400 col-span-full text-center p-10 bg-gray-800 rounded-lg border border-gray-700">
              Таны хайлтад тохирох ажил хайгч олдсонгүй.
            </p>
          )}
        </div>
      </main>
    </div>
  );
};

export default CandidateDashboard;
