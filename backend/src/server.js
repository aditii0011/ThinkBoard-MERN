import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url"; // Added for better path handling in ES modules

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. MIDDLEWARE
app.use(express.json()); 
app.use(rateLimiter);

// 2. CORS (Only for development)
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}

// 3. API ROUTES
app.use("/api/notes", notesRoutes);

// 4. SERVE FRONTEND (Production)
// This goes AFTER api routes so it doesn't override them
if (process.env.NODE_ENV === "production") {
  // Path from backend/src to frontend/dist
  const frontendPath = path.resolve(__dirname, "../../frontend/dist");
  
  app.use(express.static(frontendPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

// 5. GLOBAL ERROR HANDLER (Prevents "Internal Server Error" white screen)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke on the server!");
});

// 6. CONNECT & START
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`SERVER STARTED ON PORT: ${PORT}`);
    console.log(`ENV: ${process.env.NODE_ENV}`);
  });
});
