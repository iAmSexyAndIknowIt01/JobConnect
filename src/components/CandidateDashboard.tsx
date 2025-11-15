// src/components/CandidateDashboard.tsx
import React, { useState, useMemo } from 'react';

// Ажил хайгчдын бүтцийг тодорхойлно (Өөрчлөгдөөгүй)
interface Candidate {
  id: number;
  name: string;
  profession: string;
  skills: string[];
  location: string;
  experience: string;
  age: number;
  gender: 'Эрэгтэй' | 'Эмэгтэй' | 'Бусад';
}

interface CandidateDashboardProps {
    onLogout: () => void;
}

// Жишээ өгөгдөл (Өөрчлөгдөөгүй)
const CANDIDATES: Candidate[] = [
  { id: 1, name: "Бат-Эрдэнэ", profession: "Full-Stack Developer", skills: ["React", "Node.js", "MongoDB", "TypeScript"], location: "Токио, Япон", experience: "5 жил", age: 29, gender: 'Эрэгтэй' },
  { id: 2, name: "Сарнай", profession: "UI/UX Designer", skills: ["Figma", "Sketch", "Prototyping", "UX Research"], location: "Осака, Япон", experience: "3 жил", age: 25, gender: 'Эмэгтэй' },
  { id: 3, name: "Ганзориг", profession: "Data Analyst", skills: ["Python", "SQL", "Tableau", "R"], location: "Сайтама, Япон", experience: "2 жил", age: 32, gender: 'Эрэгтэй' },
  { id: 4, name: "Наран", profession: "Project Manager", skills: ["Scrum", "Agile", "Jira", "Risk Management"], location: "Итикава, Япон", experience: "7 жил", age: 35, gender: 'Эмэгтэй' },
  { id: 5, name: "Тулга", profession: "Frontend Developer", skills: ["React", "CSS", "JavaScript", "Redux"], location: "Токио, Япон", experience: "1 жил", age: 24, gender: 'Эрэгтэй' },
];

const CandidateDashboard: React.FC<CandidateDashboardProps> = ({ onLogout }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [minAge, setMinAge] = useState('');
  const [maxAge, setMaxAge] = useState('');
  const [genderFilter, setGenderFilter] = useState('');

  // Шүүлтүүрийн логик (Өөрчлөгдөөгүй)
  const filteredCandidates = useMemo(() => {
    return CANDIDATES.filter(candidate => {
      const matchesSearchTerm = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                candidate.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
                                candidate.profession.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                candidate.location.toLowerCase().includes(searchTerm.toLowerCase()); 

      const minAgeNum = parseInt(minAge);
      const maxAgeNum = parseInt(maxAge);
      
      const matchesMinAge = minAge === '' || candidate.age >= minAgeNum;
      const matchesMaxAge = maxAge === '' || candidate.age <= maxAgeNum;

      const matchesGender = genderFilter === '' || candidate.gender === genderFilter;

      return matchesSearchTerm && matchesMinAge && matchesMaxAge && matchesGender;
    });
  }, [searchTerm, minAge, maxAge, genderFilter]);


  return (
    <div className="min-h-screen bg-gray-800 text-gray-100 pt-20">
      
      {/* 1. Header (Minimalist) */}
      <header className="bg-gray-800 shadow-lg border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">
                Ажил Олгогчийн Самбар
            </h1>
            <button
                onClick={onLogout}
                className="px-4 py-1.5 bg-red-600 hover:bg-red-500 text-white rounded-lg font-medium transition shadow-md text-sm"
            >
                Гарах
            </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* 2. Filter Section (Цэвэрхэн, бага зай эзэлсэн) */}
        <section className="mb-8 p-6 bg-gray-900 rounded-lg shadow-inner border border-gray-800">
          <h3 className="text-xl font-semibold mb-4 text-white border-b border-gray-700 pb-2">Шүүлтүүр</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            
            {/* Ур чадвар / Нэрээр хайх */}
            <input
              type="text"
              placeholder="Ур чадвар, нэр, байршил..."
              className="col-span-2 p-3 rounded-md bg-gray-800 border border-gray-700 focus:ring-1 focus:ring-emerald-500 text-white placeholder-gray-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* Нас (Мин) */}
            <input
              type="number"
              placeholder="Нас (Мин)"
              className="p-3 rounded-md bg-gray-800 border border-gray-700 focus:ring-1 focus:ring-emerald-500 text-white placeholder-gray-500"
              value={minAge}
              onChange={(e) => setMinAge(e.target.value)}
              min="18"
            />

            {/* Нас (Макс) */}
            <input
              type="number"
              placeholder="Нас (Макс)"
              className="p-3 rounded-md bg-gray-800 border border-gray-700 focus:ring-1 focus:ring-emerald-500 text-white placeholder-gray-500"
              value={maxAge}
              onChange={(e) => setMaxAge(e.target.value)}
              min="18"
            />

            {/* Хүйсээр шүүх (Select) */}
            <select
              className="p-3 rounded-md bg-gray-800 border border-gray-700 focus:ring-1 focus:ring-emerald-500 text-white appearance-none cursor-pointer"
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

        {/* 3. Candidate Card List (Мэдээлэлд төвлөрсөн) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCandidates.length > 0 ? (
            filteredCandidates.map((candidate) => (
              <div key={candidate.id} className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 hover:border-emerald-500 transition duration-300 flex flex-col">
                
                {/* Нэр, Мэргэжил */}
                <div className="mb-4 pb-3 border-b border-gray-700">
                    <div className="flex justify-between items-start">
                        <h3 className="text-xl font-bold text-emerald-400">{candidate.name}</h3>
                        <span className="text-xs px-2 py-1 bg-gray-700 text-gray-300 rounded-md font-medium">{candidate.experience}</span>
                    </div>
                    <p className="text-md text-gray-400 mt-1">{candidate.profession}</p>
                </div>
                
                {/* Үзүүлэлтүүд (Бага зай эзэлсэн) */}
                <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-300 mb-4">
                    <p className="flex items-center gap-2"><span className="text-red-400">📍</span> {candidate.location}</p>
                    <p className="flex items-center gap-2"><span className="text-yellow-400">🎂</span> Нас: {candidate.age}</p>
                    <p className="flex items-center gap-2"><span className="text-blue-400">🚻</span> Хүйс: {candidate.gender}</p>
                </div>
                
                <h4 className="text-md font-semibold mt-2 mb-2 text-gray-200">Ур чадварууд:</h4>
                <div className="flex flex-wrap gap-2 mb-4 flex-grow">
                  {candidate.skills.map((skill, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-700 text-xs text-gray-300 rounded-full border border-gray-600 transition hover:bg-emerald-600 hover:text-white cursor-default">
                      {skill}
                    </span>
                  ))}
                </div>
                
                <button className="mt-4 w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold transition shadow-md">
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