import { User } from "@/model/user-model";

export async function createUser(userData) {
    try {
        const user = await User.create(userData);
        return user; // Return the created user or handle it as needed
    } catch (e) {
        console.error("Error creating user:", e.message);
        throw new Error(e);
    }
}
