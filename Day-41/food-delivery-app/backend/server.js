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
import registerEmailListeners from "./events/emailEvents.js"
import { createServer } from "http"
import {Server} from "socket.io"
import { initSocket } from "./socket/socket.js"

dotenv.config();
connectDB();

const app = express();
registerEmailListeners();
const allowedOrigins = [process.env.CLIENT_URL, "http://localhost:3000", "http://localhost:3002"];

app.use(cors({
  origin: allowedOrigins,
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


const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
  },
});

initSocket(io); 

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});