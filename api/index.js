const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const placeRoutes = require("./routes/placeRoutes");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 8000;

connectDB();

app.use(
    cors({
        credentials: true,
        origin: "http://localhost:5173",
    })
);

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));

app.use("/api/user", userRoutes);
app.use("/api/place", placeRoutes);

app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
});
