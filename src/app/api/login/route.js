import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "@/model/user-model"; 
import { dbConnect } from "@/lib/mongo";
import { NextResponse } from "next/server";

export async function POST(req) {
    if (req.method !== "POST") {
        return NextResponse.json({ message: "Method Not Allowed" }, { status: 405 });
    }

    try {
        await dbConnect(); // Connect to the database

        const { email, password } = await req.json(); // Parse JSON body from the request

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: "Invalid email or password" }, { status: 400 });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json({ message: "Invalid email or password" }, { status: 400 });
        }

        const secretKey = process.env.JWT_SECRET;
        if (!secretKey) {
            throw new Error("JWT_SECRET is not defined in the environment variables");
        }

        const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: "1h" });

        return NextResponse.json({ message: "Login successful", token }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 });
    }
}
