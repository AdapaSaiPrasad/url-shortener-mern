import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import urlRoutes from "./routes/url.routes.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("URL Shortener API running");
});

// API routes
app.use("/api/url", urlRoutes);

// Redirect routes
app.use("/", urlRoutes);

export default app;