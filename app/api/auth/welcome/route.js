import { Resend } from "resend";
import WelcomeEmail from "../../../../emails/WelcomeEmail";


export async function POST(request) {
  const { email, name } = await request.json();
  const dashboardUrl =
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    await resend.emails.send({
      from: "Vitto <onboarding@resend.dev>",
      to: email,
      subject: "Welcome to Our Platform!",
      react: WelcomeEmail({ name, email, dashboardUrl }),
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Welcome email error:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}