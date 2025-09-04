import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { signupSchema } from "@/lib/validators/signup-schema";
import { generateVerificationToken } from "@/utils/tokens";
import { sendVerificationEmail } from "@/utils/mail";

export async function POST(req: Request) {
  try {
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

    // Generate & Send verification token email
    const verificationToken = await generateVerificationToken(email);
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
    );

    return NextResponse.json({ success: "Confirmation email sent!" });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong!" },
      { status: 500 },
    );
  }
}
