require("dotenv").config();
console.log("URI CHECK:", process.env.MONGODB_URI);
const express = require("express");
const mongoose = require("mongoose");

const restaurantRoutes = require("./routes/restaurantRoutes");

const app = express();
app.use(express.json());

app.use("/", restaurantRoutes);

const PORT = process.env.PORT || 3000;


mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log("MongoDB Connected");

    app.listen(PORT, () => {
        console.log("Server running on port", PORT);
    });
})
.catch(err => {
    console.log("MongoDB Connection Error:", err);
});
