import { Resend } from "resend";

const resend = (() => {
  const key = process.env.RESEND_API_KEY;
  if (key) {
    console.log("[MAIL] Resend client initialized with key:", `${key.substring(0, 6)}...${key.substring(key.length - 4)}`);
    return new Resend(key);
  }
  console.warn("[MAIL] Resend API key missing, running in MOCK mode");
  return null;
})();

const FROM_EMAIL = "Fastit Music India <onboarding@fastitmusic.in>";

/**
 * Sends an approval email to the applicant with their new credentials.
 */
export async function sendApprovalEmail(
  email: string, 
  password: string, 
  username: string
) {
  const loginUrl = `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/login`;

  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
      <h2 style="color: #FFD209;">Application Approved! 🚀</h2>
      <p>Congratulations! Your application for <strong>Fastit Music India</strong> has been approved.</p>
      <p>We've created your professional dashboard where you can start distributing your music world-wide.</p>
      
      <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p style="margin: 0; font-size: 14px; color: #666;">Login Credentials:</p>
        <p style="margin: 10px 0 0 0;"><strong>Username:</strong> ${username}</p>
        <p style="margin: 5px 0 0 0;"><strong>Password:</strong> <code style="background: #eee; padding: 2px 4px; border-radius: 4px;">${password}</code></p>
      </div>

      <p>For security reasons, we recommend changing your password after your first login.</p>
      
      <a href="${loginUrl}" style="display: inline-block; background: #FFD209; color: #000; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold; margin-top: 20px;">
        Login to Dashboard
      </a>

      <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
      <p style="font-size: 12px; color: #999;">If you have any questions, reply to this email or reach out to support@fastitmusic.in</p>
    </div>
  `;

  if (!resend) {
    console.log("-----------------------------------------");
    console.log("[MOCK MAIL] To:", email);
    console.log("[MOCK MAIL] Subject: Your Fastit Music Application was Approved!");
    console.log("[MOCK MAIL] Content:", `User: ${username}, Password: ${password}`);
    console.log("-----------------------------------------");
    return { success: true, mocked: true };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [email],
      subject: "Welcome to Fastit Music India | Your Account is Ready",
      html: html,
    });

    if (error) {
      console.error("[MAIL ERROR]", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (err) {
    console.error("[MAIL EXCEPTION]", err);
    return { success: false, error: err };
  }
}

/**
 * Sends a password reset email to the user with their new temporary password.
 */
export async function sendPasswordResetEmail(
  email: string, 
  newPassword: string,
  username?: string
) {
  const loginUrl = `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/login`;

  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
      <h2 style="color: #FFD209;">Password Reset Request</h2>
      <p>Hello ${username || email},</p>
      <p>A request has been made to reset your password for your <strong>Fastit Music India</strong> account.</p>
      
      <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p style="margin: 0; font-size: 14px; color: #666;">Your New Login Credentials:</p>
        <p style="margin: 10px 0 0 0;"><strong>Username / Email:</strong> ${username || email}</p>
        <p style="margin: 5px 0 0 0;"><strong>New Password:</strong> <code style="background: #eee; padding: 2px 4px; border-radius: 4px;">${newPassword}</code></p>
      </div>

      <p><strong>IMPORTANT:</strong> For security reasons, please login immediately and change your password in your account settings.</p>
      
      <a href="${loginUrl}" style="display: inline-block; background: #FFD209; color: #000; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold; margin-top: 20px;">
        Login to Dashboard
      </a>

      <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
      <p style="font-size: 12px; color: #999;">If you didn't request this, please contact support immediately at support@fastitmusic.in</p>
    </div>
  `;

  if (!resend) {
    console.log("-----------------------------------------");
    console.log("[MOCK MAIL] To:", email);
    console.log("[MOCK MAIL] Subject: Fastit Music - Password Reset");
    console.log("[MOCK MAIL] Content:", `New Password: ${newPassword}`);
    console.log("-----------------------------------------");
    return { success: true, mocked: true };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [email],
      subject: "Fastit Music India | Password Reset",
      html: html,
    });

    if (error) {
      console.error("[MAIL ERROR]", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (err) {
    console.error("[MAIL EXCEPTION]", err);
    return { success: false, error: err };
  }
}

/**
 * Sends a rejection email to an artist or label when their release is rejected.
 */
export async function sendReleaseRejectionEmail(
  email: string,
  releaseTitle: string,
  userName: string,
  adminFeedback?: string
) {
  const dashboardUrl = `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/dashboard`;

  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
      <h2 style="color: #ef4444;">Release Rejected ❌</h2>
      <p>Hello ${userName},</p>
      <p>We've reviewed your submission <strong>"${releaseTitle}"</strong> and unfortunately, it has been rejected at this time.</p>
      
      ${adminFeedback ? `
      <div style="background: #fef2f2; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #fee2e2;">
        <p style="margin: 0; font-size: 14px; color: #991b1b; font-weight: bold;">Feedback from Reviewer:</p>
        <p style="margin: 10px 0 0 0; color: #b91c1c; font-style: italic;">"${adminFeedback}"</p>
      </div>
      ` : ""}

      <p>Please review the feedback and make the necessary changes before resubmitting. You can update your release details and artwork in your dashboard.</p>
      
      <a href="${dashboardUrl}" style="display: inline-block; background: #FFD209; color: #000; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold; margin-top: 20px;">
        Go to Dashboard
      </a>

      <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
      <p style="font-size: 12px; color: #999;">If you have any questions regarding this rejection, please reach out to our content team at support@fastitmusic.in</p>
    </div>
  `;

  if (!resend) {
    console.log("-----------------------------------------");
    console.log("[MOCK MAIL] To:", email);
    console.log("[MOCK MAIL] Subject: Fastit Music - Release Rejected");
    console.log("[MOCK MAIL] Content:", `Release: ${releaseTitle}, Feedback: ${adminFeedback}`);
    console.log("-----------------------------------------");
    return { success: true, mocked: true };
  }

  try {
    console.log("[MAIL] Sending email to:", email, "via Resend...");
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [email],
      subject: `Action Required: Release Rejected - ${releaseTitle}`,
      html: html,
    });

    if (error) {
      console.error("[MAIL ERROR] Resend API error:", error);
      return { success: false, error };
    }

    console.log("[MAIL] Email sent successfully. ID:", data?.id);
    return { success: true, data };
  } catch (err) {
    console.error("[MAIL EXCEPTION] Failed to send email:", err);
    return { success: false, error: err };
  }
}
