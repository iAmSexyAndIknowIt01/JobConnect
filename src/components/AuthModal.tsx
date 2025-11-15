"use client";

import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export default function AuthModal({ isOpen, onClose, onLoginSuccess }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);

  // Form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // Errors / success
  const [error, setError] = useState("");
  const [showRegisterSuccessModal, setShowRegisterSuccessModal] = useState(false);
  const [showLoginSuccessModal, setShowLoginSuccessModal] = useState(false); // ✅ Амжилттай нэвтрэх

  // Show/hide password toggles
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
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isLogin) {
      if (email === "test@gmail.com" && password === "test") {
        setError("");
        setShowLoginSuccessModal(true); // ✅ Амжилттай нэвтрэх
        setTimeout(() => {
          setShowLoginSuccessModal(false);
          onLoginSuccess();
          onClose();
          resetForm();
        }, 1500);
      } else {
        setError("Имэйл эсвэл нууц үг буруу байна!");
      }
    } else {
      if (password !== confirmPassword) {
        setError("Нууц үг таарахгүй байна!");
        return;
      }

      console.log("Бүртгүүлэх:", {
        firstName,
        lastName,
        phone,
        address,
        email,
        password,
      });

      setError("");
      setShowRegisterSuccessModal(true); // ✅ Бүртгүүлэх success
      setTimeout(() => {
        setShowRegisterSuccessModal(false);
        resetForm();
        setIsLogin(true); // Нэвтрэх рүү шилжих
      }, 1500);
    }
  };

  return (
    <>
      {/* Main Auth Modal */}
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
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
                <input
                  type="text"
                  placeholder="Овог"
                  className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Нэр"
                  className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
                <input
                  type="tel"
                  placeholder="Утасны дугаар"
                  className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Хаяг"
                  className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </>
            )}

            <input
              type="email"
              placeholder="Имэйл"
              className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Нууц үг"
                className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
              >
                {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
              </button>
            </div>

            {!isLogin && (
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Нууц үг давтах"
                  className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
                >
                  {showConfirmPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                </button>
              </div>
            )}

            {error && <p className="text-red-400 text-sm text-center">{error}</p>}

            <button
              type="submit"
              className="w-full py-3 bg-blue-500 hover:bg-blue-600 rounded-md font-semibold transition"
            >
              {isLogin ? "Нэвтрэх" : "Бүртгүүлэх"}
            </button>
          </form>

          <div className="mt-4 text-center">
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError("");
                setShowRegisterSuccessModal(false);
              }}
              className="text-blue-400 underline text-sm"
            >
              {isLogin ? "Бүртгүүлэх" : "Нэвтрэх"}
            </button>
          </div>
        </div>
      </div>

      {/* Register Success Modal */}
      {showRegisterSuccessModal && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/40 backdrop-blur-sm animate-[fadeInUp_0.4s_ease-out]">
          <div className="bg-green-500 text-white rounded-xl p-8 max-w-sm w-11/12 text-center shadow-2xl">
            <h3 className="text-2xl font-bold mb-2">Амжилттай бүртгүүллээ!</h3>
            <p>Одоо нэвтрэх боломжтой.</p>
          </div>
        </div>
      )}

      {/* Login Success Modal */}
      {showLoginSuccessModal && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/40 backdrop-blur-sm animate-[fadeInUp_0.4s_ease-out]">
          <div className="bg-green-500 text-white rounded-xl p-8 max-w-sm w-11/12 text-center shadow-2xl">
            <h3 className="text-2xl font-bold mb-2">Амжилттай нэвтэрлээ!</h3>
            <p>Сайхан өдөр өнгөрүүлээрэй.</p>
          </div>
        </div>
      )}
    </>
  );
}
