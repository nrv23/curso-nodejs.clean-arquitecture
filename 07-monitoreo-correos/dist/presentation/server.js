"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const log_repository_1 = require("./../infraestructure/repositories/log.repository");
const cron_service_1 = require("./cron/cron-service");
const checek_service_1 = require("../domain/uses-cases/checks/checek-service");
const file_system_datasource_1 = require("../infraestructure/datasources/file-system.datasource");
const fileSystemLogRepository = new log_repository_1.LogReopositoryImpl(new file_system_datasource_1.FileSystemDataSource());
class Server {
    static start() {
        console.log("Servidor corriendo....");
        const url = "http://localhost:3000/posts";
        cron_service_1.CronService.createJob("*/5 * * * * *", () => {
            console.log("5 sencods");
            //new CheckService().execute("https://google.com");
            new checek_service_1.CheckService(fileSystemLogRepository).execute(url);
        });
    }
}
exports.Server = Server;
