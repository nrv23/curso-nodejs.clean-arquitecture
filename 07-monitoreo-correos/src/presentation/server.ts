import { SendLogsEmailUseCase } from './../domain/uses-cases/email/send-logs-email.service';
import { LogReopositoryImpl } from './../infraestructure/repositories/log.repository';
import { CronService } from "./cron/cron-service";
import { CheckService } from '../domain/uses-cases/checks/checek-service';
import { FileSystemDataSource } from '../infraestructure/datasources/file-system.datasource';
import { envs } from '../config/plugins/envs';
import { SendLogsEmail } from '../domain/uses-cases/email/send-logs-email.service';
import { EmailService } from './email/email.service';
import { MongoLogDataSource } from '../infraestructure/datasources/mongo-log.datasource';
import { logSeverityLevel } from '../domain/entities/Log.entity';



const logRepository = new LogReopositoryImpl(
    //new FileSystemDataSource()
    new MongoLogDataSource()
);

const emailService = new EmailService();


export class Server {

    public static async start() {

        console.log("Servidor corriendo....");

        const logs = await logRepository.getLog(logSeverityLevel.medium);
        console.log({logs});
        /* const url = "http://localhost:3001";
         CronService.createJob(
            "* * * * * *",
            () => {
                console.log("5 sencods");
                //new CheckService().execute("https://google.com");
                new CheckService(
                    logRepository,
                
                    //() => console.log(`${url} is ok `),
                    //(error) => console.log({ error }),

                ).execute(url);
            }
        );
        /* new SendLogsEmail(emailService, fileSystemLogRepository)
             .execute("navemen23@hotmail.com");*/

        /*console.log(envs);*/

    }
}
