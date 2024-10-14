const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(bodyParser.json());

// Routes
app.use("/api/auth", require("./controllers/authController"));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
