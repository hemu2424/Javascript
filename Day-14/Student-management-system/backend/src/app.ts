import express from "express";
import cors from "cors";

import studentRoutes from "./routes/studentRoutes";

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "http://localhost:5173", // your Vite dev server URL
  credentials: true,
}));

// Student Routes
app.use("/students", studentRoutes);

// 404 Route
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

export default app;