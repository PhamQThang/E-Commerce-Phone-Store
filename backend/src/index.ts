import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import pool, { connectWithRetry } from "./db";
import cookieParser from "cookie-parser";
import supplierRoutes from "./routes/supplierRoutes";
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
app.use("/api/categories", categoryRoutes);
app.use("/api/suppliers", supplierRoutes); 



const startServer = async () => {
  try {
    await connectWithRetry(); 
    console.log("Starting server...");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server due to database connection error:");
    process.exit(1); 
  }
};

startServer();