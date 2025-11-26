"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

interface EmployerNavbarProps {
  onLogout: () => void;
}

const EmployerNavbar: React.FC<EmployerNavbarProps> = ({ onLogout }) => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

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
              <button
                className="w-full text-left px-4 py-2 text-gray-200 hover:bg-gray-700"
                onClick={() => {
                  setMenuOpen(false);
                  router.push("/employer-profile");
                }}
              >
                Профайл
              </button>

              <button
                className="w-full text-left px-4 py-2 text-gray-200 hover:bg-gray-700"
                onClick={() => {
                  setMenuOpen(false);
                  router.push("/add-job");
                }}
              >
                Ажил нэмэх
              </button>

              <button
                className="w-full text-left px-4 py-2 text-gray-200 hover:bg-gray-700"
                onClick={() => {
                  setMenuOpen(false);
                  router.push("/employer-dashboard"); // ← энд ажилчдын жагсаалт руу
                }}
              >
                Ажилчдын жагсаалт
              </button>

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
  );
};

export default EmployerNavbar;
