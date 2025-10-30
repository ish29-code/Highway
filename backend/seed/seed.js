import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { connectDB } from "../src/config/db.js";
import Experience from "../src/models/Experience.js";
import Promo from "../src/models/Promo.js";
import AdminUser from "../src/models/AdminUser.js";

dotenv.config();

const images = {
  kayaking: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop",
  sunrise: "https://images.unsplash.com/photo-1473177104440-ffee2f376098?q=80&w=1600&auto=format&fit=crop",
  coffee: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1600&auto=format&fit=crop",
  boat: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop",
  bungee: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1600&auto=format&fit=crop",
  forest: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1600&auto=format&fit=crop",

};

const baseDesc = "Curated small-group experience. Certified guide. Safety first with gear included.";
const about = "Scenic routes, trained guides, and safety briefing. Minimum age 10.";

const dates = ["2025-10-22", "2025-10-23", "2025-10-24", "2025-10-25"];
const slots = [
  { time: "07:00 am", left: 4 },
  { time: "09:00 am", left: 2 },
  { time: "11:00 am", left: 5 },
  { time: "01:00 pm", left: 0 }
];

async function run() {
  await connectDB(process.env.MONGO_URI);

  await Experience.deleteMany({});
  await Promo.deleteMany({});
  await AdminUser.deleteMany({});

  await Experience.insertMany([
    { title: "Kayaking", location: "Udupi", regionTag: "Udupi, Karnataka", price: 999, description: baseDesc, about, dates, slots, image: images.kayaking },
    { title: "Nandi Hills Sunrise", location: "Bangalore", regionTag: "Bangalore", price: 899, description: baseDesc, about, dates, slots, image: images.sunrise },
    { title: "Coffee Trail", location: "Coorg", regionTag: "Coorg", price: 1299, description: baseDesc, about, dates, slots, image: images.coffee },
    { title: "Boat Cruise", location: "Sunderban", regionTag: "Sunderban", price: 999, description: baseDesc, about, dates, slots, image: images.boat },
    { title: "Bungee Jumping", location: "Manali", regionTag: "Manali", price: 999, description: baseDesc, about, dates, slots, image: images.bungee },
    { title: "Forest Walk", location: "Coorg", regionTag: "Coorg", price: 1299, description: baseDesc, about, dates, slots, image: images.forest },
    { title: "Coffee Trail", location: "Coorg", regionTag: "Coorg", price: 1299, description: baseDesc, about, dates, slots, image: images.coffee },
    { title: "Nandi Hills Sunrise", location: "Bangalore", regionTag: "Bangalore", price: 899, description: baseDesc, about, dates, slots, image: images.sunrise }
  ]);

  await Promo.insertMany([
    { code: "SAVE10", discountType: "percentage", amount: 10 },
    { code: "FLAT100", discountType: "flat", amount: 100 }
  ]);

  const passwordHash = await bcrypt.hash("admin123", 10);
  await AdminUser.create({ email: "admin@bookit.com", passwordHash });

  console.log("✅ Seed complete: experiences, promos, admin user (admin@bookit.com / admin123)");
  process.exit(0);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
