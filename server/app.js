const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");

// ✅ Allow only specific frontend origin (fixes CORS issue)
const corsOptions = {
    origin: "https://jobzone-46n2snair-debayan-pals-projects.vercel.app/", // ✅ your frontend Vercel domain
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true // if you're using cookies/auth
};

app.use(cors(corsOptions));

// ✅ Handle preflight requests properly
app.options("*", cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

// ❌ Don't re-add default CORS middleware again
// app.use(cors()); // ← REMOVE this line

app.use("/api/v1", require("./routes"));

module.exports = app;
