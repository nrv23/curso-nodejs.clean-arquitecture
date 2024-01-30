import { envs } from './config/envs';
import { Server } from './presentation/Server';



(async () => {

    main();

})();

async function main() {
    new Server({
        port: envs.PORT,
        publicPath: envs.PUBLIC_PATH
    }).start();
}