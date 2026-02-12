require("dotenv").config();

const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const mongoose = require("mongoose");
const cors = require("cors");

const User = require("./models/User");
const GroupMessage = require("./models/GroupMessage");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

/* Middleware */
app.use(cors());
app.use(express.json());
app.use(express.static("views"));
app.use(express.static("public"));

/* MongoDB Connection */
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

/* SIGNUP */
app.post("/signup", async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.send("Signup successful");
    } catch (err) {
        res.status(400).send("Username already exists");
    }
});

/* LOGIN */
app.post("/login", async (req, res) => {
    const user = await User.findOne(req.body);

    if (!user) {
        return res.status(401).send("Invalid login");
    }

    res.send("Login successful");
});

/* SOCKET */
io.on("connection", (socket) => {

    console.log("New user connected");

    /* Join Room */
    socket.on("joinRoom", (data) => {

        if (!data) return;

        const username = data.username;
        const room = data.room;

        socket.leaveAll();
        socket.join(room);

        console.log(username + " joined " + room);

        io.to(room).emit("message",
            `${username} joined ${room}`);
    });

    /* Chat Message */
    socket.on("chatMessage", async (data) => {

        if (!data) return;

        console.log("Message received:", data);

        try {
            const msg = new GroupMessage({
                from_user: data.username,
                room: data.room,
                message: data.message
            });

            await msg.save();

            io.to(data.room).emit("message",
                `${data.username}: ${data.message}`);
        }
        catch (err) {
            console.log(err);
        }
    });

    /* Typing Indicator */
    socket.on("typing", (data) => {
        console.log("Typing received on server:", data);
        if (!data || !data.room) return;

        const room = data.room;
        const username = data.username;

        socket.to(room).emit("typing",
            `${data.username} is typing...`);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });

});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
