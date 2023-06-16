const allowedOrigins = [
  process.env.CLIENT_URI,
  "http://localhost:5173",
  "http://localhost:3000",
];

module.exports = allowedOrigins;
