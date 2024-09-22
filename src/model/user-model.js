import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    email: {
        required: true,
        type: String,
        unique: true, // Ensure email uniqueness
    },
    name: {
        required: true,
        type: String,
    },
    password: {
        required: true,
        type: String,
    },
});

export const User = mongoose.models.User || mongoose.model("User", userSchema);
