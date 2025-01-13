import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { EmailService } from "./services/email-service";


// adding the repositories here
// First create the log repository
// It need a datasource
// I create inside it a new instance of a DataSource to pass as argument
// with this implementations it is simple to change the dataSource for other one
const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDataSource()
);

const emailService = new EmailService();


export class Server {

    public static start() {

        console.log('Server started...');

        // Sending the email from the use case
        // new SendEmailLogs(
        //     emailService,
        //     fileSystemLogRepository
        // ).execute(['simongonzalezquir@gmail.com']);

        // sending the email from the service
        // const emailService = new EmailService();
        // emailService.sendEmailWithFileSystemLogs(['simongonzalezquir@gmail.com']);

        // emailService.sendEmail({
        //     to: 'simongonzalezquir@gmail.com',
        //     subject: 'Test Email',
        //     htmlBody: `
        //     <h1>Test Email</h1>
        //     <br>
        //     <p>This is a test email</p>
        //     <p>Lorem ipsum dolor sit amet</p>
        //     `
        // });

        // CronService.createJob('*/5 * * * * *', () => {
        //     const url = 'https://google.com'

        //     new CheckService(
        //         // here I am injecting the functions defined 
        //         // on the constructor check-service file
        //         fileSystemLogRepository,
        //         () => console.log(`${url}, status: ok`),
        //         ( error ) => console.log( error ),
        //     ).execute( url )
        //     // new CheckService().execute( 'http://localhost:3000/posts' )
        // });        
    }
}