import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password required" },
        { status: 400 }
      );
    }
    await connectToDatabase();
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already registered" },
        { status: 400 }
      );
    }

    User.create({
      email,
      password,
    });

    return NextResponse.json(
      { error: "User registered successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.log("Registration error : ", err);
    return NextResponse.json(
      { error: "failed to register error" },
      { status: 500 }
    );
  }
}
