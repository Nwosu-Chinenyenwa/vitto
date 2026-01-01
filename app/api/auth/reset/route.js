import { Resend } from "resend";
import PasswordResetEmail from "../../../../emails/PasswordResetEmail";

export async function POST(request) {
  const { email, name, resetUrl } = await request.json();

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    await resend.emails.send({
      from: "Vitto <onboarding@resend.dev>",
      to: email,
      subject: "Reset Your Password",
      react: PasswordResetEmail({ name, email, resetUrl }),
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Resend error:", error); // Optional: log for debugging
    return Response.json({ error: error.message }, { status: 500 });
  }
}