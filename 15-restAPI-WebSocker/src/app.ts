import { createServer } from 'http';
import { envs } from './config/envs';
import { AppRoutes } from './presentation/routes';
import { Server } from './presentation/server';
import { WssService } from './presentation/services/wss.service';


(async () => {
  main();
})();


function main() {

  const server = new Server({
    port: envs.PORT,
  });

  const httpServer = createServer(server.app)
  WssService.initiWsServer({ server: httpServer, path: "/ws" });

  server.setRoutes(AppRoutes.routes);

  httpServer.listen(envs.PORT, () => {
    console.log(`Servidor escuchando peticiones en puerto ${envs.PORT}`);
  })
}