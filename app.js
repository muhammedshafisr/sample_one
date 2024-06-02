const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const expressLayouts = require("express-ejs-layouts");

const app = express();

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "layouts/layout");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/", async (req, res) => {
  try {
    res.render("index");
  } catch (error) {
    console.error("Error rendering index page:", error);
    res.status(500).send("Internal Server Error");
  }
});

// 404 handler
app.use((req, res, next) => {
  console.log("Not found !!");
  res.status(404).send("Not found");
});

// Error handler
app.use((err, req, res, next) => {
  console.error("Unexpected error:", err);
  res.status(500).send("Internal Server Error");
});

// Start the server
const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
