import { WebSocket, WebSocketServer } from "ws";
import express from "express";
import dotenv from "dotenv";
import cors from "cors"
dotenv.config();
const app = express();
app.use(cors())
const httpServer = app.listen(process.env.PORT || 8080, () => {
  console.log(`Server is running http://localhost:${process.env.PORT || 8080}`);
});

const wss = new WebSocketServer({ server: httpServer });

wss.on("connection", function connection(socket) {
  socket.on("error", console.error);
  socket.on("message", function message(data, isBinary) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });

  socket.send("Connected to websocket for message");
});
