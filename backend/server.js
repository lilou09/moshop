import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
// import products from "./data/products.js";
import productRoutes from "./routes/productRoutes.js";

const app = express();

dotenv.config();

connectDb();

app.get("/", (req, res) => {
  res.send("API is running.");
});

app.use("/api/product", productRoutes);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
