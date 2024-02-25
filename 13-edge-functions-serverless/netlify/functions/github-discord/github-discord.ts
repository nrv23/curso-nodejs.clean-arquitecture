import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import axios from 'axios';


const notify = async (message: string) => {


    if (!process.env.DISCORD_WEBHOOK_URL) throw "DISCORD_WEBHOOK_URL is required";

    const body = {
        content: message
    }

    const response = await axios.post(process.env.DISCORD_WEBHOOK_URL, body);

    if (!(response.status === 204)) {

        console.log("Error sending message to discord");

        return false;
    }

    return true;
}

const onStart = (payload: any): string => {

    let message: string = "";

    const { starred_at, action, sender, repository } = payload;

    if (starred_at) {
        message = `User ${sender.login} ${action} star on ${repository.full_name}`;
    } else {
        message = `User ${sender.login} ${action} star on ${repository.full_name}`;
    }

    return message;
}

const onIssue = (payload: any): string => {

    let message: string = "";

    const { action, issue, sender } = payload;


    if (action === "opened") {
        message = `An issue was ${action} with this title ${issue.title} by ${sender.login}`;
    } else if (action === "closed") {
        message = `An issue was ${action}  by ${sender.login}`;
    } else if (action === "reopened") {
        message = `An issue was ${action} with this title ${issue.title} by ${sender.login}`;
    } else {
        message = `unknown action ${action}`;
    }
    return message;

}

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {



    const { body } = event;
    const githubEvent = event.headers["x-github-event"] ?? 'unknown';
    const payload = JSON.parse(body || '{}');
    let message: string = "";

    switch (githubEvent) {

        case "star":
            message = onStart(payload);
            break;
        case "issues":
            message = onIssue(payload);
            break;
        default:
            message = `unknown event ${githubEvent}`;
    }

    await notify(message);

    return {
        statusCode: 200,
        body: JSON.stringify({
            message
        }),
        headers: {
            "Content-Type": "application/json"
        }
    }
};

export { handler };