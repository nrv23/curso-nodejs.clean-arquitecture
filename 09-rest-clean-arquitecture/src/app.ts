import { envs } from './config/envs';
import { Server } from './presentation/Server';
import { AppRoutes } from './presentation/routes';



(async () => {

    main();

})();

async function main() {
    new Server({
        port: envs.PORT,
        publicPath: envs.PUBLIC_PATH,
        routes: AppRoutes.routes
    }).start();
}