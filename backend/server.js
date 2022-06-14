import express from "express";
import data from "./data.js";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

const app = express();

app.get("/api/products", (req, res) => {
  res.send(data.products);
});

app.get("/", (req, res) => {
  res.send("Server is ready");
});


const port = process.env.PORT || 7000;
app.listen(port, () => {
  console.log(`Server at http://localhost:${port}`);
});
