import mongoose from "mongoose";

interface UserIdObject {
    firstName: string;
    lastName: string;
    email: string;
    password: string
}

const userIdSchema = new mongoose.Schema<UserIdObject>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
});

const UserId = mongoose.model<UserIdObject>("User ID", userIdSchema);

export default UserId;