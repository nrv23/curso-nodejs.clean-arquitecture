import { LogModel } from "../../data/mongo";
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, logSeverityLevel } from "../../domain/entities/Log.entity";



export class MongoLogDataSource implements LogDataSource {
    async saveLog(log: LogEntity): Promise<void> {
        const newLog = await LogModel.create(log);
        console.log("mongo Log created", newLog);
    }

    async getLog(severityLevel: logSeverityLevel): Promise<LogEntity[]> {
        
        const logs =  await LogModel.find({
            level: severityLevel
        });

        return logs.map(LogEntity.fromObject);
    }
    
}