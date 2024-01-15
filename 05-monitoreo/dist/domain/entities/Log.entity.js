"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogEntity = exports.logSeverityLevel = void 0;
var logSeverityLevel;
(function (logSeverityLevel) {
    logSeverityLevel["low"] = "low";
    logSeverityLevel["medium"] = "medium";
    logSeverityLevel["high"] = "high";
    logSeverityLevel["critical"] = "critical";
})(logSeverityLevel || (exports.logSeverityLevel = logSeverityLevel = {}));
;
class LogEntity {
    constructor(level, message) {
        this.level = level;
        this.message = message;
        this.createdAt = new Date();
    }
}
exports.LogEntity = LogEntity;
LogEntity.fromJson = (json) => {
    const { message, leve, createdAt } = JSON.parse(json);
    const log = new LogEntity(leve, message);
    //asignar la fecha de creacion 
    log.createdAt = new Date(createdAt);
    return log;
};
