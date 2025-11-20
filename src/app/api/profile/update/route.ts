import { supabase } from "@/lib/supabaseClients";

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { userId, data } = body;

    const { error } = await supabase
      .from("profiles")
      .update(data)
      .eq("id", userId);

    if (error) {
      return Response.json({ error: error.message }, { status: 400 });
    }

    return Response.json({ success: true });
  } catch (e) {
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
