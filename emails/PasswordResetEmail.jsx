import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  maxWidth: "580px",
};

const h1 = {
  color: "#333",
  fontSize: "24px",
  fontWeight: "600",
  lineHeight: "1.25",
  marginBottom: "24px",
  textAlign: "center",
};

const text = {
  color: "#555",
  fontSize: "16px",
  lineHeight: "1.5",
  marginBottom: "24px",
};

const buttonContainer = { textAlign: "center", marginTop: "32px" };
const button = {
  backgroundColor: "#CC0000 ",
  borderRadius: "4px",
  color: "#fff",
  display: "inline-block",
  fontSize: "16px",
  fontWeight: "600",
  padding: "12px 24px",
  textDecoration: "none",
};

export default function PasswordResetEmail({ name, email, resetUrl }) {
  const displayName = name || email.split("@")[0];

  return (
    <Html>
      <Head />
      <Preview>Reset your password</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Password Reset Request</Heading>
          <Text style={text}>
            Hi {displayName},
          </Text>
          <Text style={text}>
            We received a request to reset your password. Click the button below to set a new one.
          </Text>
          <Text style={text}>
            This link will expire in 1 hour for security reasons.
          </Text>
          <Section style={buttonContainer}>
            <Link style={button} href={resetUrl}>
              Reset Password
            </Link>
          </Section>
          <Text style={{ ...text, fontSize: "14px", color: "#888", marginTop: "40px" }}>
            If you didn’t request this, you can safely ignore this email.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}