import { Request, Response } from 'express';


export class GithubController {

    constructor() {

    }

    webHookHandler = (req: Request, res: Response) => {
        console.log("ENdpoint llamado");
        res.json('DOne')
    }

}