import express from 'express';
import { envs } from './config';
import { GithubController } from './presentation/github/controller';
import { GithubSha256Middleware } from './presentation/middlewares/gitbub-sha-256.middleware';
import { DiscordService } from './presentation/services/discord.service';
import { GtihubService } from './presentation/services/github.service';



(async () => {

    main();

})();

function main() {

    const app = express();
    app.use(express.json());

    const githubService = new GtihubService();
    const discordService = new DiscordService();
    const { webHookHandler } = new GithubController(githubService, discordService);

    app.post('/api/github', GithubSha256Middleware.verifySignature, webHookHandler);
    app.listen(envs.PORT, () => {
        console.log("Servidor corriendo en puerto " + envs.PORT);
    });
}