import io,{Socket} from "socket.io-client";

export class SocketApi{
    static socket: null | Socket = null
    static createConnection(){
        this.socket = io("http://localhost:8080/")
        this.socket.on('connect',()=>{
            console.log("connected")
        })
        this.socket.on('disconnect',()=>{
            console.log("disconnect")
        })
    }
}