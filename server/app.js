const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");

const allowedOrigins = [
  "http://localhost:3000", // local dev
  "https://jobzone-delta.vercel.app", // stable domain
  /\.vercel\.app$/ // ✅ allow all Vercel preview deployments
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.some(o =>
        (typeof o === "string" && o === origin) ||
        (o instanceof RegExp && o.test(origin))
      )) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS: " + origin));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

app.use("/api/v1", require("./routes"));

module.exports = app;
