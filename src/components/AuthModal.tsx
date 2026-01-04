"use client";

import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import SuccessModal from "./SuccessModal";
import { supabase } from "@/lib/supabaseClients";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export default function AuthModal({
  isOpen,
  onClose,
  onLoginSuccess,
}: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [step, setStep] = useState<"auth" | "verify">("auth");

  // form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // otp
  const [verificationCode, setVerificationCode] = useState("");

  // ui
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showRegisterSuccessModal, setShowRegisterSuccessModal] = useState(false);
  const [showLoginSuccessModal, setShowLoginSuccessModal] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  if (!isOpen) return null;

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setFirstName("");
    setLastName("");
    setPhone("");
    setAddress("");
    setVerificationCode("");
    setError("");
    setStep("auth");
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ---------- LOGIN ----------
    if (isLogin) {
      try {
        const { data: user, error } = await supabase
          .from("user_accounts")
          .select("*")
          .eq("email", email)
          .eq("hashed_password", password)
          .single();

        if (error || !user) {
          setError("Имэйл эсвэл нууц үг буруу байна!");
          return;
        }

        sessionStorage.setItem("userId", user.id);
        setShowLoginSuccessModal(true);

        setTimeout(() => {
          setShowLoginSuccessModal(false);
          onLoginSuccess();
          onClose();
          resetForm();
        }, 1500);
      } catch {
        setError("Серверийн алдаа гарлаа");
      }
      return;
    }

    // ---------- REGISTER → SEND OTP ----------
    if (password !== confirmPassword) {
      setError("Нууц үг таарахгүй байна!");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/send-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          firstName,
          lastName,
          phone,
          address,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        setError(result.error || "Баталгаажуулах код илгээж чадсангүй");
        return;
      }

      setStep("verify");
      setError("");
    } catch {
      setError("Серверийн алдаа гарлаа");
    } finally {
      setLoading(false);
    }
  };

  // ================= VERIFY OTP =================
  const handleVerify = async () => {
    if (verificationCode.length !== 6) {
      setError("6 оронтой код оруулна уу");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code: verificationCode }),
      });

      const result = await res.json();

      if (!res.ok) {
        setError(result.error || "Код буруу байна");
        return;
      }

      try {
        //1.insert into user_accounts
        const{data: accountData, error: accountError} = await supabase
          .from("user_accounts")
          .insert([
            {
              email: email,
              hashed_password: password,
            }
          ])
          .select("id");

        if (accountError) {
          setError("Хэрэглэгчийн бүртгэл үүсгэхэд алдаа гарлаа");
          throw accountError
        }
        const userAccountId = accountData[0].id;

        //2.insert into user_profiles
        const{error: profileError} = await supabase
          .from("user_profiles")
          .insert([
            {
              id: userAccountId,
              first_name: firstName,
              last_name: lastName,
              phone: phone,
              address: address,
            }
          ]);
        if (profileError) {
          setError("Хэрэглэгчийн бүртгэл(profile) үүсгэхэд алдаа гарлаа");
          throw profileError
        }

        //3.insert into user_skills
        const{error: skillsError} = await supabase
          .from("user_skills")
          .insert([
            {
              id: userAccountId,
              user_id: userAccountId,
              skills: null,
              japanese_level: null,
              experience: null,
              other: null,
            }
          ]);
        if (skillsError) {
          setError("Хэрэглэгчийн ур чадвар(user_skills) үүсгэхэд алдаа гарлаа");
          throw skillsError
        }
      }
      catch(error) {
        console.log("❌ Registration error:", error);
        setError("Бүртгэл үүсгэхэд алдаа гарлаа");
        return;
      }

      setShowRegisterSuccessModal(true);
      setTimeout(() => {
        setShowRegisterSuccessModal(false);
        resetForm();
        setIsLogin(true);
      }, 1500);
    } catch {
      setError("Баталгаажуулахад алдаа гарлаа");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ================= MAIN AUTH MODAL ================= */}
      {step === "auth" && (
        <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="relative bg-gray-900 text-gray-100 rounded-xl p-8 w-11/12 max-w-md shadow-2xl">
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-100 text-xl"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-6 text-center">
              {isLogin ? "Нэвтрэх" : "Бүртгүүлэх"}
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {!isLogin && (
                <>
                  {[
                    ["Овог", lastName, setLastName],
                    ["Нэр", firstName, setFirstName],
                    ["Утасны дугаар", phone, setPhone],
                    ["Хаяг", address, setAddress],
                  ].map(([p, v, s]: any) => (
                    <input
                      key={p}
                      placeholder={p}
                      value={v}
                      onChange={(e) => s(e.target.value)}
                      className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  ))}
                </>
              )}

              <input
                type="email"
                placeholder="Имэйл"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500"
                required
              />

              {/* Password */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Нууц үг"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 rounded-md bg-gray-800 border border-gray-700"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="w-5" />
                  ) : (
                    <EyeIcon className="w-5" />
                  )}
                </button>
              </div>

              {!isLogin && (
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Нууц үг давтах"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full p-3 rounded-md bg-gray-800 border border-gray-700"
                    required
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {showConfirmPassword ? (
                      <EyeSlashIcon className="w-5" />
                    ) : (
                      <EyeIcon className="w-5" />
                    )}
                  </button>
                </div>
              )}

              {error && (
                <p className="text-red-400 text-sm text-center">{error}</p>
              )}

              <button
                disabled={loading}
                className="w-full py-3 bg-blue-500 hover:bg-blue-600 rounded-md font-semibold"
              >
                {loading ? "Түр хүлээнэ үү..." : isLogin ? "Нэвтрэх" : "Бүртгүүлэх"}
              </button>
            </form>

            <div className="mt-4 text-center">
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError("");
                }}
                className="text-blue-400 underline text-sm"
              >
                {isLogin ? "Бүртгүүлэх" : "Нэвтрэх"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= VERIFY MODAL ================= */}
      {step === "verify" && (
        <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-gray-900 text-gray-100 rounded-xl p-8 w-96 shadow-2xl">
            <h3 className="text-xl font-bold text-center mb-2">
              Имэйл баталгаажуулах
            </h3>
            <p className="text-sm text-gray-400 text-center mb-4">
              {email} хаяг руу илгээсэн 6 оронтой код
            </p>

            <input
              maxLength={6}
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className="w-full p-3 text-center text-lg tracking-widest rounded-md bg-gray-800 border border-gray-700"
            />

            {error && (
              <p className="text-red-400 text-sm mt-2 text-center">{error}</p>
            )}

            <button
              onClick={handleVerify}
              className="mt-4 w-full py-3 bg-blue-500 hover:bg-blue-600 rounded-md font-semibold"
            >
              Баталгаажуулах
            </button>
          </div>
        </div>
      )}

      <SuccessModal
        isOpen={showRegisterSuccessModal}
        message="Амжилттай бүртгүүллээ!"
      />
      <SuccessModal
        isOpen={showLoginSuccessModal}
        message="Амжилттай нэвтэрлээ!"
      />
    </>
  );
}
