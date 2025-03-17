import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import pool, { connectWithRetry } from "./db";
import cookieParser from "cookie-parser";

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Routes
app.use("/api/auth", authRoutes);

// Khởi động server sau khi kết nối database thành công
const startServer = async () => {
  try {
    await connectWithRetry(); // Đợi kết nối database thành công
    console.log("Starting server...");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server due to database connection error:");
    process.exit(1); // Thoát nếu không thể kết nối
  }
};

startServer();