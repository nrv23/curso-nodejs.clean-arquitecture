import axios from "axios";
import { envs } from "../../config";


export class DiscordService {

    private readonly discordWebHookUrl = envs.DISCORD_WEBHOOK_URL;

    constructor() {

    }

    async notify(message: string) {

        const body = {
            content: message
        }

        const response = await axios.post(this.discordWebHookUrl, body);

        if (!(response.status === 204)) {

            console.log("Error sending message to discord");

            return false;
        }

        return true;
    }
}