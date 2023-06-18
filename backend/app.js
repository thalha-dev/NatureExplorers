const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const credentials = require("./middlewares/cors/credentials");
const { isHttpError } = require("http-errors");
const createHttpError = require("http-errors");
const corsOptions = require("./config/corsOptions");

const app = express();

const userRoutes = require("./routes/userRoutes");
const articleRoutes = require("./routes/articleRoutes");
const adminRoutes = require("./routes/adminRoutes");

// common middlewares

app.use(morgan("dev"));
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// FOR TESTING
// app.use((req, res, next) => {
//   console.log(req.body);
//   next();
// });

// routes

app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/articles", articleRoutes);

// Endpoint Not Found

app.use((req, res, next) => {
  next(createHttpError(404, "Endpoint Not Found"));
});

app.use((error, req, res, next) => {
  console.log(error);
  let errorMessage = "An Unknown Error Occured";
  let statusCode = 500;
  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }
  res.status(statusCode).json({ error: errorMessage });
});

module.exports = app;
