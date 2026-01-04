import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const { requestId } = await req.json();

    if (!requestId) {
      return NextResponse.json(
        { error: "requestId is required" },
        { status: 400 }
      );
    }

    // 🔐 Supabase client (Service Role)
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    // 1️⃣ open_request → jobid
    const { data: request, error: reqError } = await supabase
      .from("open_request")
      .select("jobid")
      .eq("requestid", requestId)
      .single();

    if (reqError || !request) {
      console.error("Request error:", reqError);
      return NextResponse.json({ error: "Request not found" }, { status: 404 });
    }

    // 2️⃣ open_jobs → job info
    const { data: job, error: jobError } = await supabase
      .from("open_jobs")
      .select("title, description, employer_company")
      .eq("id", request.jobid)
      .single();

    if (jobError || !job) {
      console.error("Job error:", jobError);
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    // 3️⃣ employer_accounts → company info
    const { data: employer, error: empError } = await supabase
      .from("employer_accounts")
      .select("company_name, email")
      .eq("id", job.employer_company)
      .single();

    if (empError || !employer) {
      console.error("Employer error:", empError);
      return NextResponse.json({ error: "Employer not found" }, { status: 404 });
    }

    // 📩 Mail data
    const { title, description } = job;
    const { company_name, email } = employer;

    // 🔥 Resend client
    const resend = new Resend(process.env.RESEND_API_KEY!);

    // 4️⃣ Mail илгээх (SMTP ❌, Resend ✅)
    const { data, error } = await resend.emails.send({
      from: "MStaffing <onboarding@resend.dev>", // domain баталгаажаагүй үед
      to: email,
      subject: "Шинэ ажилд хүсэлт ирлээ",
      html: `
        <h3>Сайн байна уу, ${company_name}</h3>
        <p><b>${title}</b> ажилд шинэ хүсэлт ирлээ.</p>
        <p>${description}</p>
        <p>MStaffing системд нэвтэрч дэлгэрэнгүйг шалгана уу.</p>
        <br />
        <small>MStaffing</small>
      `,
    });

    if (error) {
      console.error("❌ Resend error:", error);
      return NextResponse.json({ error }, { status: 500 });
    }

    console.log("✅ Mail sent via Resend:", data?.id);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("❌ Notify company error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
