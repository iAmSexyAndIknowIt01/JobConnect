"use client";

import { useState } from 'react';

// Ажлын мэдээллийн interface
interface JobData {
    title: string;
    companyName: string;
    location: string;
    type: string;
    salary: string;
    description: string;
}

export default function PostJob() {
    const [jobData, setJobData] = useState<JobData>({
        title: '',
        companyName: '',
        location: '',
        type: 'Бүтэн цагийн',
        salary: '',
        description: '',
    });
    const [statusMessage, setStatusMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setJobData({
            ...jobData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatusMessage('');

        // 🚀 Энд Ажлын Мэдээлэл Нэмэх API дуудлага хийх логик орно
        console.log("Оруулж буй ажлын мэдээлэл:", jobData);

        // Жишээ: Хэдэн секундын дараа амжилттай болгов
        setTimeout(() => {
            setIsSubmitting(false);
            setStatusMessage(`✅ ${jobData.title} ажлын байрыг амжилттай оруулав!`);
            
            // Формыг цэвэрлэх
            setJobData({
                title: '',
                companyName: '',
                location: '',
                type: 'Бүтэн цагийн',
                salary: '',
                description: '',
            });
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-gray-950 text-gray-100 p-4 sm:p-8">
            <div className="max-w-4xl mx-auto bg-gray-900 p-8 rounded-xl shadow-2xl border border-gray-800">
                <h1 className="text-3xl md:text-4xl font-extrabold text-emerald-400 mb-6 border-b border-gray-700 pb-3">
                    📢 Ажлын Байр Оруулах
                </h1>
                <p className="text-gray-400 mb-8">
                    Компанийнхаа нээлттэй ажлын байрыг оруулна уу.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    
                    {/* Ажлын нэр */}
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">Ажлын байрны нэр *</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={jobData.title}
                            onChange={handleChange}
                            required
                            placeholder="Жишээ: Full-Stack Developer"
                            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white"
                        />
                    </div>

                    {/* Компанийн нэр */}
                    <div>
                        <label htmlFor="companyName" className="block text-sm font-medium text-gray-300 mb-1">Компанийн нэр *</label>
                        <input
                            type="text"
                            id="companyName"
                            name="companyName"
                            value={jobData.companyName}
                            onChange={handleChange}
                            required
                            placeholder="Жишээ: JobConnect Co., Ltd"
                            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Байршил */}
                        <div>
                            <label htmlFor="location" className="block text-sm font-medium text-gray-300 mb-1">Байршил *</label>
                            <input
                                type="text"
                                id="location"
                                name="location"
                                value={jobData.location}
                                onChange={handleChange}
                                required
                                placeholder="Жишээ: Улаанбаатар, Токио"
                                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white"
                            />
                        </div>

                        {/* Ажлын төрөл */}
                        <div>
                            <label htmlFor="type" className="block text-sm font-medium text-gray-300 mb-1">Ажлын төрөл *</label>
                            <select
                                id="type"
                                name="type"
                                value={jobData.type}
                                onChange={handleChange}
                                required
                                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white appearance-none cursor-pointer"
                            >
                                <option>Бүтэн цагийн</option>
                                <option>Хагас цагийн</option>
                                <option>Контракт/Проект</option>
                                <option>Дадлага</option>
                            </select>
                        </div>
                        
                        {/* Цалин */}
                        <div>
                            <label htmlFor="salary" className="block text-sm font-medium text-gray-300 mb-1">Цалин (Сарын) (₮/$)</label>
                            <input
                                type="text"
                                id="salary"
                                name="salary"
                                value={jobData.salary}
                                onChange={handleChange}
                                placeholder="Жишээ: 2,500,000₮ эсвэл $1,500"
                                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white"
                            />
                        </div>
                    </div>

                    {/* Ажлын дэлгэрэнгүй тайлбар */}
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">Ажлын дэлгэрэнгүй тайлбар *</label>
                        <textarea
                            id="description"
                            name="description"
                            value={jobData.description}
                            onChange={handleChange}
                            required
                            rows={8}
                            placeholder="Ажлын үүрэг, шаардлага, компанийн давуу талуудыг дэлгэрэнгүй бичнэ үү."
                            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white resize-none"
                        />
                    </div>

                    {/* Төлөв/Алдааны мессеж */}
                    {statusMessage && (
                        <p className={`p-3 rounded-lg text-center font-semibold ${statusMessage.startsWith('✅') ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
                            {statusMessage}
                        </p>
                    )}

                    {/* Товч */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold transition shadow-xl disabled:bg-gray-600 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                    >
                        {isSubmitting ? (
                            <>
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Мэдээлэл оруулж байна...
                            </>
                        ) : (
                            "Ажлын Байр Нэмэх"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}