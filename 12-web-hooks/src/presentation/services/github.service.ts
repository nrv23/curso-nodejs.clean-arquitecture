import { GitHubStarPayload, GitHubIssuePayload } from "../../interfaces";

export class GtihubService {

    constructor() {

    }


    onStart(payload: GitHubStarPayload) {

        let message: string = "";

        const { starred_at, action, sender, repository } = payload;

        if (starred_at) {
            message = `User ${sender.login} ${action} star on ${repository.full_name}`;
        } else {
            message = `User ${sender.login} ${action} star on ${repository.full_name}`;
        }

        return message;
    }

    onIssue(payload: GitHubIssuePayload) {

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
}