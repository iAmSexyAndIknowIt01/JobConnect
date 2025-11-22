"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClients";
import SuccessModal from "@/components/SuccessModal";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [step, setStep] = useState(1);

  const next = () => setStep((s) => s + 1);
  const prev = () => setStep((s) => s - 1);

  // STATES
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [skills, setSkills] = useState("");
  const [japaneseLevel, setJapaneseLevel] = useState("");
  const [experience, setExperience] = useState("");
  const [other, setOther] = useState("");

  const [showSuccess, setShowSuccess] = useState(false);
  const userId = sessionStorage.getItem("userId");

  // ----------------------------------------
  // 1) LOAD PROFILE (SELECT 3 TABLES)
  // ----------------------------------------
  useEffect(() => {
    const fetchProfile = async () => {
      // const {
      //   data: { user },
      // } = await supabase.auth.getUser();

      // if (!user) return;
      // const userId = user.id;
      console.log("session-с userId:", userId);
      // 1) user_profiles
      const { data: profile } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("id", userId)
        .single();

      // 2) user_accounts
      const { data: account } = await supabase
        .from("user_accounts")
        .select("email")
        .eq("id", userId)
        .single();

      // 3) user_skills
      const { data: skill } = await supabase
        .from("user_skills")
        .select("*")
        .eq("id", userId)
        .single();

      // set data to state
      if (profile) {
        setLastName(profile.last_name ?? "");
        setFirstName(profile.first_name ?? "");
        setPhone(profile.phone ?? "");
        setAddress(profile.address ?? "");
        setProfileImage(profile.profile_image ?? null);
      }

      if (account) {
        setEmail(account.email ?? "");
      }

      if (skill) {
        setSkills(skill.skills ?? "");
        setJapaneseLevel(skill.japanese_level ?? "");
        setExperience(skill.experience ?? "");
        setOther(skill.other ?? "");
      }
    };

    fetchProfile();
  }, []);

  // ----------------------------------------
  // 2) SAVE PROFILE (UPDATE 3 TABLES)
  // ----------------------------------------
  const handleSubmit = async () => {
    // const {
    //   data: { user },
    // } = await supabase.auth.getUser();

    // if (!user) {
    //   alert("Хэрэглэгчийн мэдээлэл олдсонгүй!");
    //   return;
    // }

    // const userId = user.id;

    // 1) UPDATE user_profiles
    const { error: profileError } = await supabase
      .from("user_profiles")
      .update({
        last_name: lastName,
        first_name: firstName,
        phone,
        address,
      })
      .eq("id", userId);

    if (profileError) {
      console.error(profileError);
      alert("user_profiles update Error");
      return;
    }

    // 2) UPDATE user_accounts
    const { error: accountError } = await supabase
      .from("user_accounts")
      .update({
        email,
      })
      .eq("id", userId);

    if (accountError) {
      console.error(accountError);
      alert("user_accounts update Error");
      return;
    }

    // 3) UPDATE user_skills
    const { error: skillError } = await supabase
      .from("user_skills")
      .update({
        skills,
        japanese_level: japaneseLevel,
        experience,
        other,
      })
      .eq("id", userId);

    if (skillError) {
      console.error(skillError);
      alert("user_skills update Error");
      return;
    }

    // SUCCESS
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 1500);

    setIsEditing(false);
    setStep(1);
  };

  return (
    <div className="w-full min-h-screen bg-gray-900 text-gray-100 p-6 flex justify-center">
      <div className="max-w-2xl w-full bg-gray-800 border border-gray-700 rounded-xl p-10 mt-16 shadow-2xl">
        <h1 className="text-3xl font-bold text-center mb-10">
          Ажил хайгчийн профайл
        </h1>

        {/* ---------------- VIEW MODE ---------------- */}
        {!isEditing && (
          <div>
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

            <ViewRow label="Овог" value={lastName} />
            <ViewRow label="Нэр" value={firstName} />
            <ViewRow label="Имэйл" value={email} />
            <ViewRow label="Утас" value={phone} />
            <ViewRow label="Хаяг" value={address} />
            <ViewRow label="Ур чадвар" value={skills} />
            <ViewRow label="Япон хэл" value={japaneseLevel} />
            <ViewRow label="Ажлын туршлага" value={experience} />
            <ViewRow label="Нэмэлт мэдээлэл" value={other} />

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

        {/* ---------------- EDIT MODE ---------------- */}
        {isEditing && (
          <>
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

            {step === 3 && (
              <div className="space-y-6">
                <TextAreaField label="Ур чадвар" value={skills} setValue={setSkills} />

                <div>
                  <label className="block mb-2">Япон хэлний түвшин</label>
                  <select
                    value={japaneseLevel}
                    onChange={(e) => setJapaneseLevel(e.target.value)}
                    className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg"
                  >
                    <option>Байхгүй</option>
                    <option>N1</option>
                    <option>N2</option>
                    <option>N3</option>
                    <option>N4</option>
                    <option>N5</option>
                  </select>
                </div>

                <TextAreaField
                  label="Ажлын туршлага"
                  value={experience}
                  setValue={setExperience}
                />

                <TextAreaField
                  label="Нэмэлт мэдээлэл"
                  value={other}
                  setValue={setOther}
                />

                <Buttons prev={prev} next={next} />
              </div>
            )}

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
                <ViewRow label="Нэмэлт мэдээлэл" value={other} />

                <div className="flex justify-between mt-8">
                  <button onClick={prev} className="px-6 py-2 bg-gray-700 rounded">
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

/* ------------------ Components ------------------ */

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
