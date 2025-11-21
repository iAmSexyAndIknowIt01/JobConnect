"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

interface NavbarProps {
  isLoggedIn: boolean;
  onAuthOpen: () => void;
  onLogout: () => void;
}

export default function Navbar({ isLoggedIn, onAuthOpen, onLogout }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Одоогийн хуудас шалгах
  const isHomePage = pathname === "/";
  const isJobsPage = pathname === "/jobs";
  const isEmployerAuthPage = pathname === "/employer/auth";

  const scrollToAbout = () => {
    const section = document.getElementById("about-us");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  const handleScrollToContact = () => {
    const element = document.getElementById("contact-us");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };


  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/10 backdrop-blur-lg border-b border-white/20">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-semibold text-white tracking-wide">
          <span className="text-blue-400">Job</span>Connect
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 text-gray-100 font-medium items-center">
          {isHomePage && (
            <>
              {/* <Link href="/jobs" className="hover:text-blue-400 transition">
                Ажил
              </Link> */}
              <div className="max-w-6xl mx-auto px-3 py-1 flex gap-6">
                  <button onClick={scrollToAbout} className="hover:text-blue-600">
                     Бидний тухай
                  </button>
              </div>
              <div className="max-w-6xl mx-auto px-3 py-1 flex gap-6">
                  <button onClick={handleScrollToContact} className="hover:text-blue-600">
                     Холбоо барих
                  </button>
              </div>
            </>
          )}

          {!isHomePage && !isEmployerAuthPage &&(
            <>
              {isLoggedIn ? (
                <div className="relative">
                  <button
                    onClick={() => setOpen(!open)}
                    className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md font-semibold"
                  >
                    ☰
                  </button>
                  {open && (
                    <div className="absolute right-0 mt-2 bg-gray-800 rounded-md shadow-lg w-40 text-sm">
                      <Link
                        href="/profile"
                        className="block px-4 py-2 hover:bg-gray-700"
                        onClick={() => setOpen(false)}
                      >
                        Профайл
                      </Link>
                      <Link
                        href="/jobs"
                        className="block px-4 py-2 hover:bg-gray-700"
                        onClick={() => setOpen(false)}
                      >
                        Ажил
                      </Link>
                      <button
                        onClick={() => {
                          onLogout();
                          setOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                      >
                        Гарах
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={onAuthOpen}
                  className="px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded-md font-semibold transition"
                >
                  Нэвтрэх / Бүртгүүлэх
                </button>
              )}
            </>
          )}
        </nav>

        {/* Mobile Burger */}
        {!isHomePage && (
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-gray-100 hover:text-blue-400"
          >
            <Menu size={26} />
          </button>
        )}
      </div>

      {/* Mobile Menu */}
      {open && !isHomePage && (
        <div className="md:hidden bg-black/70 backdrop-blur-md py-4 px-6 space-y-3">
          {isLoggedIn ? (
            <>
              <Link
                href="/profile"
                className="block text-gray-100 hover:text-blue-400"
                onClick={() => setOpen(false)}
              >
                Профайл
              </Link>
              <Link
                href="/jobs"
                className="block text-gray-100 hover:text-blue-400"
                onClick={() => setOpen(false)}
              >
                Ажил
              </Link>
              <button
                onClick={() => {
                  onLogout();
                  setOpen(false);
                }}
                className="block w-full text-left text-gray-100 hover:text-blue-400"
              >
                Гарах
              </button>
            </>
          ) : (
            <>
              {!isJobsPage && (
                <>
                  <Link
                    href="/jobs"
                    className="block text-gray-100 hover:text-blue-400"
                    onClick={() => setOpen(false)}
                  >
                    Ажил
                  </Link>
                  <Link
                    href="/about"
                    className="block text-gray-100 hover:text-blue-400"
                    onClick={() => setOpen(false)}
                  >
                    Бидний тухай
                  </Link>
                  <Link
                    href="/contact"
                    className="block text-gray-100 hover:text-blue-400"
                    onClick={() => setOpen(false)}
                  >
                    Холбоо барих
                  </Link>
                </>
              )}
              <button
                onClick={() => {
                  onAuthOpen();
                  setOpen(false);
                }}
                className="block w-full text-left text-blue-400 font-semibold"
              >
                Нэвтрэх / Бүртгүүлэх
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
}
