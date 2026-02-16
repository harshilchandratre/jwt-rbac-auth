import express from "express";
import dotenv from "dotenv";

import authRoutes from "./src/routes/auth.routes.js";

import { conn } from "./db.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());


await conn();

app.use("/api/auth", authRoutes);

app.get("/health", (req, res) => {
  res.send("looks good...");
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
