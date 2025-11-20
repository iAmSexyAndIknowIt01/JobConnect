import { supabase } from "@/lib/supabaseClients";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;
  const userId = formData.get("userId") as string;

  if (!file) {
    return Response.json({ error: "No file uploaded" }, { status: 400 });
  }

  const fileName = `${userId}-${Date.now()}.png`;

  const { data, error } = await supabase.storage
    .from("avatars")
    .upload(fileName, file, {
      upsert: true,
    });

  if (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }

  const publicUrl = supabase.storage
    .from("avatars")
    .getPublicUrl(fileName).data.publicUrl;

  return Response.json({ url: publicUrl });
}
