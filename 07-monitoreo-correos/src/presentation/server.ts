import { LogReopositoryImpl } from './../infraestructure/repositories/log.repository';
import { CronService } from "./cron/cron-service";
import { CheckService } from '../domain/uses-cases/checks/checek-service';
import { FileSystemDataSource } from '../infraestructure/datasources/file-system.datasource';
import { envs } from '../config/plugins/envs';


const fileSystemLogRepository = new LogReopositoryImpl(
    new FileSystemDataSource()
);

export class Server {

    public static start() {

        console.log("Servidor corriendo....");
        const url = "http://localhost:3000/posts";
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

        console.log(envs);

    }
}
