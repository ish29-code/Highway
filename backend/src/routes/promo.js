import { Router } from "express";
import Promo from "../models/Promo.js";

const router = Router();

// POST /promo/validate { code, subtotal }
router.post("/validate", async (req, res) => {
  const { code, subtotal } = req.body || {};
  if (!code) return res.status(400).json({ valid: false, message: "Code required" });
  const promo = await Promo.findOne({ code: code.trim().toUpperCase() });
  if (!promo) return res.json({ valid: false, message: "Invalid code" });

  let discount = 0;
  if (promo.discountType === "percentage") discount = Math.round((subtotal * promo.amount) / 100);
  else discount = promo.amount;

  res.json({ valid: true, discount });
});

export default router;
