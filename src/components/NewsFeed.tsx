"use client";

import React, { useState } from "react";
import NewsModal from "@/components/NewsModal";

interface NewsItem {
  id: number;
  title: string;
  date: string;
  content?: string; // Дэлгэрэнгүй текст
}

const NewsFeed: React.FC = () => {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const newsItems: NewsItem[] = [
    {
      id: 1,
      title: "Японы технологийн салбар эрчээ авч байна",
      date: "2025-11-14",
      content:
        "Японы технологийн компаниуд хиймэл оюун, роботик, автоматжуулалтын салбарт хөрөнгө оруулалтаа нэмэгдүүлж байна..."
    },
    {
      id: 2,
      title: "Next.js 15 гарснаар React-д гарсан өөрчлөлтүүд",
      date: "2025-11-13",
      content:
        "Next.js 15 хувилбар нь сервер компонентын сайжруулалт, хурд нэмэгдүүлсэн rendering, edge функцуудын шинэчлэлт зэргийг багтааж байна..."
    },
    {
      id: 3,
      title: "Цахимаар ажиллах боломжит ажлын байрууд нэмэгдлээ",
      date: "2025-11-12",
      content:
        "Remote ажиллах боломж бүхий ажлын байрны тоо 2025 онд 40%-иар өссөн байна. Ихэнх компаниуд холимог ажлын горим руу шилжжээ..."
    },
  ];

  const openModal = (item: NewsItem) => {
    setSelectedNews(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedNews(null);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="space-y-4">
        {newsItems.map((item) => (
          <article
            key={item.id}
            className="bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition duration-300 cursor-pointer"
            onClick={() => openModal(item)}
          >
            <h3 className="text-lg font-medium text-blue-400">{item.title}</h3>
            <p className="text-sm text-gray-400 mt-1">{item.date}</p>
          </article>
        ))}

        <div className="text-center mt-6">
          <a href="#" className="text-blue-500 hover:text-blue-400 font-semibold text-sm">
            Бүх мэдээг харах →
          </a>
        </div>
      </div>

      {/* Modal */}
      <NewsModal isOpen={isModalOpen} news={selectedNews} onClose={closeModal} />
    </>
  );
};

export default NewsFeed;
