import mongoose from "mongoose";

const AdminUserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true }, // bcrypt hash
    role: { type: String, default: "admin" }
  },
  { timestamps: true }
);

export default mongoose.model("AdminUser", AdminUserSchema);
