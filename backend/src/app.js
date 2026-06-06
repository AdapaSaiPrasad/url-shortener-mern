const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const urlRoutes = require("./routes/url.routes");

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

module.exports = app;