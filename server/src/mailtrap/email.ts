import {
  generatePasswordResetEmailHtml,
  generateResetSuccessEmailHtml,
  generateWelcomeEmailHtml,
  htmlContent,
} from "./emailContent";
import { client, sender } from "./mailtrap";

export const sendVerificationEmail = async (
  email: string,
  verificationToken: string
) => {
  const recipients = [
    {
      email,
    },
  ];

  try {
    await client.send({
      from: sender,
      to: recipients,
      subject: "Verify your email",
      html: htmlContent.replace("{verificationToken}", verificationToken),
      category: "Email Verification",
    });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to send email verification");
  }
};

export const sendWelcomeEmail = async (email: string, name: string) => {
  const htmlContent = generateWelcomeEmailHtml(name);

  const recipients = [
    {
      email,
    },
  ];

  try {
    await client.send({
      from: sender,
      to: recipients,
      subject: "Welcome to GlobalBites",
      html: htmlContent,
      template_variables: {
        company_info_name: "GlobalBites",
        name: name,
      },
    });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to send welcome email");
  }
};

export const sendPasswordResetEmail = async (
  email: string,
  resetUrl: string
) => {
  const recipients = [
    {
      email,
    },
  ];

  const htmlContent = generatePasswordResetEmailHtml(resetUrl);
  try {
    await client.send({
      from: sender,
      to: recipients,
      subject: "Reset your password",
      html: htmlContent,
      category: "Reset Password",
    });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to send reset password email");
  }
};

export const sendResetSuccessEmail = async (email: string) => {
  const recipients = [
    {
      email,
    },
  ];
  const htmlContent = generateResetSuccessEmailHtml();

  try {
    await client.send({
      from: sender,
      to: recipients,
      subject: "Password reset successfully",
      html: htmlContent,
      category: "Password Changed",
    });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to reset password");
  }
};
