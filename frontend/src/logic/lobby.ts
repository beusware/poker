import socketio, { io } from "socket.io-client";

const socket = io();

socket.on("appendMessage", (messageObject) => {
    console.log(messageObject);
})
