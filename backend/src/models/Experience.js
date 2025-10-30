import mongoose from "mongoose";

const SlotSchema = new mongoose.Schema(
  { time: { type: String, required: true }, left: { type: Number, required: true, min: 0 } },
  { _id: false }
);

const ExperienceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    location: { type: String, required: true },
    regionTag: { type: String, default: "" },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    about: { type: String, default: "" },
    dates: [{ type: String, required: true }],
    slots: [SlotSchema],
    image: { type: String, required: true }
  },
  { timestamps: true }
);

export default mongoose.model("Experience", ExperienceSchema);
