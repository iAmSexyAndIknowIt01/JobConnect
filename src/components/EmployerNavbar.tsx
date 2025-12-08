"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

const EmployerNavbar: React.FC = () => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.clear();
    router.push("/");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-gray-800 shadow-lg border-b border-gray-700 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Ажил Олгогчийн Самбар</h1>

        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(prev => !prev)}
            className="text-white text-3xl hover:text-emerald-400"
          >
            ☰
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-900 border border-gray-700 rounded-lg shadow-lg py-2 z-50">

              {/* Профайл */}
              <button
                className="w-full text-left px-4 py-2 text-gray-200 hover:bg-gray-700"
                onClick={() => {
                  setMenuOpen(false);
                  router.push("/employer-profile");
                }}
              >
                Профайл
              </button>

              {/* Ажил нэмэх */}
              <button
                className="w-full text-left px-4 py-2 text-gray-200 hover:bg-gray-700"
                onClick={() => {
                  setMenuOpen(false);
                  router.push("/employer-add-job");
                }}
              >
                Ажил нэмэх
              </button>

              {/* 🆕 Ажлын жагсаалт */}
              <button
                className="w-full text-left px-4 py-2 text-gray-200 hover:bg-gray-700"
                onClick={() => {
                  setMenuOpen(false);
                  router.push("/employer-job-list");
                }}
              >
                Ажлын жагсаалт
              </button>

              {/* Ажилчдын жагсаалт */}
              <button
                className="w-full text-left px-4 py-2 text-gray-200 hover:bg-gray-700"
                onClick={() => {
                  setMenuOpen(false);
                  router.push("/employer-dashboard");
                }}
              >
                Ажилчдын жагсаалт
              </button>

              {/* Logout */}
              <button
                className="w-full text-left px-4 py-2 text-red-400 hover:bg-gray-700"
                onClick={handleLogout}
              >
                Гарах
              </button>

            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default EmployerNavbar;
