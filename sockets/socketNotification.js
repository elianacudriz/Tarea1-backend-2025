import { Server } from "socket.io";
import Products from "../routers/products/products-entity.js";

export class SocketHandler{
    iosocket;
        /**
     *
     * 1 evento que emite el frontend cuando un cliente se conecta
     * 1 evento que emite el backend donde se envia notifiacion de prueba cada 10 segundos al front
     */
    constructor(serverHttp){
        this.iosocket = new Server(serverHttp);
        this.initEvents();
    }

    initEvents(){
        this.iosocket.on("connection", (socket)=>{
            console.log("Cliente conectado");

            setInterval(() => {
                console.log("Enviando notificación...");
                socket.emit('notificacion', {
                    mensaje: "Nueva actualización disponible!",
                    timestamp: new Date()
                });
            }, 10000);

            socket.on("disconnect", () => {
                console.log("Cliente disconnected");
            });
        });
    }
}