import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { validate } from "uuid";

export async function POST(req: Request) {
  try {
    const { token } = await req.json();

    if (!token || !validate(token)) {
      return NextResponse.json(
        {
          error: "Invalid token",
        },
        { status: 400 },
      );
    }

    // Find the verification token
    const existingToken = await prisma.verificationToken.findUnique({
      where: { token },
    });

    if (!existingToken) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    // Check if token expired
    if (existingToken.expires < new Date()) {
      return NextResponse.json({ error: "Token expired" }, { status: 400 });
    }

    // Mark user as verified
    await prisma.user.update({
      where: { email: existingToken.email },
      data: { emailVerified: new Date() },
    });

    // Delete the token so it can’t be reused
    await prisma.verificationToken.delete({
      where: { token },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Soemthing went wrong" },
      {
        status: 500,
      },
    );
  }
}
