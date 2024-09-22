import { NextResponse } from "next/server";
import { createUser } from "@/queries/users";
import bcrypt from "bcryptjs";
import { dbConnect } from "@/lib/mongo"; 

export const POST = async (request) => {
    const { name, email, password, confirmPassword } = await request.json();

    // Basic validation
    if (!name || !email || !password || password !== confirmPassword) {
        return new NextResponse("Invalid input", {
            status: 400,
        });
    }

    console.log(name, email, password, confirmPassword);

    // Create a DB connection
    await dbConnect();

    // Encrypt the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Form a DB payload
    const newUser = { 
        email,
        name,
        password: hashedPassword,
    };

    // Update the DB
    try {
        await createUser(newUser);
        return new NextResponse("User has been created.", {
            status: 201,
        });
    } catch (err) {
        return new NextResponse(err.message, {
            status: 500,
        });
    }
};
