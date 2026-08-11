import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function sendOtpEmail(
  email: string,
  otp: string
) {
  try {
    await transporter.sendMail({
      from: `"AI Workspace" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your AI SAAS OTP",
      html: `
        <div>
          <h2>AI Workspace</h2>

          <p>Your login OTP is:</p>

          <h1>${otp}</h1>

          <p>
            This code will expire in 10 minutes.
          </p>

          <p>
            If you did not request this OTP,
            you can safely ignore this email.
          </p>
        </div>
      `,
    });

    console.log("OTP email sent to:", email);
  } catch (error) {
    console.error("Email error:", error);

    throw new Error("Failed to send OTP email");
  }
}