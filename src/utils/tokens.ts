import { v4 as uuid } from "uuid";
import { getVerificationTokenByEmail } from "./verification-token";
import { prisma } from "@/lib/prisma";

export const generateVerificationToken = async (email: string) => {
  const token = uuid();
  const expires = new Date(Date.now() + 3600 * 1000); // 1 Hour

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await prisma.verificationToken.deleteMany({
      where: { email },
    });
  }

  const verificationToken = await prisma.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });
  return verificationToken;
};
