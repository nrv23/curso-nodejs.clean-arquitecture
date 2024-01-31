import { LogEntity, logSeverityLevel } from '../entities/Log.entity';


export abstract class LogRepository {

    abstract saveLog(log: LogEntity): Promise<void>;
    abstract getLog(severityLevel: logSeverityLevel): Promise<LogEntity[]>;
}