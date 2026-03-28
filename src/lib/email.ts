import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp-relay.brevo.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendEmail = async (to: string, subject: string, html: string) => {
  const fromName = process.env.EMAIL_FROM_NAME || 'TWOEM PaaS Engine';
  const fromEmail = process.env.EMAIL_FROM || 'noreply@twoem.app';

  try {
    const info = await transporter.sendMail({
      from: `"${fromName}" <${fromEmail}>`,
      to,
      subject,
      html,
    });
    console.log("Message sent: %s", info.messageId);
    return true;
  } catch (error) {
    console.error("Error sending email", error);
    return false;
  }
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const domain = process.env.AUTH_URL || 'http://localhost:3000';
  const verificationLink = `${domain}/verify-email?token=${token}`;

  return sendEmail(
    email,
    'Verify your TWOEM Account',
    `
      <div style="font-family: monospace; max-width: 600px; margin: 0 auto;">
        <h2>Welcome to the TWOEM Cluster.</h2>
        <p>A new account operation was triggered for this email address.</p>
        <p>Please click the secure link below to verify your identity and activate your provisioning access:</p>
        <br/>
        <a href="${verificationLink}" style="background-color: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">Verify Email Address</a>
        <br/><br/>
        <p style="font-size: 12px; color: #666;">If you did not request this, please ignore this communication.</p>
      </div>
    `
  );
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const domain = process.env.AUTH_URL || 'http://localhost:3000';
  const resetLink = `${domain}/reset-password?token=${token}`;

  return sendEmail(
    email,
    'Reset your TWOEM Password',
    `
      <div style="font-family: monospace; max-width: 600px; margin: 0 auto;">
        <h2>Password Reset Request</h2>
        <p>A password reset operation was initiated for your TWOEM account.</p>
        <p>Click the link below to generate a new Argon2id encrypted credential:</p>
        <br/>
        <a href="${resetLink}" style="background-color: #0ea5e9; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">Reset Password</a>
        <br/><br/>
        <p style="font-size: 12px; color: #666;">This link will expire in 1 hour. If you did not request this, your account is secure and you can ignore this email.</p>
      </div>
    `
  );
};
