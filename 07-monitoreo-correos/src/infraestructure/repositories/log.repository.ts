import { LogEntity, logSeverityLevel } from "../../domain/entities/Log.entity";
import { LogRepository } from "../../domain/repository/log.repository";
import { LogDataSource } from '../../domain/datasources/log.datasource';


export class LogReopositoryImpl implements LogRepository {

    constructor(
        private logDataSource: LogDataSource
    ) { }

    async saveLog(log: LogEntity): Promise<void> {
        this.logDataSource.saveLog(log);
    }
    async getLog(severityLevel: logSeverityLevel): Promise<LogEntity[]> {
        return this.logDataSource.getLog(severityLevel);
    }

}