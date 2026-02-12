const socket = io();

let currentRoom = null;
let typingTimeout = null;
if (!localStorage.getItem("user")) {
    window.location.href = "login.html";
}

/* Join Room */
function joinRoom() {

    const username = localStorage.getItem("user");
    currentRoom = document.getElementById("room").value;

    document.getElementById("messages").innerHTML = "";
    document.getElementById("typing").innerHTML = "";

    socket.emit("joinRoom", {
        username,
        room: currentRoom
    });
}

/* Send Message */
function sendMsg() {

    if (!currentRoom) {
        alert("Join a room first!");
        return;
    }

    const message = document.getElementById("msg").value;
    const username = localStorage.getItem("user");

    socket.emit("chatMessage", {
        username,
        room: currentRoom,
        message
    });

    document.getElementById("msg").value = "";
}

/* Receive Messages */
socket.on("message", (data) => {

    const messagesDiv = document.getElementById("messages");
    messagesDiv.innerHTML += `<p>${data}</p>`;

    document.getElementById("typing").innerHTML = "";
});

/* Typing Emit (Debounced) */
document.getElementById("msg").addEventListener("input", () => {

    if (!currentRoom) return;

    socket.emit("typing", {
        room: currentRoom,
        username: localStorage.getItem("user")
    });

});

/* Typing Receive */
socket.on("typing", (data) => {

    const typingDiv = document.getElementById("typing");

    typingDiv.innerHTML = `${data.username} is typing...`;

    clearTimeout(typingTimeout);

    typingTimeout = setTimeout(() => {
        typingDiv.innerHTML = "";
    }, 1500);

});
function logout() {

    // Clear stored user session
    localStorage.removeItem("user");

    // Disconnect socket
    socket.disconnect();

    // Redirect to login page
    window.location.href = "login.html";
}
