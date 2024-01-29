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
import { PostgresLogDataSource } from '../infraestructure/datasources/postgres-log.datasource';
import { CheckServiceMultiple } from '../domain/uses-cases/checks/checek-service-multiple';



const fsLogRepository = new LogReopositoryImpl(
    new FileSystemDataSource()
);

const mongoLogRepository = new LogReopositoryImpl(
    new MongoLogDataSource()
);

const postgresLogRepository = new LogReopositoryImpl(
    new PostgresLogDataSource()
)



const emailService = new EmailService();


export class Server {

    public static async start() {

        console.log("Servidor corriendo....");

         
        const url = "http://localhost:3000";
         CronService.createJob(
            "* * * * * *",
            () => {
                console.log("5 sencods");
                //new CheckService().execute("https://google.com");
                new CheckServiceMultiple(
                    [
                        fsLogRepository,
                        mongoLogRepository,
                        postgresLogRepository
                    ],
                
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
