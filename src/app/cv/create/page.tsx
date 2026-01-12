"use client";

import { useState, useEffect } from "react";

/* ================= STATE ================= */

const emptyForm = {
  name: "",
  furigana: "",
  birth: "",
  age: "",
  address: "",
  contact: "",
  educationWork: "",
  licenses: "",
  motivation: "",
  selfPr: "",
};

export default function RirekishoPage() {
  const [form, setForm] = useState(emptyForm);
  const [photo, setPhoto] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editMode, setEditMode] = useState(false); // default OFF

  /* ================= FETCH USER DATA ON MOUNT ================= */
  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    if (!userId) return;

    const fetchRirekisho = async () => {
      try {
        const res = await fetch(`/api/rirekishos?userId=${userId}`);
        const data = await res.json();
        if (res.ok && data?.data) {
          setForm({
            name: data.data.name || "",
            furigana: data.data.furigana || "",
            birth: data.data.birth || "",
            age: data.data.age || "",
            address: data.data.address || "",
            contact: data.data.contact || "",
            educationWork: data.data.educationWork || "",
            licenses: data.data.licenses || "",
            motivation: data.data.motivation || "",
            selfPr: data.data.selfPr || "",
          });
          if (data.data.photo) setPhoto(data.data.photo);
        }
      } catch (e) {
        console.error("Failed to fetch rirekishos", e);
      }
    };

    fetchRirekisho();
  }, []);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!editMode) return; // edit mode OFF бол input өөрчлөхийг хориглоно
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editMode) return;
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPhoto(reader.result as string);
    reader.readAsDataURL(file);
  };

  /* ================= SAVE TO BACKEND ================= */
  const saveRirekisho = async () => {
    try {
      const userId = sessionStorage.getItem("userId");
      if (!userId) {
        alert("Хэрэглэгчийн ID олдсонгүй");
        return;
      }
      setSaving(true);

      const response = await fetch("/api/rirekishos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, user_id: userId }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Save failed", data);
        alert("Хадгалах үед алдаа гарлаа: " + data.error);
        setSaving(false);
        return;
      }

      alert("Амжилттай хадгалагдлаа!");
      setSaving(false);
      setEditMode(false); // хадгалсны дараа edit mode-г унтраана
    } catch (e) {
      console.error(e);
      alert("Server error");
      setSaving(false);
    }
  };

  /* ================= PDF DOWNLOAD (SSR SAFE) ================= */
  const downloadPdf = async () => {
    if (typeof window === "undefined") return;

    const el = document.getElementById("rirekisho-pdf");
    if (!el) {
      alert("PDF element not found");
      return;
    }

    const html2pdf = (await import("html2pdf.js")).default;

    await html2pdf()
      .set({
        filename: "履歴書.pdf",
        margin: 5,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          backgroundColor: "#ffffff",
        },
        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation: "portrait",
        },
      })
      .from(el)
      .save();
  };

  /* ================= RENDER ================= */
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-black
                    text-gray-100 flex justify-center pt-32 px-6">
      <div className="w-full max-w-3xl space-y-8">
        {/* ===== Title ===== */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold">履歴書 作成</h1>
          <p className="text-gray-400 mt-2">
            日本標準フォーマットに基づいて履歴書を作成します
          </p>
        </div>

        <div className="flex justify-end mb-4">
          <button
            onClick={() => setEditMode(!editMode)}
            className="bg-yellow-600 hover:bg-yellow-700 py-2 px-4 rounded-xl font-semibold"
          >
            {editMode ? "編集モード解除" : "編集モード"}
          </button>
        </div>

        {/* ===== FORM ===== */}
        <FormCard title="基本情報">
          <Grid>
            <Input label="氏名" name="name" value={form.name} onChange={onChange} readOnly={!editMode} />
            <Input label="ふりがな" name="furigana" value={form.furigana} onChange={onChange} readOnly={!editMode} />
            <Input label="生年月日" name="birth" value={form.birth} onChange={onChange} readOnly={!editMode} />
            <Input label="年齢" name="age" value={form.age} onChange={onChange} readOnly={!editMode} />
          </Grid>
          <Input label="現住所" name="address" value={form.address} onChange={onChange} readOnly={!editMode} />
          <Input label="連絡先" name="contact" value={form.contact} onChange={onChange} readOnly={!editMode} />
        </FormCard>

        <FormCard title="証明写真">
          <input
            type="file"
            accept="image/*"
            onChange={onPhotoChange}
            disabled={!editMode}
          />
        </FormCard>

        <FormCard title="学歴・職歴">
          <Textarea name="educationWork" value={form.educationWork} onChange={onChange} readOnly={!editMode} />
        </FormCard>

        <FormCard title="免許・資格">
          <Textarea name="licenses" value={form.licenses} onChange={onChange} readOnly={!editMode} />
        </FormCard>

        <FormCard title="志望動機">
          <Textarea name="motivation" value={form.motivation} onChange={onChange} readOnly={!editMode} />
        </FormCard>

        <FormCard title="自己PR">
          <Textarea name="selfPr" value={form.selfPr} onChange={onChange} readOnly={!editMode} />
        </FormCard>

        {/* ===== ACTION BUTTONS ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            onClick={downloadPdf}
            className="bg-green-600 hover:bg-green-700 py-4 rounded-xl font-semibold"
          >
            ダウンロード
          </button>

          <button
            onClick={() => setShowPreview(true)}
            className="bg-gray-700 hover:bg-gray-600 py-4 rounded-xl font-semibold"
          >
            プレビュー
          </button>

          <button
            onClick={saveRirekisho}
            disabled={!editMode || saving}
            className="bg-blue-600 hover:bg-blue-700 py-4 rounded-xl font-semibold shadow-xl disabled:opacity-50"
          >
            {saving ? "保存中..." : "保存する"}
          </button>
        </div>
      </div>

      {/* ================= PREVIEW MODAL ================= */}
      {showPreview && (
        <div className="fixed inset-0 z-50 bg-black/70 flex justify-center items-start
                        overflow-y-auto px-4 py-10">
          <div className="relative bg-white text-gray-900 w-[210mm] p-10 rounded-xl shadow-2xl">
            <button
              onClick={() => setShowPreview(false)}
              className="absolute top-4 right-4"
            >
              ✕
            </button>
            <RirekishoPreview form={form} photo={photo} />
          </div>
        </div>
      )}

      {/* ================= PDF ONLY ================= */}
      <div className="absolute -left-[9999px] top-0">
        <div id="rirekisho-pdf" className="bg-white text-gray-900 p-10 w-[210mm]">
          <RirekishoPreview form={form} photo={photo} />
        </div>
      </div>
    </div>
  );
}

/* ================= PREVIEW & UI PARTS ================= */

function RirekishoPreview({ form, photo }: any) {
  return (
    <div className="space-y-6 text-sm">
      <h2 className="text-center text-2xl font-bold tracking-widest">履 歴 書</h2>
      <table className="w-full border-collapse border">
        <tbody>
          <tr>
            <td className="border p-3 w-2/3">
              <div className="text-xs text-gray-500">ふりがな</div>
              <div>{form.furigana}</div>
              <div className="mt-2 text-xs text-gray-500">氏名</div>
              <div className="text-lg font-semibold">{form.name}</div>
            </td>
            <td className="border w-1/3 text-center">
              {photo ? (
                <img src={photo} className="w-28 h-36 mx-auto object-cover border" />
              ) : (
                <div className="w-28 h-36 mx-auto border flex items-center justify-center">
                  写真
                </div>
              )}
            </td>
          </tr>
          <tr>
            <td className="border p-3">生年月日：{form.birth}</td>
            <td className="border p-3">年齢：{form.age}</td>
          </tr>
          <tr>
            <td colSpan={2} className="border p-3">現住所：{form.address}</td>
          </tr>
          <tr>
            <td colSpan={2} className="border p-3">連絡先：{form.contact}</td>
          </tr>
        </tbody>
      </table>

      <Section title="学歴・職歴">{form.educationWork}</Section>
      <Section title="免許・資格">{form.licenses}</Section>
      <Section title="志望動機">{form.motivation}</Section>
      <Section title="自己PR">{form.selfPr}</Section>
    </div>
  );
}

function Section({ title, children }: any) {
  return (
    <div>
      <div className="font-semibold border-b mb-2">{title}</div>
      <div className="border p-3 min-h-20 whitespace-pre-wrap">{children}</div>
    </div>
  );
}

function FormCard({ title, children }: any) {
  return (
    <div className="bg-gray-800/90 border border-gray-700 rounded-2xl p-8 shadow-xl">
      <h3 className="text-xl font-semibold mb-6">{title}</h3>
      <div className="space-y-5">{children}</div>
    </div>
  );
}

function Grid({ children }: any) {
  return <div className="grid md:grid-cols-2 gap-5">{children}</div>;
}

function Input({ label, readOnly, ...props }: any) {
  return (
    <div>
      <label className="text-sm text-gray-400 block mb-1">{label}</label>
      <input
        {...props}
        readOnly={readOnly}
        className={`w-full p-4 bg-gray-900 border border-gray-700 rounded-xl text-gray-100 ${
          readOnly ? "opacity-70 cursor-not-allowed" : ""
        }`}
      />
    </div>
  );
}

function Textarea({ readOnly, ...props }: any) {
  return (
    <textarea
      {...props}
      readOnly={readOnly}
      rows={5}
      className={`w-full p-4 bg-gray-900 border border-gray-700 rounded-xl text-gray-100 ${
        readOnly ? "opacity-70 cursor-not-allowed" : ""
      }`}
    />
  );
}
