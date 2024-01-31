import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, logSeverityLevel } from "../../domain/entities/Log.entity";
import { PrismaClient, SeverityLevel } from '@prisma/client';

const prisma = new PrismaClient();

const severityEnum = {
    low: SeverityLevel.LOW,
    high: SeverityLevel.HIGH,
    medium: SeverityLevel.MEDIUM,
    critical: SeverityLevel.CRITICAL,
}

export class PostgresLogDataSource implements LogDataSource {
    async saveLog(log: LogEntity): Promise<void> {

       const level = severityEnum[log.level];
       //log.level = severityLevel
        await prisma.logModel.create({
            data: {
                level,
                message: log.message,
                origin: log.origin,                
            }
        });

        console.log("Postgresql log saved")
    }
    async getLog(severityLevel: logSeverityLevel): Promise<LogEntity[]> {

        const level = severityEnum[severityLevel];
        const logs =  await prisma.logModel.findMany({
            where :{
                level
            }
        })

        return logs.map(LogEntity.fromObject);
    }

}