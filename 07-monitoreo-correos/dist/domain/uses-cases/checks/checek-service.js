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
exports.CheckService = void 0;
const axios_1 = __importDefault(require("axios"));
const Log_entity_1 = require("../../entities/Log.entity");
class CheckService {
    constructor(
    // inyeccion de dependencias
    logRepository, successCallback, failedCallback) {
        this.logRepository = logRepository;
        this.successCallback = successCallback;
        this.failedCallback = failedCallback;
    }
    execute(url) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const req = yield (0, axios_1.default)(url);
                if (!(req.status === 200)) { // la propiedad ok implica si fue exitosa o no la peticion
                    throw new Error(`Error on check service ${url}`);
                }
                const log = new Log_entity_1.LogEntity(Log_entity_1.logSeverityLevel.low, `${url} is ok`);
                this.successCallback && this.successCallback();
                this.logRepository.saveLog(log);
                return true;
            }
            catch (error) {
                const errorMessage = `${error}`;
                const logError = new Log_entity_1.LogEntity(Log_entity_1.logSeverityLevel.high, errorMessage);
                this.failedCallback && this.failedCallback(errorMessage);
                this.logRepository.saveLog(logError);
                return false;
            }
        });
    }
}
exports.CheckService = CheckService;
