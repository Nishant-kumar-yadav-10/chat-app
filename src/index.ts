import {WebSocketServer,WebSocket} from "ws"
const wss=new WebSocketServer({
    port:8080
});
let userCount=0
let allsockets:WebSocket[]=[]
wss.on("connection",(socket)=>{
    allsockets.push(socket)
console.log("user connected")
userCount=userCount+1
console.log(userCount)
 socket.on("message",(message)=>{
        console.log("message recieved " + message.toString())
        for(let i=0;i<allsockets.length;i++) {
            const s=allsockets[i]!;
            s.send(message.toString())}
    })
})