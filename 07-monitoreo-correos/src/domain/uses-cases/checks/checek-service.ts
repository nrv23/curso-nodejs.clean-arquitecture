import axios from 'axios';
import { LogEntity, logSeverityLevel } from '../../entities/Log.entity';
import { LogRepository } from '../../repository/log.repository';

interface CheckServiceUseCase {
    execute(url: string): Promise<boolean>;
}


type SuccessCallback = () => void;
type FailedCallback = (error: string) => void;


export class CheckService implements CheckServiceUseCase {

    constructor(
        // inyeccion de dependencias
        private readonly logRepository: LogRepository,
        private readonly successCallback?: SuccessCallback,
        private readonly failedCallback?: FailedCallback

    ) {

    }

    public async execute(url: string): Promise<boolean> {

        try {
            const req = await axios(url);

            if (!(req.status === 200)) { // la propiedad ok implica si fue exitosa o no la peticion

                throw new Error(`Error on check service ${url}`);
            }
            const log = new LogEntity({
                level: logSeverityLevel.low,
                message: `${url} is ok`,
                origin: "check-server.ts"
            });
            this.successCallback && this.successCallback();
            this.logRepository.saveLog(log);
            return true;

        } catch (error) {

            const errorMessage = `${error}`;
            const logError = new LogEntity({
                level: logSeverityLevel.critical,
                message: `${url} failed`,
                origin: "check-server.ts"
            });
            this.failedCallback && this.failedCallback(errorMessage);
            this.logRepository.saveLog(logError);

            return false;
        }
    }
}