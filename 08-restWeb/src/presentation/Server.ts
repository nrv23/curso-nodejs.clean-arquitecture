import express from 'express';
import path from 'path/posix';

interface Props {
    port: number;
    publicPath?: string;
}

export class Server {

    private app = express();

    private readonly port: number;
    private readonly publicPath: string;

    constructor(ops: Props) {
        this.port = ops.port;
        this.publicPath = ops.publicPath || 'public';
    }

    async start() {

        //* middlewares 

        //* public folders
        this.app.use(express.static(this.publicPath));

        this.app.get("*",(req,res) => { //"*" - cualquier otra ruta que no existe en el servidor

            const indexPath = path.join(__dirname, `../../${this.publicPath}/index.html`);
            // al no encontrar la ruta, retonra el archivo html y react toma el control de las rutas de la aplicacion frontend
            // servida desde el servidor express
            res.sendFile(indexPath);
            return;
        });  

        this.app.listen(this.port, () => {
            console.log("Servidor corriendo en servidor 3000");
            
        })
    }
}