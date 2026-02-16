import express from "express";
import dotenv from "dotenv";
import { conn } from "./db.js";
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

await conn();

app.get("/health", (req, res) => {
  res.send("looks good...");
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
