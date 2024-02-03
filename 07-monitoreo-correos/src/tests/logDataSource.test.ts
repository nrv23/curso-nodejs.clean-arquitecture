import { LogDataSource } from "../domain/datasources/log.datasource"
import { LogEntity, logSeverityLevel } from "../domain/entities/Log.entity";

describe('Logdatasource.ts', () => {

    const newLog = new LogEntity({
        origin: "test",
        message: "message",
        level: logSeverityLevel.low
    });

    class MockLogDataSource implements LogDataSource {
        async saveLog(log: LogEntity): Promise<void> {
            return;
        }
        async getLog(severityLevel: logSeverityLevel): Promise<LogEntity[]> {
            return [newLog];
        }

    }
    

    test('debe probar la clase abstracta', async () => {
        
        const mockLogDataSource = new MockLogDataSource();

        expect(mockLogDataSource).toBeInstanceOf(MockLogDataSource);
        expect(mockLogDataSource).toHaveProperty("saveLog")

        await mockLogDataSource.saveLog(newLog);
        const logs = await mockLogDataSource.getLog(logSeverityLevel.low);

        expect(logs).toHaveLength(1);
        expect(logs[0]).toBeInstanceOf(LogEntity);
    })
    

});
