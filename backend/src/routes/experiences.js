import { Router } from "express";
import Experience from "../models/Experience.js";
import { requireAdmin } from "../middleware/auth.js";

const router = Router();

// GET /experiences (optional ?q=)
router.get("/", async (req, res) => {
  const q = (req.query.q || "").toLowerCase();
  let items = await Experience.find().sort({ createdAt: -1 });
  if (q) {
    items = items.filter((x) =>
      [x.title, x.location, x.regionTag].join(" ").toLowerCase().includes(q)
    );
  }
  res.json(items);
});

// GET /experiences/:id
router.get("/:id", async (req, res) => {
  const item = await Experience.findById(req.params.id);
  if (!item) return res.status(404).json({ message: "Not found" });
  res.json(item);
});

// ADMIN CRUD (Option A: open, Option B: JWT-protected)
// To use open CRUD for quick demo, remove requireAdmin from below routes.
// To protect, keep requireAdmin.
router.post("/", requireAdmin, async (req, res) => {
  try {
    const doc = await Experience.create(req.body);
    res.status(201).json(doc);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

router.put("/:id", requireAdmin, async (req, res) => {
  const doc = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!doc) return res.status(404).json({ message: "Not found" });
  res.json(doc);
});

router.delete("/:id", requireAdmin, async (req, res) => {
  const r = await Experience.findByIdAndDelete(req.params.id);
  if (!r) return res.status(404).json({ message: "Not found" });
  res.json({ success: true });
});

export default router;
