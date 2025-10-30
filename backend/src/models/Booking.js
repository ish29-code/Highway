import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    experienceId: { type: mongoose.Schema.Types.ObjectId, ref: "Experience", required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    qty: { type: Number, required: true, min: 1, default: 1 },
    subtotal: { type: Number, required: true },
    taxes: { type: Number, required: true },
    total: { type: Number, required: true },
    refId: { type: String, required: true, unique: true }
  },
  { timestamps: true }
);

export default mongoose.model("Booking", BookingSchema);
