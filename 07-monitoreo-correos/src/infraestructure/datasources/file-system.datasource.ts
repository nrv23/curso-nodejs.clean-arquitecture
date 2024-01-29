import fs from 'fs';

import { LogDataSource } from '../../domain/datasources/log.datasource';
import { LogEntity, logSeverityLevel } from '../../domain/entities/Log.entity';

export class FileSystemDataSource implements LogDataSource {

    private readonly logPath = "logs/";
    private readonly allLogsPath = "logs/all-logs.log";
    private readonly lowLogsPath = "logs/low-logs.log";
    private readonly mediumLogsPath = "logs/medium-logs.log";
    private readonly highLogsPath = "logs/high-logs.log";
    private readonly criticalLogsPath = "logs/critical-logs.log";

    constructor() {
        this.createLogFiles();
    }

    private createLogFiles() {

        if (!fs.existsSync(this.logPath)) { // si el path de logs ya existe
            fs.mkdirSync(this.logPath);// sino existe el directorio lo crea
        }

        // crear los archivos de los logs

        [
            this.lowLogsPath,
            this.mediumLogsPath,
            this.highLogsPath,
            this.criticalLogsPath,
            this.allLogsPath
        ].forEach(path => {
            if (!fs.existsSync(path)) {
                fs.writeFileSync(path, '');
            }
        })
    }

    private getLogsFromFile(path: string): LogEntity[] {

        const content = fs.readFileSync(path, 'utf-8');

        if (content === '') return [];
        
        let logs = content.split("\n");
        let logList: LogEntity[] = [];

        if (logs.length) {
            logList = logs.map(LogEntity.fromJson)
            return logList;
        }
        return logList;
    }

    async saveLog(log: LogEntity): Promise<void> {

        const logAsJson = `${JSON.stringify(log)}\n`;

        fs.appendFileSync(this.allLogsPath, logAsJson); // lo guarda en los archivos de todos los logs 

        // guardar por nivel

        if (log.level === logSeverityLevel.low) fs.appendFileSync(this.lowLogsPath, logAsJson);
        else if (log.level === logSeverityLevel.medium) fs.appendFileSync(this.mediumLogsPath, logAsJson);
        else if (log.level === logSeverityLevel.high) fs.appendFileSync(this.highLogsPath, logAsJson);
        else fs.appendFileSync(this.criticalLogsPath, logAsJson);
    }

    async getLog(severityLevel: logSeverityLevel): Promise<LogEntity[]> {

        switch (severityLevel) {
            case logSeverityLevel.low:
                return this.getLogsFromFile(this.lowLogsPath);

            case logSeverityLevel.medium:
                return this.getLogsFromFile(this.mediumLogsPath);
            case logSeverityLevel.high:
                return this.getLogsFromFile(this.highLogsPath);
            case logSeverityLevel.critical:
                return this.getLogsFromFile(this.criticalLogsPath);
            default:
                throw new Error(`${severityLevel} not implemented`)
        }
    }

}