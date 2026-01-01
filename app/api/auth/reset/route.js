import { Resend } from "resend";
import PasswordResetEmail from "../../../../emails/PasswordResetEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  const { email, name, resetUrl } = await request.json();

  try {
    await resend.emails.send({
      from: ` Vitto <onboarding@resend.dev>`,
      to: email,
      subject: "Reset Your Password",
      react: PasswordResetEmail({ name, email, resetUrl }),
    });

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}