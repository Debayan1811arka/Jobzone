const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

// ✅ CORS: allow specific frontend
app.use(cors({
  origin: "https://jobzone-drab.vercel.app", // Set your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true // Only use this if you're using cookies/auth
}));

// ✅ Handle preflight requests
app.options("*", cors());

// Body parser & logger
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

// ✅ Define your routes
app.use("/api/v1", require("./routes"));

module.exports = app;
  