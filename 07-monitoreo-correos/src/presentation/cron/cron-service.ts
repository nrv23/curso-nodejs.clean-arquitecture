import { CronJob } from 'cron';

type CrontTime = string | Date; // crear un nuevo tipo de dato
type OnTick = () => void;

export class CronService {

    constructor() {

    }


    static createJob(cronTime: CrontTime, onTick: OnTick) {

        const job = new CronJob(cronTime, onTick);
        job.start();

        return job;
    }
}