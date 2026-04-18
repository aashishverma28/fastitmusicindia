import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/db";
import { compare } from "bcryptjs";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "hello@example.com" },
        password: { label: "Password", type: "password" },
        isAdminLogin: { label: "Admin Login", type: "text" },
        isEmployeeLogin: { label: "Employee Login", type: "text" },
      },
      async authorize(credentials) {
        console.log(`[AUTH] Attempting login for: ${credentials?.email}`);
        console.log(`[AUTH] Credentials received:`, { 
          email: credentials?.email, 
          isAdmin: credentials?.isAdminLogin,
          isEmployee: credentials?.isEmployeeLogin 
        });
        const email = credentials?.email?.trim();
        const user = await prisma.user.findFirst({
          where: {
            OR: [
              { email: email },
              { username: email },
            ],
          },
        });

        if (!user) {
          console.log(`[AUTH] User not found: ${credentials?.email}`);
          return null;
        }

        if (!user.isActive) {
          console.log(`[AUTH] User inactive: ${credentials?.email}`);
          return null;
        }

        const isAdminPortal    = credentials?.isAdminLogin    === "true";
        const isStaffPortal    = credentials?.isEmployeeLogin === "true";

        // ADMIN: must use /sysadmin/login
        if (user.role === "ADMIN" && !isAdminPortal) {
          console.log(`[AUTH] Admin blocked from public portal: ${credentials?.email}`);
          throw new Error("Admin login is not allowed from this portal.");
        }
        if (user.role !== "ADMIN" && isAdminPortal) {
          console.log(`[AUTH] Non-admin blocked from admin portal: ${credentials?.email}`);
          throw new Error("Only administrators can access this portal.");
        }

        // EMPLOYEE: must use /staff/login
        if (user.role === "EMPLOYEE" && !isStaffPortal) {
          console.log(`[AUTH] Employee blocked from public portal: ${credentials?.email}`);
          throw new Error("Staff login is not allowed from this portal.");
        }
        if (user.role !== "EMPLOYEE" && isStaffPortal) {
          console.log(`[AUTH] Non-employee blocked from staff portal: ${credentials?.email}`);
          throw new Error("Only employees can access this portal.");
        }

        // Password verification
        if (!credentials?.password) return null;
        const isPasswordValid = await compare(credentials.password, user.passwordHash);

        if (!isPasswordValid) {
          console.log(`[AUTH] Invalid password for: ${credentials?.email}`);
          return null;
        }

        console.log(`[AUTH] Successful login: ${credentials?.email} (${user.role})`);

        return {
          id: user.id,
          email: user.email,
          name: user.username || user.email.split("@")[0],
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      if (session.user && token) {
        (session.user as any).id   = token.id;
        (session.user as any).role = token.role;
      }
      return session;
    },
    jwt: ({ token, user }) => {
      if (user) {
        const u = user as any;
        token.id   = u.id;
        token.role = u.role;
      }
      return token;
    },
  },
};
