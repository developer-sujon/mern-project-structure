//external Lib  imports
const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const path = require("path");
const app = new express();

dotenv.config();

//internal imports
const connectDB = require("./src/config/connectdb");

//security lib imports
const cors = require("cors");
const hpp = require("hpp");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const expressMongoSanitize = require("express-mongo-sanitize");
const xssClean = require("xss-clean");

//security middleware emplement
app.use(cors());
app.use(hpp());
app.use(helmet());
app.use(expressMongoSanitize());
app.use(xssClean());

//default middleware emplement
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Apply the rate limiting middleware to all requests

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(limiter);

const MONGODB_CONNECTION_URL = process.env.MONGODB_CONNECTION_URL;
const DB_OPTIONS = {
  user: process.env.MONGODB_DATABASE_USERNAME,
  pass: process.env.MONGODB_DATABASE_PASSWORD,
  dbName: "curd",
  autoIndex: true,
};
//connection database
connectDB(MONGODB_CONNECTION_URL, DB_OPTIONS);
app.use(express.static("client/build"));

// Routing Implement
app.use("/api/v1", () => {});

// Add React Front End Routing
app.get("*", function (req, res) {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

module.exports = app;
