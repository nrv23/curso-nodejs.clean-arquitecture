
export enum logSeverityLevel {
    low = "low",
    medium = "medium",
    high = "high",
    critical = "critical",
};

export class LogEntity {

    public level: logSeverityLevel; //nivel de severidad del log
    public message: string;
    public createdAt: Date;
    public origin: string;

    constructor(level: logSeverityLevel, message: string, origin: string) {
        this.level = level;
        this.message = message;
        this.createdAt = new Date();
        this.origin = origin;
    }

    static fromJson = (json: string): LogEntity => {

        const { message, leve, createdAt } = JSON.parse(json);
        const log = new LogEntity(leve, message);
        //asignar la fecha de creacion 

        log.createdAt = new Date(createdAt);

        return log;
    }
}