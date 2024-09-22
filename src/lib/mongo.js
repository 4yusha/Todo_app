import mongoose from "mongoose";

export async function dbConnect() {
    if (mongoose.connection.readyState >= 1) {
        return mongoose.connection.asPromise();
    }

    try {
        const conn = await mongoose.connect(String(process.env.MONGO_DB_CONNECTION_STRING));
        console.log("MongoDB connected");
        return conn;
    } catch (e) {
        console.error("MongoDB connection error:", e.message);
        throw new Error(e);
    }
}
