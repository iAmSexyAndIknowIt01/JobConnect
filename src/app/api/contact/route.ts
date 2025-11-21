import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClients";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { message: "Талбарууд дутуу байна" },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("user_contact")
      .insert([{ name, email, message }]);

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { message: "Хадгалах үед алдаа гарлаа" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Амжилттай хадгаллаа" },
      { status: 200 }
    );

  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Серверийн алдаа" },
      { status: 500 }
    );
  }
}
