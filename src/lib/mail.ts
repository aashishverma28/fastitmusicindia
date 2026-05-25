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

/**
 * Sends a confirmation email to the candidate when they apply.
 */
export async function sendJobApplicationConfirmation(
  email: string,
  name: string,
  roleTitle: string
) {
  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
      <h2 style="color: #f00a88;">Application Received! 📝</h2>
      <p>Hello ${name},</p>
      <p>Thank you for your interest in joining <strong>Fastit Music India</strong>! We've received your application for the <strong>"${roleTitle}"</strong> role.</p>
      <p>Our review team is currently looking over your credentials and pitch. We typically get back to candidates within 3-5 business days.</p>
      
      <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f00a88;">
        <p style="margin: 0; font-size: 14px; color: #666;"><strong>Next Steps:</strong></p>
        <p style="margin: 5px 0 0 0; font-size: 13px; color: #333;">If your skills align with our current requirements, we will reach out to you via this email address to schedule an interview.</p>
      </div>

      <p>In the meantime, feel free to explore our public platform and catalog at <a href="https://fastitmusic.in" style="color: #f00a88; font-weight: bold; text-decoration: none;">fastitmusic.in</a>.</p>

      <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
      <p style="font-size: 12px; color: #999;">This is an automated confirmation. Please do not reply directly to this email. For queries, contact careers@fastitmusic.in</p>
    </div>
  `;

  if (!resend) {
    console.log("-----------------------------------------");
    console.log("[MOCK MAIL] To:", email);
    console.log("[MOCK MAIL] Subject: Application Received - " + roleTitle);
    console.log("[MOCK MAIL] Content: Candidate confirmation sent.");
    console.log("-----------------------------------------");
    return { success: true, mocked: true };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [email],
      subject: `Fastit Music India | Application Received - ${roleTitle}`,
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
 * Sends status updates on job applications.
 */
export async function sendJobApplicationStatusUpdate(
  email: string,
  name: string,
  roleTitle: string,
  status: string
) {
  const statusLabel = status.toUpperCase();
  let statusText = "";
  let statusColor = "#ffc301"; // Yellow for pending/review

  if (statusLabel === "REVIEWED") {
    statusText = "Our hiring team has completed the initial review of your portfolio and Cover Letter. Your profile has been shortlisted for further evaluation.";
    statusColor = "#00b0fc";
  } else if (statusLabel === "REJECTED") {
    statusText = "Thank you for taking the time to apply and share your portfolio with us. Unfortunately, we have decided not to move forward with your application for this specific position at this time. We will keep your resume on file for future openings that match your skills.";
    statusColor = "#ef4444";
  } else {
    statusText = "Your job application status has been updated to PENDING as we continue our review process.";
  }

  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
      <h2 style="color: ${statusColor};">Application Status Update 📢</h2>
      <p>Hello ${name},</p>
      <p>We are writing to provide an update on your application for the <strong>"${roleTitle}"</strong> role at Fastit Music India.</p>
      
      <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid ${statusColor};">
        <p style="margin: 0; font-size: 13px; color: #666; text-transform: uppercase; font-weight: bold; letter-spacing: 0.5px;">Current Status:</p>
        <p style="margin: 5px 0 10px 0; font-size: 16px; color: #000; font-weight: bold;">${statusLabel}</p>
        <p style="margin: 0; font-size: 14px; color: #333; line-height: 1.5;">${statusText}</p>
      </div>

      <p>If any next steps are required (such as scheduling an interview/technical task), our HR team will contact you directly via this thread.</p>
      
      <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
      <p style="font-size: 12px; color: #999;">Best regards,<br/>Fastit Music India Talent Acquisition Team</p>
    </div>
  `;

  if (!resend) {
    console.log("-----------------------------------------");
    console.log("[MOCK MAIL] To:", email);
    console.log("[MOCK MAIL] Subject: Application Status Update - " + roleTitle);
    console.log("[MOCK MAIL] Content: Status changed to " + statusLabel);
    console.log("-----------------------------------------");
    return { success: true, mocked: true };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [email],
      subject: `Fastit Music India | Application Status Update - ${roleTitle}`,
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
 * Sends the official offer letter.
 */
export async function sendOfferLetterEmail(
  email: string,
  name: string,
  roleTitle: string
) {
  const currentDate = new Date().toLocaleDateString("en-IN", {
    day: "numeric", month: "long", year: "numeric"
  });

  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 25px; border: 2px solid #000; border-radius: 0px; box-shadow: 6px 6px 0px 0px #22c55e;">
      <div style="text-align: center; margin-bottom: 25px; border-bottom: 2px solid #eee; padding-bottom: 15px;">
        <h1 style="color: #22c55e; margin: 0 0 5px 0; font-size: 24px; font-weight: 900; letter-spacing: -0.5px;">FASTIT MUSIC INDIA</h1>
        <p style="margin: 0; font-size: 12px; color: #666; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">Official Offer of Employment</p>
      </div>

      <p style="font-size: 13px; color: #555; text-align: right; margin-bottom: 20px;"><strong>Date:</strong> ${currentDate}</p>
      
      <p>Dear <strong>${name}</strong>,</p>
      <p>On behalf of Fastit Music India, we are absolutely thrilled to offer you the position of <strong>"${roleTitle}"</strong>! Your outstanding skills, portfolio, and vision perfectly align with our mission to revolutionize independent music distribution in India.</p>
      
      <h3 style="color: #000; border-bottom: 1px solid #000; padding-bottom: 5px; margin-top: 25px;">Employment Terms & Details:</h3>
      <table style="width: 100%; border-collapse: collapse; margin: 15px 0; font-size: 14px;">
        <tr>
          <td style="padding: 8px 0; color: #666; width: 40%;"><strong>Role Title:</strong></td>
          <td style="padding: 8px 0; color: #000;"><strong>${roleTitle}</strong></td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #666;"><strong>Department:</strong></td>
          <td style="padding: 8px 0; color: #000;">Engineering / Operations Support</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #666;"><strong>Employment Type:</strong></td>
          <td style="padding: 8px 0; color: #000;">Full-Time</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #666;"><strong>Location:</strong></td>
          <td style="padding: 8px 0; color: #000;">Assam / Remote Option</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #666;"><strong>Joining Date:</strong></td>
          <td style="padding: 8px 0; color: #000;">Within next 15-30 days (To be mutually agreed)</td>
        </tr>
      </table>

      <div style="background: #f0fdf4; border: 1px solid #bbf7d0; padding: 15px; border-radius: 4px; margin: 25px 0;">
        <p style="margin: 0; font-size: 13px; color: #166534; line-height: 1.5;">
          <strong>What's Next:</strong> Please review this offer. If you accept, please reply to this email stating your confirmation. Our HR operations manager will contact you with onboarding documents and contract signature portals shortly.
        </p>
      </div>

      <p>We are incredibly excited about the prospect of you joining the team and helping shape the future of independent Indian music acts!</p>
      
      <p style="margin-top: 30px; margin-bottom: 0;">Sincerely,</p>
      <p style="margin: 5px 0 0 0; font-weight: bold; color: #22c55e;">Aashish Verma</p>
      <p style="margin: 0; font-size: 12px; color: #666;">Founder & Director, Fastit Music India</p>
    </div>
  `;

  if (!resend) {
    console.log("-----------------------------------------");
    console.log("[MOCK MAIL] To:", email);
    console.log("[MOCK MAIL] Subject: Official Offer Letter - " + roleTitle);
    console.log("[MOCK MAIL] Content: Offer letter sent successfully!");
    console.log("-----------------------------------------");
    return { success: true, mocked: true };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [email],
      subject: `Official Offer of Employment | ${roleTitle} - Fastit Music India`,
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

