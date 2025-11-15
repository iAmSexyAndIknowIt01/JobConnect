"use client";

import { useState } from "react";
import SuccessModal from "@/components/SuccessModal";

export default function ProfilePage() {
  // ---------------------------
  // VIEW or EDIT MODE
  // ---------------------------
  const [isEditing, setIsEditing] = useState(false);

  // ---------------------------
  // Multi-step control
  // ---------------------------
  const [step, setStep] = useState(1);

  const next = () => setStep((s) => s + 1);
  const prev = () => setStep((s) => s - 1);

  // ---------------------------
  // Profile fields
  // ---------------------------
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [lastName, setLastName] = useState("Бат");
  const [firstName, setFirstName] = useState("Болд");
  const [email, setEmail] = useState("test@gmail.com");
  const [phone, setPhone] = useState("090-1234-5678");
  const [address, setAddress] = useState("Tokyo, Shinjuku-ku");
  const [skills, setSkills] = useState("React, Node.js, TailwindCSS");
  const [japaneseLevel, setJapaneseLevel] = useState("N3");
  const [experience, setExperience] = useState("2 жил программистээр ажилласан");
  const [message, setMessage] = useState("Өөрийн тухай нэмэлт мэдээлэл");

  // ---------------------------
  // SUCCESS MODAL
  // ---------------------------
  const [showSuccess, setShowSuccess] = useState(false);

  // ---------------------------
  // Save final data
  // ---------------------------
  const handleSubmit = () => {
    const data = {
      profileImage,
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

    console.log("Profile Saved:", data);

    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 1500);

    // Exit edit mode
    setIsEditing(false);
    setStep(1);
  };

  return (
    <div className="w-full min-h-screen bg-gray-900 text-gray-100 p-6 flex justify-center">
      <div className="max-w-2xl w-full bg-gray-800 border border-gray-700 rounded-xl p-10 mt-16 shadow-2xl">
        
        <h1 className="text-3xl font-bold text-center mb-10">
          Ажил хайгчийн профайл
        </h1>

        {/* -------------------------------------
                VIEW MODE (DEFAULT)
        -------------------------------------- */}
        {!isEditing && (
          <div>
            {/* Profile Image */}
            <div className="flex flex-col items-center mb-8">
              <img
                src={
                  profileImage ??
                  "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                className="w-40 h-40 rounded-full object-cover border-4 border-gray-600 shadow-lg"
              />

              <p className="text-gray-400 mt-4">Профайл зураг</p>
            </div>

            {/* Text Info */}
            <ViewRow label="Овог" value={lastName} />
            <ViewRow label="Нэр" value={firstName} />
            <ViewRow label="Имэйл" value={email} />
            <ViewRow label="Утас" value={phone} />
            <ViewRow label="Хаяг" value={address} />
            <ViewRow label="Ур чадвар" value={skills} />
            <ViewRow label="Япон хэл" value={japaneseLevel} />
            <ViewRow label="Ажлын туршлага" value={experience} />
            <ViewRow label="Нэмэлт мэдээлэл" value={message} />

            {/* EDIT BUTTON */}
            <div className="flex justify-center mt-10">
              <button
                onClick={() => setIsEditing(true)}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold"
              >
                Засварлах
              </button>
            </div>
          </div>
        )}

        {/* -------------------------------------
                EDIT MODE → MULTI STEP FORM
        -------------------------------------- */}
        {isEditing && (
          <>
            {/* STEP INDICATOR */}
            <div className="flex justify-center gap-4 mb-10">
              {[1, 2, 3, 4].map((s) => (
                <div
                  key={s}
                  className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold 
                  ${step === s ? "bg-blue-600" : "bg-gray-600 opacity-50"}`}
                >
                  {s}
                </div>
              ))}
            </div>

            {/* STEP 1 – IMAGE */}
            {step === 1 && (
              <div className="flex flex-col items-center">
                <div className="relative">
                  <img
                    src={
                      profileImage ??
                      "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    }
                    className="w-40 h-40 rounded-full object-cover border-4 border-gray-600"
                  />

                  <label className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 p-2 rounded-full cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) setProfileImage(URL.createObjectURL(file));
                      }}
                      className="hidden"
                    />
                    📷
                  </label>
                </div>

                <button
                  onClick={next}
                  className="mt-8 bg-blue-600 px-6 py-2 rounded-lg hover:bg-blue-700"
                >
                  Дараах
                </button>
              </div>
            )}

            {/* STEP 2 – BASIC INFO */}
            {step === 2 && (
              <div className="space-y-6">
                <InputField label="Овог" value={lastName} setValue={setLastName} />
                <InputField label="Нэр" value={firstName} setValue={setFirstName} />
                <InputField label="Имэйл" value={email} setValue={setEmail} />
                <InputField label="Утас" value={phone} setValue={setPhone} />
                <InputField label="Хаяг" value={address} setValue={setAddress} />

                <Buttons prev={prev} next={next} />
              </div>
            )}

            {/* STEP 3 – SKILLS */}
            {step === 3 && (
              <div className="space-y-6">
                <TextAreaField
                  label="Ур чадвар"
                  value={skills}
                  setValue={setSkills}
                />

                <div>
                  <label className="block mb-2">Япон хэлний түвшин</label>
                  <select
                    value={japaneseLevel}
                    onChange={(e) => setJapaneseLevel(e.target.value)}
                    className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg"
                  >
                    <option>N1</option>
                    <option>N2</option>
                    <option>N3</option>
                    <option>N4</option>
                    <option>N5</option>
                    <option>Байхгүй</option>
                  </select>
                </div>

                <TextAreaField
                  label="Ажлын туршлага"
                  value={experience}
                  setValue={setExperience}
                />

                <Buttons prev={prev} next={next} />
              </div>
            )}

            {/* STEP 4 – SUMMARY */}
            {step === 4 && (
              <div>
                <h2 className="text-xl font-bold mb-4">Дүгнэлт</h2>

                <ViewRow label="Овог" value={lastName} />
                <ViewRow label="Нэр" value={firstName} />
                <ViewRow label="Имэйл" value={email} />
                <ViewRow label="Утас" value={phone} />
                <ViewRow label="Хаяг" value={address} />
                <ViewRow label="Ур чадвар" value={skills} />
                <ViewRow label="Япон хэл" value={japaneseLevel} />
                <ViewRow label="Туршлага" value={experience} />
                <ViewRow label="Нэмэлт мэдээлэл" value={message} />

                <div className="flex justify-between mt-8">
                  <button
                    onClick={prev}
                    className="px-6 py-2 bg-gray-700 rounded"
                  >
                    Буцах
                  </button>

                  <button
                    onClick={handleSubmit}
                    className="px-6 py-2 bg-green-600 rounded hover:bg-green-700"
                  >
                    Хадгалах
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <SuccessModal
        isOpen={showSuccess}
        message="Мэдээлэл амжилттай хадгалагдлаа!"
      />
    </div>
  );
}

/* ----------------------------------------------------------
                      REUSABLE COMPONENTS
----------------------------------------------------------- */

function ViewRow({ label, value }: any) {
  return (
    <div className="border-b border-gray-700 py-3">
      <div className="text-gray-400 text-sm">{label}</div>
      <div className="text-white font-medium">{value}</div>
    </div>
  );
}

function InputField({ label, value, setValue }: any) {
  return (
    <div>
      <label className="block mb-2">{label}</label>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg"
      />
    </div>
  );
}

function TextAreaField({ label, value, setValue }: any) {
  return (
    <div>
      <label className="block mb-2">{label}</label>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg"
      />
    </div>
  );
}

function Buttons({ prev, next }: any) {
  return (
    <div className="flex justify-between mt-6">
      <button onClick={prev} className="px-6 py-2 bg-gray-700 rounded">
        Буцах
      </button>
      <button onClick={next} className="px-6 py-2 bg-blue-600 rounded">
        Дараах
      </button>
    </div>
  );
}
