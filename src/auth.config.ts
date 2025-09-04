import bcrypt from "bcryptjs";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { type NextAuthConfig } from "next-auth";
import { SignInSchema } from "./lib/validators/signin-schema";
import { prisma } from "./lib/prisma";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = SignInSchema.safeParse(credentials);

        if (!validatedFields.success) return null;

        const { email, password } = validatedFields.data;

        // Get the user form the db
        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });
        //   Dont proceed further if user does not have credentials
        if (!user || !user.password) return null;

        const passwordsMatch = await bcrypt.compare(password, user.password);

        if (!passwordsMatch) return null;
        return user;
      },
    }),
    Google,
  ],
} satisfies NextAuthConfig;
