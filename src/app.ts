import * as SocketClient from "socket.io-client";
import * as dotenv from "dotenv";
dotenv.config();

const serverUrl = process.env.SERVER_URL || "ws://localhost:5000";

const socket = SocketClient.connect(serverUrl);
socket.on("connect", connect);
socket.on("disconnect", disconnect);

socket.on('connect_timeout', (timeout) => {
  console.log("Connect timeout " + JSON.stringify(timeout));
});

socket.on('connect_error', (timeout) => {
  console.log("Connect error " + JSON.stringify(timeout));
});

socket.on('error', (timeout) => {
  console.log("Error: " + JSON.stringify(timeout));
});

socket.on('reconnect', (timeout) => {
  console.log("reconnect");
});

socket.on('reconnect_attempt', (timeout) => {
  console.log("reconnect_attempt");
});

socket.on('reconnecting', (timeout) => {
  console.log("reconnecting");
});

socket.on('reconnect_error', (err) => {
  console.log("reconnect_error: " + JSON.stringify(err));
});

socket.on('reconnect_failed', () => {
  console.log("reconnect_failed");
});

function disconnect() {
  console.log("DISCONNECTED");
}

function connect() {
  console.log("[" + socket.id + "] CONNECTED");
}