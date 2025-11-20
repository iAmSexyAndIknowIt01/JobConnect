import { supabase } from "@/lib/supabaseClients";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { email, password, firstName, lastName, phone, address } =
      await req.json();

    // check duplicate
    const { data: exists } = await supabase
      .from("user_accounts")
      .select("id")
      .eq("email", email)
      .single();

    if (exists) {
      return Response.json(
        { error: "Энэ имэйлээр хэрэглэгч бүртгэлтэй байна" },
        { status: 400 }
      );
    }

    // hash password
    const hashed = await bcrypt.hash(password, 10);

    // 1) create user in user_accounts
    const { data: user, error: accountError } = await supabase
      .from("user_accounts")
      .insert({
        email,
        hashed_password: hashed,
      })
      .select("id")
      .single();

    if (accountError) throw accountError;

    // 2) create empty profile row
    await supabase.from("user_profiles").insert({
      id: user.id,
      first_name: firstName,
      last_name: lastName,
      phone,
      address,
    });

    return Response.json({ success: true });
  } catch (err: any) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
