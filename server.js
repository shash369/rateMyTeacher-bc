import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/db.js";
import teacherRoutes from "./routes/teacherRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json()); // to parse JSON bodies

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Teacher Routes
app.use("/api/teachers", teacherRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
