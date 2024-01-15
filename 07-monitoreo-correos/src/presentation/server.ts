import { SendLogsEmailUseCase } from './../domain/uses-cases/email/send-logs-email.service';
import { LogReopositoryImpl } from './../infraestructure/repositories/log.repository';
import { CronService } from "./cron/cron-service";
import { CheckService } from '../domain/uses-cases/checks/checek-service';
import { FileSystemDataSource } from '../infraestructure/datasources/file-system.datasource';
import { envs } from '../config/plugins/envs';
import { SendLogsEmail } from '../domain/uses-cases/email/send-logs-email.service';
import { EmailService } from './email/email.service';



const fileSystemLogRepository = new LogReopositoryImpl(
    new FileSystemDataSource()
);

const emailService = new EmailService();


export class Server {

    public static start() {

        console.log("Servidor corriendo....");

        /* CronService.createJob(
            "* * * * * *",
            () => {
                console.log("5 sencods");
                //new CheckService().execute("https://google.com");
                new CheckService(
                    fileSystemLogRepository,
                    //() => console.log(`${url} is ok `),
                    //(error) => console.log({ error }),

                ).execute(url);
            }
        );*/
        new SendLogsEmail(emailService, fileSystemLogRepository)
            .execute("navemen23@hotmail.com");

        console.log(envs);

    }
}
