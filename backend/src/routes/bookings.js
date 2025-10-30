import { Router } from "express";
import Booking from "../models/Booking.js";
import Experience from "../models/Experience.js";
import { generateRefId } from "../utils/generateRefId.js";

const router = Router();

// POST /bookings
router.post("/", async (req, res) => {
  try {
    const { experienceId, name, email, date, time, qty = 1 } = req.body || {};
    if (!experienceId || !name || !email || !date || !time)
      return res.status(400).json({ message: "Missing fields" });

    const exp = await Experience.findById(experienceId);
    if (!exp) return res.status(404).json({ message: "Experience not found" });

    if (!exp.dates.includes(date)) return res.status(400).json({ message: "Invalid date" });
    const slot = exp.slots.find((s) => s.time === time);
    if (!slot) return res.status(400).json({ message: "Invalid time" });
    if (slot.left < qty) return res.status(409).json({ message: "Sold out" });

    // decrement slot available count (prevent double booking)
    slot.left -= qty;
    await exp.save();

    const subtotal = exp.price * qty;
    const taxes = Math.round(subtotal * 0.059); // ~5.9% to reflect screenshot math
    const total = subtotal + taxes;

    const booking = await Booking.create({
      experienceId,
      name,
      email,
      date,
      time,
      qty,
      subtotal,
      taxes,
      total,
      refId: generateRefId()
    });

    res.status(201).json({ success: true, refId: booking.refId, total: booking.total });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

export default router;
