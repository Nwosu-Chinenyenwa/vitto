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
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
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
  backgroundColor: "#CC0000",
  borderRadius: "4px",
  color: "#fff",
  display: "inline-block",
  fontSize: "16px",
  fontWeight: "600",
  padding: "12px 24px",
  textDecoration: "none",
};

export default function WelcomeEmail({ name, email, dashboardUrl = "/" }) {
  const displayName = name || email.split("@")[0];

  return (
    <Html>
      <Head />
      <Preview>¡Bienvenido a UpVote!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>¡Bienvenido, {displayName}! 🇲🇽</Heading>
          <Text style={text}>
            ¡Gracias por registrarte! Estamos muy emocionados de tenerte en
            nuestra comunidad.
          </Text>
          <Text style={text}>
            Ya puedes explorar todas las funciones y empezar a votar por tus
            celebridades favoritas.
          </Text>
          <Section style={buttonContainer}>
            <Link style={button} href={dashboardUrl}>
              Empezar a Votar
            </Link>
          </Section>
          <Text
            style={{
              ...text,
              fontSize: "14px",
              color: "#888",
              marginTop: "40px",
            }}
          >
            Si no fuiste tú quien se registró, puedes ignorar este correo sin
            problema.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
