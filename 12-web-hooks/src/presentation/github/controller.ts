import { Request, Response } from 'express';
import { DiscordService } from '../services/discord.service';
import { GtihubService } from '../services/github.service';


export class GithubController {

    constructor(
        private readonly githubService: GtihubService,
        private readonly discordService: DiscordService
    ) {

    }

    webHookHandler = (req: Request, res: Response) => {

        const { body: payload } = req;
        const githubEvent = req.header("x-github-event") ?? 'unknown';
        const signature = req.header("x-hub-signature-256") ?? 'unknown';
        let message: string = "";
        //console.log({ githubEvent, signature })
        //console.log(JSON.stringify(payload));

        switch (githubEvent) {

            case "star":
                message = this.githubService.onStart(payload);
                break;
            case "issues":
                message = this.githubService.onIssue(payload);
                break;
            default:
                message = `unknown event ${githubEvent}`;
        }
        console.log({ message })
        this.discordService.notify(message)
            .then(() => res.status(202).send("Acepted"))
            .catch(err => {
                console.log(err.response);
                res.status(500).json({ err })
            });
    }

}