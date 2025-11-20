import { supabase } from "@/lib/supabaseClients";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // find user
    const { data: user, error } = await supabase
      .from("user_accounts")
      .select("*")
      .eq("email", email)
      .single();

    if (error || !user)
      return Response.json(
        { error: "Бүртгэлгүй хэрэглэгч байна!" },
        { status: 400 }
      );

    // compare password
    const ok = await bcrypt.compare(password, user.hashed_password);
    if (!ok)
      return Response.json(
        { error: "Имэйл эсвэл нууц үг буруу байна!!" },
        { status: 400 }
      );

    return Response.json({ success: true, userId: user.id });
  } catch (err: any) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
