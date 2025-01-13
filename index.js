const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const userRoute = require("./routes/userRoute");
const { connectDB } = require("./config/database");
require("dotenv").config(); 
const session = require("express-session");

// Middleware for request body parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Disable cache
app.use((req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});

// Set view engine
app.set("view engine", "ejs");
app.set("views", "./views");


app.use(express.static("public"));

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || "default-secret",
    resave: false,
    saveUninitialized: true,
    cookie: { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }, 
  })
);

// Store session user for view templates
app.use((req, res, next) => {
  res.locals.user = req.session.user_id || null; 
  next();
});

// Database connection
connectDB();

// Routes
app.use("/", userRoute);


app.use((req, res) => {
  res.status(404).render("./user/404", { message: "Page not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Internal Server Error:", err.stack);
  res.status(500).render("./user/500", { message: "Internal Server Error" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running successfully on http://localhost:${PORT}`);
});
