"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileSystemDataSource = void 0;
const fs_1 = __importDefault(require("fs"));
const Log_entity_1 = require("../../domain/entities/Log.entity");
class FileSystemDataSource {
    constructor() {
        this.logPath = "logs/";
        this.allLogsPath = "logs/all-logs.log";
        this.lowLogsPath = "logs/low-logs.log";
        this.mediumLogsPath = "logs/medium-logs.log";
        this.highLogsPath = "logs/high-logs.log";
        this.criticalLogsPath = "logs/critical-logs.log";
        this.createLogFiles();
    }
    createLogFiles() {
        if (!fs_1.default.existsSync(this.logPath)) { // si el path de logs ya existe
            fs_1.default.mkdirSync(this.logPath); // sino existe el directorio lo crea
        }
        // crear los archivos de los logs
        [
            this.lowLogsPath,
            this.mediumLogsPath,
            this.mediumLogsPath,
            this.criticalLogsPath
        ].forEach(path => {
            if (!fs_1.default.existsSync(path)) {
                fs_1.default.writeFileSync(path, '');
            }
        });
    }
    getLogsFromFile(path) {
        const content = fs_1.default.readFileSync(path, 'utf-8');
        let logs = content.split("\n");
        let logList = [];
        if (logs.length) {
            logList = logs.map(Log_entity_1.LogEntity.fromJson);
            return logList;
        }
        return logList;
    }
    saveLog(log) {
        return __awaiter(this, void 0, void 0, function* () {
            const logAsJson = `${JSON.stringify(log)}\n`;
            fs_1.default.appendFileSync(this.allLogsPath, logAsJson); // lo guarda en los archivos de todos los logs 
            // guardar por nivel
            if (log.level === Log_entity_1.logSeverityLevel.low)
                fs_1.default.appendFileSync(this.lowLogsPath, logAsJson);
            else if (log.level === Log_entity_1.logSeverityLevel.medium)
                fs_1.default.appendFileSync(this.mediumLogsPath, logAsJson);
            else if (log.level === Log_entity_1.logSeverityLevel.high)
                fs_1.default.appendFileSync(this.highLogsPath, logAsJson);
            else
                fs_1.default.appendFileSync(this.criticalLogsPath, logAsJson);
        });
    }
    getLog(severityLevel) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (severityLevel) {
                case Log_entity_1.logSeverityLevel.low:
                    return this.getLogsFromFile(this.lowLogsPath);
                case Log_entity_1.logSeverityLevel.medium:
                    return this.getLogsFromFile(this.mediumLogsPath);
                case Log_entity_1.logSeverityLevel.high:
                    return this.getLogsFromFile(this.highLogsPath);
                case Log_entity_1.logSeverityLevel.critical:
                    return this.getLogsFromFile(this.criticalLogsPath);
                default:
                    throw new Error(`${severityLevel} not implemented`);
            }
        });
    }
}
exports.FileSystemDataSource = FileSystemDataSource;
