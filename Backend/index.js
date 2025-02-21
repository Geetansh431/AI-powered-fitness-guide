import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./Routes/auth.routes.js";
import tutorialRoutes from "./Routes/tutorial.routes.js";
import challengeRoutes from "./Routes/challenge.routes.js";
import {connectDB} from "./Lib/db.js"

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.Frontendurl,
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/tutorial", tutorialRoutes);
app.use("/api/challenges",challengeRoutes);

app.listen(PORT, () => {
  console.log("App Started on port: " + PORT);
  connectDB();
});
