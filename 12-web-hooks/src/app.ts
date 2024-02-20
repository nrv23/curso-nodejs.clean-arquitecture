import express from 'express';
import { envs } from './config';
import { GithubController } from './presentation/github/controller';



(async () => {

    main();

})();

function main() {

    const app = express();
    const { webHookHandler } = new GithubController();

    app.post('/api/github', webHookHandler);
    app.listen(envs.PORT, () => {
        console.log("Servidor corriendo en puerto " + envs.PORT);
    });
}