export enum logSeverityLevel {
  low = "low",
  medium = "medium",
  high = "high",
  critical = "critical",
}

export interface LogEntityOptions {
  level: logSeverityLevel;
  message: string;
  origin: string;
  createdAt?: Date;
}

export class LogEntity {
  public level: logSeverityLevel; //nivel de severidad del log
  public message: string;
  public createdAt: Date;
  public origin: string;

  constructor(options: LogEntityOptions) {
    const { level, message, origin, createdAt = new Date() } = options;
    this.level = level;
    this.message = message;
    this.createdAt = createdAt;
    this.origin = origin;
  }

  static fromJson = (json: string): LogEntity => {

    json = json === ''? '{}' : json; 

    const { message, level, createdAt, origin } = JSON.parse(json);
    const log = new LogEntity({
      level,
      message,
      createdAt,
      origin,
    });
    //asignar la fecha de creacion

    log.createdAt = new Date(createdAt);

    return log;
  };

  static fromObject(object: { [key: string]: any }): LogEntity {

    const { level, message, createdAt, origin } = object;
    const log = new LogEntity({
        level, message, createdAt, origin
    });

    return log;
  }
}
