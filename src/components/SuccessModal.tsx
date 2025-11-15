"use client";

interface SuccessModalProps {
  isOpen: boolean;
  message: string;
}

export default function SuccessModal({ isOpen, message }: SuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/40 backdrop-blur-sm animate-[fadeInUp_0.4s_ease-out]">
      <div className="bg-green-500 text-white rounded-xl p-8 max-w-sm w-11/12 text-center shadow-2xl">
        <h3 className="text-2xl font-bold mb-2">{message}</h3>
      </div>
    </div>
  );
}
