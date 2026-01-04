import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { createClient } from "@supabase/supabase-js";

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
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
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

    // 🌍 Environment
    const isDev = process.env.NODE_ENV !== "production";
    const port = Number(process.env.SMTP_PORT);

    // 4️⃣ SMTP transporter (🔥 хамгийн чухал хэсэг)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST!,
      port,
      secure: port === 465, // ✅ ЗӨВ ЛОГИК (NODE_ENV биш)
      auth: {
        user: process.env.SMTP_USER!,
        pass: process.env.SMTP_PASS!,
      },
      ...(isDev && {
        tls: { rejectUnauthorized: false }, // local/dev дээр OK
      }),
    });

    // 5️⃣ Mail илгээх
    const info = await transporter.sendMail({
      from: process.env.SMTP_USER, // 🔥 provider-д хамгийн найдвартай
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

    console.log("✅ Mail sent:", info.messageId);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("❌ Notify company error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
