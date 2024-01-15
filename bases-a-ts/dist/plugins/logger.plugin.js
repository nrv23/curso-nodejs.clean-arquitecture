"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildLogger = void 0;
const winston_1 = __importDefault(require("winston"));
const { combine, timestamp, json } = winston_1.default.format;
const logger = winston_1.default.createLogger({
    level: 'info',
    format: combine(timestamp(), json()),
    // defaultMeta: { service: 'user-service' },
    transports: [
        //
        // - Write all logs with importance level of `error` or less to `error.log`
        // - Write all logs with importance level of `info` or less to `combined.log`
        //
        new winston_1.default.transports.File({ filename: 'error.log', level: 'error' }),
        new winston_1.default.transports.File({ filename: 'combined.log' }),
    ],
});
// pintar los logs en consola
logger.add(new winston_1.default.transports.Console({
    format: winston_1.default.format.simple(),
}));
const buildLogger = (service) => {
    return {
        info: (message) => logger.log("info", { message, service }),
        error: (message) => logger.error("error", { message, service })
    };
};
exports.buildLogger = buildLogger;
