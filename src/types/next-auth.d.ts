import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      username?: string | null;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    }
  }

  interface User extends DefaultUser {
    role: string;
    username?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
  }
}
