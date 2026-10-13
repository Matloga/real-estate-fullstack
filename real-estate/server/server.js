const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const { errorHandler } = require("./middleware/errorHandler");

dotenv.config();

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/properties", require("./routes/properties"));
app.use("/api/inquiries", require("./routes/inquiries"));
app.use("/api/favorites", require("./routes/favorites"));

app.get("/", (req, res) => res.json({ message: "Real Estate API" }));

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
