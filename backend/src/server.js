import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import app from "./app.js";

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

console.log("URI:", process.env.MONGO_URI);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    console.log("Connected DB:", mongoose.connection.name);

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });