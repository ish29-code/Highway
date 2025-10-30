import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import auth from "./routes/auth.js";
import experiences from "./routes/experiences.js";
import bookings from "./routes/bookings.js";
import promo from "./routes/promo.js";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: (process.env.DEPLOYED_URL || process.env.CORS_ORIGIN || "*")
      .split(",")
      .map((url) => url.trim()),
  })
);
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (_req, res) => res.send("BookIt API running"));
app.use("/auth", auth);
app.use("/experiences", experiences);
app.use("/bookings", bookings);
app.use("/promo", promo);

const PORT = process.env.PORT || 4000;

connectDB(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`🚀 API on :${PORT}`));
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
