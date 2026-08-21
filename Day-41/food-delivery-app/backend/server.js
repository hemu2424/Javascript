import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import connectDB from "./config/db.js"
import authRoutes from "./routes/authRoutes.js"
import restaurantRoutes from "./routes/restaurantRoutes.js"
import menuItemRoutes from "./routes/menuItemRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import path from "path";
import { fileURLToPath } from "url"
import adminRoutes from "./routes/adminRoutes.js"

dotenv.config();
connectDB();

const app = express();
const allowedOrigins = process.env.CLIENT_URLS.split(",");
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.json({ message: "Food delivery API" });
});

app.use("/api/auth", authRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/menu", menuItemRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server is started ${PORT}`);
});
