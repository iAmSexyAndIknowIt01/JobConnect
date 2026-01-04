import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const {
      email,
      password,
      firstName,
      lastName,
      phone,
      address,
    } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Required fields missing" },
        { status: 400 }
      );
    }

    // 🔐 Supabase client
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    // 🔢 6 оронтой OTP
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 минут

    // 🔁 Хуучин active OTP-г invalidate хийнэ
    await supabase
      .from("email_verification_requests")
      .update({ is_used: true })
      .eq("email", email)
      .eq("is_used", false);

    // 1️⃣ OTP + user data insert
    const { error: insertError } = await supabase
      .from("email_verification_requests")
      .insert({
        email,
        hashed_password: password, // ⚠️ дараа нь hash болгоно
        first_name: firstName,
        last_name: lastName,
        phone,
        address,
        verification_code: verificationCode,
        expires_at: expiresAt,
      });

    if (insertError) {
      console.error("❌ OTP insert error:", insertError);
      return NextResponse.json(
        { error: "OTP хадгалах үед алдаа гарлаа" },
        { status: 500 }
      );
    }

    // 🔥 Resend client
    const resend = new Resend(process.env.RESEND_API_KEY!);

    // 2️⃣ Mail илгээх
    const { data, error } = await resend.emails.send({
      from: "MStaffing <onboarding@resend.dev>", // domain баталгаажаагүй үед OK
      to: email,
      subject: "Таны баталгаажуулах код",
      html: `
        <div style="font-family: Arial, sans-serif">
          <h2>Имэйл баталгаажуулалт</h2>
          <p>Сайн байна уу, ${lastName} ${firstName}</p>

          <p>Таны баталгаажуулах код:</p>

          <h1 style="letter-spacing: 4px;">${verificationCode}</h1>

          <p>⏱ Код нь <b>5 минутын</b> хугацаанд хүчинтэй.</p>

          <br />
          <small>Хэрвээ та бүртгүүлээгүй бол энэ имэйлийг үл тооно уу.</small>
        </div>
      `,
    });

    if (error) {
      console.error("❌ Resend mail error:", error);
      return NextResponse.json(
        { error: "Баталгаажуулах майл илгээж чадсангүй" },
        { status: 500 }
      );
    }

    console.log("✅ Verification mail sent:", data?.id);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("❌ Verification API error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
