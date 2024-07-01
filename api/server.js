import express from "express";
import dotenv from "dotenv";
import path from "path";

import connectDB from "./config/DbCOnnection.js";
import {
  errorRresponserHandler,
  invalidePathHandler,
} from "./middlewares/errorHandler.js";

import { fileURLToPath } from "url";

// Routes
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js"
import commentRoutes from "./routes/commentRoutes.js"

dotenv.config();

const app = express();


// CONNECTION TO DB
connectDB();

// middleware (Parcing data to json)
app.use(express.json());

// using routes (Endpoints)
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

// static assets
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use(invalidePathHandler);
app.use(errorRresponserHandler);

const port = process.env.PORT || 5000;

// server Listening event on port
app.listen(port, () => console.log(`Server running on port ${port} 🔥`));
