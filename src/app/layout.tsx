"use client";

import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";
import AuthModal from "@/components/AuthModal";
import { Analytics } from '@vercel/analytics/next';

// export const metadata: Metadata = {
//   title: "JobMatch Japan | Таны ур чадварт тохирсон ажил",
//   description: "Японд байгаа гадаад иргэдэд зориулсан ажил зуучлалын платформ.",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 🔹 Modal ба нэвтрэлтийн төлөвүүд
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 🔹 Гарах
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  // 🔹 Нэвтрэлт амжилттай болсон үед
  const handleLoginSuccess = () => {
    // alert("Амжилттай нэвтэрлээ ✅");
    setIsLoggedIn(true);
  };

  return (
    <html lang="mn">
      <head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </head>
      <body className="flex flex-col bg-gray-50 text-gray-900 min-h-screen">
        {/* Header / Navbar */}
        <Navbar
          isLoggedIn={isLoggedIn}
          onAuthOpen={() => setModalOpen(true)}
          onLogout={handleLogout}
        />

        {/* Гол контент */}
        <main className="grow">{children}<Analytics /></main>

        {/* Auth Modal */}
        <AuthModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onLoginSuccess={handleLoginSuccess}
        />

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
