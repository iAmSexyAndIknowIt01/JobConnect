"use client";

import { useState } from "react";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);

  const [lastName, setLastName] = useState("Бат");
  const [firstName, setFirstName] = useState("Болд");
  const [email, setEmail] = useState("test@gmail.com");
  const [phone, setPhone] = useState("090-1234-5678");
  const [address, setAddress] = useState("Tokyo, Shinjuku-ku");
  const [skills, setSkills] = useState("React, Node.js, TailwindCSS");
  const [japaneseLevel, setJapaneseLevel] = useState("N3");
  const [experience, setExperience] = useState("2 жил программистээр ажилласан");
  const [message, setMessage] = useState("Өөрийн тухай нэмэлт мэдээлэл");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      lastName,
      firstName,
      email,
      phone,
      address,
      skills,
      japaneseLevel,
      experience,
      message,
    };
    console.log("Профайл мэдээлэл хадгалагдсан:", data);
    alert("Мэдээлэл амжилттай хадгалагдлаа!");
    setIsEditing(false);
  };

  return (
    <div className="w-full bg-gray-900 text-gray-100 rounded-xl shadow-lg p-8">
        <div className="max-w-xl mx-auto mt-24 bg-gray-800 text-gray-100 rounded-xl shadow-lg p-8">
            <h1 className="text-3xl font-bold mb-6 text-center">
            Ажил хайгчийн мэдээлэл
            </h1>

        <form id="profileForm" onSubmit={handleSave} className="space-y-5">
            {/* Овог ба Нэр */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label className="block mb-2 text-sm font-medium">Овог</label>
                <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                readOnly={!isEditing}
                className={`w-full p-3 rounded-md border ${
                    isEditing
                    ? "bg-gray-800 border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    : "bg-gray-700 border-gray-600 cursor-not-allowed"
                }`}
                />
            </div>
            <div>
                <label className="block mb-2 text-sm font-medium">Нэр</label>
                <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                readOnly={!isEditing}
                className={`w-full p-3 rounded-md border ${
                    isEditing
                    ? "bg-gray-800 border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    : "bg-gray-700 border-gray-600 cursor-not-allowed"
                }`}
                />
            </div>
            </div>

            {/* Имэйл */}
            <div>
            <label className="block mb-2 text-sm font-medium">Имэйл</label>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                readOnly={!isEditing}
                className={`w-full p-3 rounded-md border ${
                isEditing
                    ? "bg-gray-800 border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    : "bg-gray-700 border-gray-600 cursor-not-allowed"
                }`}
            />
            </div>

            {/* Утас */}
            <div>
            <label className="block mb-2 text-sm font-medium">Утасны дугаар</label>
            <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                readOnly={!isEditing}
                className={`w-full p-3 rounded-md border ${
                isEditing
                    ? "bg-gray-800 border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    : "bg-gray-700 border-gray-600 cursor-not-allowed"
                }`}
            />
            </div>

            {/* Хаяг */}
            <div>
            <label className="block mb-2 text-sm font-medium">Японд оршин суугаа хаяг</label>
            <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                readOnly={!isEditing}
                className={`w-full p-3 rounded-md border ${
                isEditing
                    ? "bg-gray-800 border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    : "bg-gray-700 border-gray-600 cursor-not-allowed"
                }`}
            />
            </div>

            {/* Ур чадвар */}
            <div>
            <label className="block mb-2 text-sm font-medium">Ур чадвар</label>
            <textarea
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                readOnly={!isEditing}
                rows={3}
                className={`w-full p-3 rounded-md border ${
                isEditing
                    ? "bg-gray-800 border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    : "bg-gray-700 border-gray-600 cursor-not-allowed"
                }`}
            ></textarea>
            </div>

            {/* Япон хэлний түвшин */}
            <div>
            <label className="block mb-2 text-sm font-medium">Япон хэлний мэдлэг</label>
            <select
                value={japaneseLevel}
                onChange={(e) => setJapaneseLevel(e.target.value)}
                disabled={!isEditing}
                className={`w-full p-3 rounded-md border ${
                isEditing
                    ? "bg-gray-800 border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    : "bg-gray-700 border-gray-600 cursor-not-allowed"
                }`}
            >
                <option value="N1">N1</option>
                <option value="N2">N2</option>
                <option value="N3">N3</option>
                <option value="N4">N4</option>
                <option value="N5">N5</option>
                <option value="Байхгүй">Байхгүй</option>
            </select>
            </div>

            {/* Ажлын туршлага */}
            <div>
            <label className="block mb-2 text-sm font-medium">Ажлын туршлага</label>
            <textarea
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                readOnly={!isEditing}
                rows={3}
                className={`w-full p-3 rounded-md border ${
                isEditing
                    ? "bg-gray-800 border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    : "bg-gray-700 border-gray-600 cursor-not-allowed"
                }`}
            ></textarea>
            </div>

            {/* Нэмэлт мэдээлэл */}
            <div>
            <label className="block mb-2 text-sm font-medium">Нэмэлт мэдээлэл</label>
            <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                readOnly={!isEditing}
                rows={3}
                className={`w-full p-3 rounded-md border ${
                isEditing
                    ? "bg-gray-800 border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    : "bg-gray-700 border-gray-600 cursor-not-allowed"
                }`}
            ></textarea>
            </div>
        </form>

        {/* Засварлах / Хадгалах товч (Засварлах товч form-с гадна) */}
        <div className="flex justify-end gap-4 mt-4">
            {!isEditing && (
            <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="px-6 py-2 bg-green-500 hover:bg-green-600 rounded-md font-semibold transition"
            >
                Засварлах
            </button>
            )}
            {isEditing && (
            <button
                type="submit"
                form="profileForm"
                className="px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded-md font-semibold transition"
            >
                Хадгалах
            </button>
            )}
        </div>
        </div>
    </div>
    
  );
}
