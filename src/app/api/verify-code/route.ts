import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // server only
);

export async function POST(req: Request) {
  try {
    const { email, code } = await req.json();

    if (!email || !code) {
      return NextResponse.json(
        { error: "Email болон баталгаажуулах код шаардлагатай" },
        { status: 400 }
      );
    }

    // 1️⃣ verification код шалгах
    const { data, error } = await supabase
      .from("email_verification_requests")
      .select("*")
      .eq("email", email)
      .eq("verification_code", code)
      .eq("is_used", false)
      .single();

    if (error || !data) {
        console.log("❌ OTP verification error:", error);
        console.log("Data:", data);
      return NextResponse.json(
        { error: "Баталгаажуулах код буруу эсвэл хугацаа дууссан" },
        { status: 400 }
      );
    }

    // 2️⃣ verified болгож update хийх
    const { error: updateError } = await supabase
      .from("email_verification_requests")
      .update({ is_used: true })
      .eq("id", data.id);

    if (updateError) {
      return NextResponse.json(
        { error: "Баталгаажуулалтыг хадгалж чадсангүй" },
        { status: 500 }
      );
    }

    

    return NextResponse.json({
      success: true,
      message: "Амжилттай баталгаажлаа",
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
