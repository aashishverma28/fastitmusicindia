# Deployment Guide for Fastit Music India

This guide explains how to deploy your Next.js application to **Render.com**.

## 1. Prerequisites (Setup Git)
Render uses Git to deploy your code. Since Git is not yet installed on your system, follow these steps first:
1.  **Download Git:** [git-scm.com/download/win](https://git-scm.com/download/win).
2.  Install it with default settings.
3.  **Restart VS Code** or your Terminal after installation.

## 2. Push Your Code to GitHub
Open your terminal in this folder and run these commands one by one:

```powershell
# Initialize git
git init

# Add all files (automatically ignores node_modules and .next)
git add .

# Save your changes
git commit -m "Ready for deployment"

# Connect to GitHub (Go to github.com/new, create a repo, and copy the lines they give you)
# It will look like this:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

## 3. Configure Render.com
1.  Log in to **[Render.com](https://dashboard.render.com/)**.
2.  Click **New +** > **Web Service**.
3.  Connect the GitHub repository you just created.
4.  Use these settings:
    - **Runtime:** `Node`
    - **Build Command:** `npm install && npx prisma generate && npm run build`
    - **Start Command:** `npm run start`

## 4. Set Environment Variables (Crucial!)
Go to the **Environment** tab in your Render dashboard and add these variables from your `.env` file:

| Key | Value (from your .env) |
| :--- | :--- |
| `DATABASE_URL` | Your Supabase pooled URL |
| `DIRECT_URL` | Your Supabase direct URL |
| `NEXTAUTH_SECRET` | Your random secret string |
| `NEXTAUTH_URL` | `https://your-service-name.onrender.com` |
| `PRISMA_CLIENT_ENGINE_TYPE` | `library` |
| `RESEND_API_KEY` | Your Resend API key |

## 5. Persistence (How to stop it from sleeping)
On the Render Free Tier, the app sleeps after 15 minutes of inactivity.
1.  Use the **Keep-Alive** endpoint I created: `https://your-app.onrender.com/api/system/keep-alive`
2.  Set up a free monitor at [UptimeRobot.com](https://uptimerobot.com/) to ping this URL every 5 minutes.
