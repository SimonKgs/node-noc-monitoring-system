import { EmailService } from "../../../presentation/services/email-service";
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";


interface SendLogEmailUseCase {
    execute: (to: string | string[]) => Promise<boolean>;
}


export class SendEmailLogs implements SendLogEmailUseCase {

    constructor(
        private readonly emailService: EmailService,
        private readonly logRepository: LogRepository
    ){}

    async execute( to: string | string[]) {

        try {
            const isSent = await this.emailService.sendEmailWithFileSystemLogs( to );
            if (!isSent) {
                throw new Error('Error sending email log');
            }
            const log = new LogEntity({
                level: LogSeverityLevel.low,
                message: `Email sent successfully`,
                origin: 'send-email-logs.ts',
            })
            this.logRepository.saveLog(log)
            return true;
        } catch (error) {
            const log = new LogEntity({
                level: LogSeverityLevel.high,
                message: `${error}`,
                origin: 'send-email-logs.ts',
            })
            this.logRepository.saveLog(log)
            return false
        }
    }

}