import { WebSocketServer, WebSocket } from 'ws';
import { Server } from 'http'; 'http';

interface WsOptions {

    server: Server;
    path?: string;
}

export class WssService {

    private static _instance: WssService;
    private wss: WebSocketServer;


    private constructor(options: WsOptions) {

        const { server, path = "/ws" } = options;
        this.wss = new WebSocketServer({ server, path });
        this.start();
    }

    static initiWsServer(options: WsOptions) {

        if (!WssService._instance) WssService._instance = new WssService(options);
    }

    static get instance() {

        if (!WssService._instance) {
            throw 'WssService is not initialized';
        }

        return WssService._instance;
    }

    public start() {
        console.log("Servivor web socket activo")
        this.wss.on("connection", (ws: WebSocket) => {
            console.log("Client connected");

            // escuchar cuando se desconecta 
            this.wss.on("close", () => console.log("Client disconnected"));
        });
    }
}