import { EmailService } from "../../../presentation/email/email.service";
import { LogEntity, logSeverityLevel } from "../../entities/Log.entity";
import { LogRepository } from "../../repository/log.repository";

export interface SendLogsEmailUseCase {
    execute: (to: string | string[]) => Promise<boolean>;
}

export class SendLogsEmail implements SendLogsEmailUseCase {

    constructor(
        private readonly emailService: EmailService,
        private readonly logRepository: LogRepository
    ) { }

    async execute(to: string | string[]) {
        try {
            const sent = await this.emailService.sendMailWithFileSystemLogs(
                "navemen23@hotmail.com"
            );

            if (!sent) throw new Error("Email was not sent");

            this.logRepository.saveLog(
                new LogEntity({
                    level: logSeverityLevel.low,
                    message: `email sent to ${to}`,
                    origin: "send-logs-email.service.ts",
                })
            );

            return true;
        } catch (error) {
            this.logRepository.saveLog(
                new LogEntity({
                    level: logSeverityLevel.high,
                    message: `${error}`,
                    origin: "send-logs-email.service.ts",
                })
            );

            return false;
        }
    }
}
