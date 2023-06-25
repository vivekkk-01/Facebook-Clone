const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.listen(PORT, () => {
  console.log("Server is listening...");
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("Database connected..."))
    .catch((err) => console.log("Error connecting to Database...", err));
});
