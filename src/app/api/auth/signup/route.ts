import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { signupSchema } from "@/lib/validators/signup-schema";

export async function POST(req: Request) {
  const body = await req.json();

  const result = signupSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { error: result.error.errors[0].message, errors: result.error.errors },
      { status: 400 },
    );
  }

  const { email, password } = result.data;

  // Check if user already exist
  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    return NextResponse.json(
      { error: "Email already in use" },
      { status: 400 },
    );
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  // Send verification token email

  return NextResponse.json({ user });
}
