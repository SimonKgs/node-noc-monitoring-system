import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';


interface SendEmailOptions {
    to: string | string[],
    subject: string,
    htmlBody: string
    attachments?: Attachment[];
}


interface Attachment {
    filename: string;
    path: string;
}


export class EmailService {

    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.EMAIL,
            pass: envs.MAIL_SECRET_KEY
        }
    });

    constructor(
    ) {}


    async sendEmail(options: SendEmailOptions):Promise<boolean> {

        const { to, subject, htmlBody, attachments = [] } = options

        try {
            const sentInformation = await this.transporter.sendMail({
                to,
                subject,
                html: htmlBody,
                attachments
            });

            console.log(sentInformation);
            const log = new LogEntity({
                level: LogSeverityLevel.low,
                message: 'Email sent',
                origin: 'email-service',
            })

            return true;
        } catch (error) {
            const log = new LogEntity({
                level: LogSeverityLevel.high,
                message: 'Error sending Email',
                origin: 'email-service',
            })

            return false;
        }
    }


    async sendEmailWithFileSystemLogs( to: string | string[]) {
        const subject = 'Logs del servidor'
        const htmlBody = `
        <h1>Server logs at ${ new Date() }</h1>
        <p>See attachments</p>
        `

        const attachments: Attachment[] = [
            { filename: 'logs-all.log', path: 'logs/logs-all.log' },
            { filename: 'logs-high.log', path: 'logs/logs-high.log' },
            { filename: 'logs-medium.log', path: 'logs/logs-medium.log' },
        ];


       return this.sendEmail({ to, subject, htmlBody, attachments });
    }



}