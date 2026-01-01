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

    // 1️⃣ open_request → jobid авах
    const { data: request, error: reqError } = await supabase
      .from("open_request")
      .select("jobid")
      .eq("requestid", requestId)
      .single();

    if (reqError || !request) {
      console.error("Request error:", reqError);
      return NextResponse.json({ error: "Request not found" }, { status: 404 });
    }

    // 2️⃣ open_jobs → job мэдээлэл авах
    const { data: job, error: jobError } = await supabase
      .from("open_jobs")
      .select("title, description, employer_company")
      .eq("id", request.jobid)
      .single();

    if (jobError || !job) {
      console.error("Job error:", jobError);
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    // 3️⃣ employer_accounts → company info авах
    const { data: employer, error: empError } = await supabase
      .from("employer_accounts")
      .select("company_name, email")
      .eq("id", job.employer_company)
      .single();

    if (empError || !employer) {
      console.error("Employer error:", empError);
      return NextResponse.json({ error: "Employer not found" }, { status: 404 });
    }

    const jobTitle = job.title;
    const jobDescription = job.description;
    const companyName = employer.company_name;
    const companyEmail = employer.email;

    // 🌟 Environment-д тохиргоо
    const isDev = process.env.NODE_ENV !== "production";

    // 4️⃣ SMTP тохиргоо
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST!,
      port: Number(process.env.SMTP_PORT!),
      secure: !isDev, // Production-д secure=true, dev-д false
      auth: {
        user: process.env.SMTP_USER!,
        pass: process.env.SMTP_PASS!,
      },
      tls: isDev ? { rejectUnauthorized: false } : undefined, // dev-д self-signed зөвшөөрнө
    });

    // 5️⃣ Email илгээх
    await transporter.sendMail({
      from: `"JobConnect" <${process.env.SMTP_USER}>`,
      to: companyEmail,
      subject: "Шинэ ажилд хүсэлт ирлээ",
      html: `
        <h3>Сайн байна уу, ${companyName}</h3>
        <p><b>${jobTitle}</b> ажилд шинэ хүсэлт ирлээ.</p>
        <p>${jobDescription}</p>
        <p>JobConnect системд нэвтэрч дэлгэрэнгүйг шалгана уу.</p>
        <br />
        <small>JobConnect</small>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Notify company error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
