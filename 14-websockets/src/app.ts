import { WebSocket, WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 3000 });

wss.on('connection', function connection(ws) {

    console.log("client connected");

    ws.on('error', console.error);

    ws.on('message', function message(data) {
        console.log("Desde el cliente", data.toString());

        const payload = {
            type: "custom-message",
            payload: {
                message: data.toString()
            }
        }
        //ws.send(JSON.stringify(payload));
        //incluye a todos
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(payload), { binary: false });
            }
        });

        //excluye al emisor del mensaje

        /*wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(payload), { binary: false });
            }
        });*/

    });


    ws.on("close", () => console.log("Desconectado"));
});