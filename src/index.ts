import { WebSocketServer, WebSocket } from "ws";
const wss = new WebSocketServer({
  port: 8080,
});
interface User {
  socket: WebSocket;
  room: string;
}
let allsockets: User[] = [];
wss.on("connection", (socket) => {
  socket.on("message", (message) => {
    //@ts-ignore
    const parsedMEssage = JSON.parse(message);
    if (parsedMEssage.type == "join") {
      allsockets.push({
        socket,
        room: parsedMEssage.payload.roomId,
      });
    }
    if (parsedMEssage.type == "chat") {
      let currentUserRoom = null;

      for (let i = 0; i < allsockets.length; i++) {
            //@ts-ignore
        if ((allsockets[i].socket == socket)) {
              //@ts-ignore
          currentUserRoom = allsockets[i].room;
        }
      }
      for (let i = 0; i < allsockets.length; i++) {
            //@ts-ignore
        if (allsockets[i].room == currentUserRoom) {
            //@ts-ignore
          allsockets[i].socket.send(parsedMEssage.payload.message);
        }
      }
    }
  });
});
