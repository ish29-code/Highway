import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import AdminUser from "../models/AdminUser.js";

const router = Router();

// POST /auth/login { email, password }
router.post("/login", async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ message: "Missing credentials" });
  const user = await AdminUser.findOne({ email: email.toLowerCase() });
  if (!user) return res.status(401).json({ message: "Invalid email or password" });
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ message: "Invalid email or password" });

  const token = jwt.sign({ id: user._id, email: user.email, role: "admin" }, process.env.JWT_SECRET, {
    expiresIn: "7d"
  });
  res.json({ token });
});

export default router;
