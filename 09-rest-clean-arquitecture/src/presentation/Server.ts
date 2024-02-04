import express from 'express';
import path from 'path/posix';
import compression from 'compression';

import { Router } from 'express';

interface Props {
    port: number;
    publicPath?: string;
    routes: Router;
}

export class Server {

    public readonly app = express();
    private ServerListener?: any;
    private readonly port: number;
    private readonly publicPath: string;
    private readonly routes: Router;

    constructor(ops: Props) {
        this.port = ops.port;
        this.publicPath = ops.publicPath || 'public';
        this.routes = ops.routes;
    }

    async start() {

        //* middlewares 
        this.app.use(express.json());
        this.app.use( // habilitar x-wwww-form-urlencoded
            express.urlencoded({
                extended: true
            })
        );
        this.app.use(compression()); // comprimir respuestas http
        //* public folders
        this.app.use(express.static(this.publicPath));
        this.app.use("/api",this.routes);
        this.app.get("*",(req,res) => { //"*" - cualquier otra ruta que no existe en el servidor

            const indexPath = path.join(__dirname, `../../${this.publicPath}/index.html`);
            // al no encontrar la ruta, retonra el archivo html y react toma el control de las rutas de la aplicacion frontend
            // servida desde el servidor express
            res.sendFile(indexPath);
            return;
        });  

        this.ServerListener = this.app.listen(this.port, () => {
            console.log("Servidor corriendo en servidor "+this.port);
            
        })
    }


    public close() {
        this.ServerListener?.close();
    }
}