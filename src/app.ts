import * as SocketClient from "socket.io-client";
import { hostname } from "os";

let synced = false;
const socket = SocketClient.connect("ws://localhost:5000");
socket.on("connect", connect);
socket.on("disconnect", disconnect);


function disconnect() {
  console.log("DISCONNECTED");
}

function connect() {
  console.log("[" + socket.id + "] CONNECTED");
  if(!synced) {
    startSync();
    synced = true;
  }
}

function updateStatus(status: string) {
  socket.emit("update_status", status);
}

function initSync(data) {
  socket.emit("init_sync", data);
}

function updateSync(data) {
  socket.emit("update_sync", data);
}

function register(type) {
  socket.emit("register", type);
}

function startSync() {
  const shopId = Math.round(Math.random() * (5000 - 1) + 1);
  register("WORKER");
  updateStatus("IDLE");
  setTimeout(() => {
    updateStatus("WORKING");
    initSync({ shopId, files: 3000 });
    setTimeout(() => {
      updateSync({ shopId, processedFiles: 600, totalFiles: 3000 });
      setTimeout(() => {
        updateSync({ shopId, processedFiles: 1200, totalFiles: 3000 });
        setTimeout(() => {
          updateSync({ shopId, processedFiles: 1800, totalFiles: 3000 });
          setTimeout(() => {
            updateSync({ shopId, processedFiles: 2400, totalFiles: 3000 });
            setTimeout(() => {
              updateSync({ shopId, processedFiles: 3000, totalFiles: 3000 });
              updateStatus("IDLE");
            }, 500);
          }, 500);
        }, 500);
      }, 500);
    }, 500);
  }, 3000);
}