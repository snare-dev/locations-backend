const express = require("express");
const mongoose = require("mongoose");

const dotenv = require("dotenv");
const cookieSession = require("cookie-session");
const passport = require("passport");

dotenv.config();

const locationsRoutes = require("./routes/locationRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");

const bodyParser = require("body-parser");

const mongoDb = process.env.MONGO_URL;

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(bodyParser.json());

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY],
  })
);

app.use(passport.initialize());

app.use(passport.session()); 

app.use("/api/v1/locations", locationsRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/auth", authRoutes);

app.use((req, res, next) => {
  const error = new Error("Could not find this route");
  error.statusCode = 404;
  next(error);
});

// app.use((err, req, res, next) => {
//   if (res.headerSent) {
//     return next(err);
//   }
//   console.log(err.message);
//   res
//     .status(500)
//     .json({ message: err.message || "An unexpected error occurred!" });
// });


mongoose.connect(mongoDb);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log("Server is running on port 8000");
});
