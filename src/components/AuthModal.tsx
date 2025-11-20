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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLogin) {
      try {
        const { data: user, error } = await supabase
          .from("user_accounts")
          .select("*")
          .eq("email", email)
          .eq("hashed_password", password) // ⚠️ plaintext check
          .single();

        if (error || !user) {
          console.log("Нэвтрэх алдаа:", error);
          console.log("user", user);
          setError("Имэйл эсвэл нууц үг буруу байна!");
          return;
        }

        // Амжилттай нэвтэрлээ
        setError("");
        setShowLoginSuccessModal(true);

        setTimeout(() => {
          setShowLoginSuccessModal(false);
          onLoginSuccess(); // таны род дотор байгаа callback
          onClose();
          resetForm();
        }, 1500);

      } catch (err) {
        console.error(err);
        setError("Серверийн алдаа гарлаа.");
      }
    } else {
      if (password !== confirmPassword) {
        setError("Нууц үг таарахгүй байна!");
        return;
      }

      try{
        // Insert into user_accounts
        const{ data: accountData, error: accountError } = await supabase
        .from('user_accounts')
        .insert([
          {
            email: email,
            hashed_password: password,
          }
        ])
        .select("id");

        if(accountError){
          console.log("Account insert error:", accountError);
          throw accountError;
        }

        const userAccountId = accountData[0].id;

        // 2. Insert into user_profiles (profile info)
        const { error: profileError } = await supabase
          .from("user_profiles")
          .insert([
            {
              id: userAccountId, // FK → user_accounts.id
              first_name: firstName,
              last_name: lastName,
              phone: phone,
              address: address,
            }
          ]);

        if (profileError) {
          console.error(profileError);
          setError("Профайл үүсгэхэд асуудал гарлаа!");
          return;
        }


      }catch(error){
        console.log("Бүртгүүлэхэд алдаа гарлаа:", error);
        setError("Бүртгүүлэхэд алдаа гарлаа. Дахин оролдоно уу.");
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
      <SuccessModal
        isOpen={showRegisterSuccessModal}
        message="Амжилттай бүртгүүллээ! Одоо нэвтрэх боломжтой."
      />

      {/* Login Success Modal */}
      <SuccessModal
        isOpen={showLoginSuccessModal}
        message="Амжилттай нэвтэрлээ! Өдрийг сайхан өнгөрүүлээрэй."
      />
    </>
  );
}
