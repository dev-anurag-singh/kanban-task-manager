import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import authConfig from "./auth.config";

declare module "next-auth" {
  interface User {
    emailVerified: Date | null;
  }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/login",
  },
  events: {
    async linkAccount({ user }) {
      await prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      // Allow OAuth without email verification
      if (account?.provider !== "credentials") return true;

      // Prevent Sign in without email verification
      if (!user.emailVerified) return false;

      // TODO: Add 2FA check

      return true;
    },
    async session({ token, session }) {
      if (token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});
