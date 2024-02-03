import { LogEntity, logSeverityLevel } from "../domain/entities/Log.entity";

describe('LogEntity', () => {

    test('Debe crear una instancia de log entity', () => {

        const log = new LogEntity({
            message: "",
            origin: "",
            level: logSeverityLevel.low
        });


        expect(log).toBeInstanceOf(LogEntity);
        expect(log).toStrictEqual(expect.objectContaining({
            message: "",
            origin: "",
            level: logSeverityLevel.low
        }));

        expect(log.createdAt).toBeInstanceOf(Date);
    })

    test('crear una instancia de logentity desde from json', () => {

        const json = `{"level":"low","message":"http://localhost:3000 is ok","createdAt":"2024-01-29T00:12:38.003Z","origin":"check-server.ts"}`;
        const log = LogEntity.fromJson(json);

        expect(log).toBeInstanceOf(LogEntity);
        expect(log.createdAt).toBeInstanceOf(Date);
        expect(log.message).toEqual("http://localhost:3000 is ok");
        expect(log.origin).toEqual("check-server.ts");
        expect(log.level).toEqual(logSeverityLevel.low);
    })
    
    
})
