const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const blogRoutes = require("./routes/blog");
const userRoutes = require("./routes/user");
const authorRoutes = require("./routes/author");
const adminRoutes = require("./routes/admin");
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/users", userRoutes);
app.use("/api/author", authorRoutes);
app.use("/api/admin", adminRoutes);
const PORT = process.env.PORT || 5000;

connectDB().then((dbObj) => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
