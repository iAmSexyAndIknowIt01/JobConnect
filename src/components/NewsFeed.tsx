// src/components/NewsFeed.tsx
import React from 'react';

// Мэдээний объектын бүтцийг тодорхойлно
interface NewsItem {
  id: number;
  title: string;
  date: string;
}

// Props авахгүй байгаа тул React.FC нь generic-гүй байж болно, эсвэл {} ашиглаж болно.
const NewsFeed: React.FC = () => {
  // Жишээ мэдээний өгөгдөл
  const newsItems: NewsItem[] = [ // NewsItem[] төрлийг зааж өгсөн
    { id: 1, title: "Японы технологийн салбар эрчээ авч байна", date: "2025-11-14" },
    { id: 2, title: "Next.js 15 гарснаар React-д гарсан өөрчлөлтүүд", date: "2025-11-13" },
    { id: 3, title: "Цахимаар ажиллах боломжит ажлын байрууд нэмэгдлээ", date: "2025-11-12" },
  ];

  return (
    <div className="space-y-4">
      {newsItems.map(item => (
        <article key={item.id} className="bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition duration-300 cursor-pointer">
          <h3 className="text-lg font-medium text-blue-400">{item.title}</h3>
          <p className="text-sm text-gray-400 mt-1">{item.date}</p>
        </article>
      ))}
      <div className="text-center mt-6">
        <a href="#" className="text-blue-500 hover:text-blue-400 font-semibold text-sm">Бүх мэдээг харах &rarr;</a>
      </div>
    </div>
  );
};

export default NewsFeed;