import mongoose from "mongoose";

const PromoSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true },
    discountType: { type: String, enum: ["percentage", "flat"], required: true },
    amount: { type: Number, required: true }
  },
  { timestamps: true }
);

export default mongoose.model("Promo", PromoSchema);
