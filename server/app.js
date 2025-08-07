const express = require("express")
const morgan = require("morgan")
const app = express()
const cors = require("cors")

// ✅ Allow only specific frontend origin (fixes CORS issue)
app.use(cors({
    origin: "http://localhost:5173", // Change this if frontend URL changes
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true // If using cookies or authentication
}));

app.options("*", cors());
 
app.use(express.json({}))
app.use(express.urlencoded({extended:false}))
app.use(morgan("dev"))
app.use(cors())

app.use("/api/v1", require("./routes"))

module.exports = app
