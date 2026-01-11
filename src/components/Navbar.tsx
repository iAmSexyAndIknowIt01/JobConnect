"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu } from "lucide-react";
import Link from "next/link";

interface NavbarProps {
  isLoggedIn: boolean;
  onAuthOpen: () => void;
  onLogout: () => void;
}

export default function Navbar({ isLoggedIn, onAuthOpen, onLogout }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // employer dashboard дээр navbar харагдахгүй
  if (pathname.startsWith("/employer")) return null;

  const isHomePage = pathname === "/";
  const isJobsPage = pathname === "/jobs";

  // Smooth scroll helper
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  // Logo click
  const handleLogoClick = () => {
    sessionStorage.clear();
    router.push("/");
    setOpen(false);
  };

  return (
    <header
      className="
        fixed top-4 left-1/2 -translate-x-1/2 z-50
        w-[95%] max-w-7xl
        backdrop-blur-md bg-white/10
        border border-white/20
        shadow-lg rounded-2xl
      "
    >
      <div className="px-6 py-4 flex items-center justify-between text-white">

        {/* Logo */}
        <button
          onClick={handleLogoClick}
          className="text-2xl font-semibold tracking-wide focus:outline-none"
        >
          <span className="text-blue-400">M</span>Staffing
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 font-medium items-center">
          {isHomePage && (
            <>
              <button onClick={() => scrollTo("about-us")} className="hover:text-blue-400">
                Бидний тухай
              </button>
              <button onClick={() => scrollTo("features")} className="hover:text-blue-400">
                Бидний давуу тал
              </button>
              <button onClick={() => scrollTo("how-it-works")} className="hover:text-blue-400">
                How it works
              </button>
              <button onClick={() => scrollTo("contact-us")} className="hover:text-blue-400">
                Холбоо барих
              </button>
            </>
          )}

          {!isHomePage && (
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
                    <div className="absolute right-0 mt-3 bg-gray-900/90 backdrop-blur-md rounded-xl shadow-xl w-40 text-sm overflow-hidden">
                      <Link
                        href="/profile"
                        className="block px-4 py-2 hover:bg-white/10"
                        onClick={() => setOpen(false)}
                      >
                        Профайл
                      </Link>
                      <Link
                        href="/jobs"
                        className="block px-4 py-2 hover:bg-white/10"
                        onClick={() => setOpen(false)}
                      >
                        Ажил
                      </Link>
                      <button
                        onClick={() => {
                          onLogout();
                          setOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 hover:bg-white/10"
                      >
                        Гарах
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={onAuthOpen}
                  className="px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded-full font-semibold transition"
                >
                  Нэвтрэх / Бүртгүүлэх
                </button>
              )}
            </>
          )}
        </nav>

        {/* Mobile Menu Icon */}
        {!isHomePage && (
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden hover:text-blue-400"
          >
            <Menu size={26} />
          </button>
        )}
      </div>

      {/* Mobile Menu */}
      {open && !isHomePage && (
        <div className="md:hidden bg-black/80 backdrop-blur-md px-6 py-4 space-y-3 rounded-b-2xl">
          {isLoggedIn ? (
            <>
              <Link href="/profile" className="block hover:text-blue-400" onClick={() => setOpen(false)}>
                Профайл
              </Link>
              <Link href="/jobs" className="block hover:text-blue-400" onClick={() => setOpen(false)}>
                Ажил
              </Link>
              <button
                onClick={() => {
                  onLogout();
                  setOpen(false);
                }}
                className="block w-full text-left hover:text-blue-400"
              >
                Гарах
              </button>
            </>
          ) : (
            <>
              {!isJobsPage && (
                <Link href="/jobs" className="block hover:text-blue-400" onClick={() => setOpen(false)}>
                  Ажил
                </Link>
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
