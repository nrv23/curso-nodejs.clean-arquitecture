import { createTransport } from "nodemailer";
import { envs } from "../../config/plugins/envs";
import { LogEntity, logSeverityLevel } from "../../domain/entities/Log.entity";
import { LogRepository } from "../../domain/repository/log.repository";

interface SendMailOptions {
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachments?: Attachement[];
}

interface Attachement {
    filename: string;
    path: string;
}

export class EmailService {

    constructor() { }

    private transporter = createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY,
        },
    });

    async sendEmail(options: SendMailOptions): Promise<boolean> {
        try {
            const { to, subject, htmlBody, attachments = [] } = options;
            const sendInformation = await this.transporter.sendMail({
                to,
                subject,
                html: htmlBody,
                attachments,
            });


            return true;
        } catch (error) {

            return false;
        }
    }

    async sendMailWithFileSystemLogs(to: string | string[]) {
        const subject = "Logs del servidor";
        const html = `
                <h3> Logs de API - NOC </h3> 
                <p> Ver archivos adjuntos </p>
            `;

        const attachments: Attachement[] = [
            { path: "./logs/all-logs.log", filename: "all-logs.log" },
            { path: "./logs/critical-logs.log", filename: "critical-logs.log" },
            { path: "./logs/medium-logs.log", filename: "medium-logs.log" },
            { path: "./logs/high-logs.log", filename: "high-logs.log" },
            { path: "./logs/low-logs.log", filename: "low-logs.log" },
        ];

        return this.transporter.sendMail({
            to,
            subject,
            html,
            attachments,
        });
    }
}
