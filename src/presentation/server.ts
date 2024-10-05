import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./services/cron-service";


// adding the repositories here
// First create the log repository
// It need a datasource
// I create inside it a new instance of a DataSource to pass as argument
// with this implementations it is simple to change the dataSource for other one
const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDataSource()
);


export class Server {

    public static start() {

        console.log('Server started...');
        

        CronService.createJob('*/5 * * * * *', () => {
            const url = 'https://google.com'

            new CheckService(
                // here I am injecting the functions defined 
                // on the constructor check-service file
                fileSystemLogRepository,
                () => console.log(`${url}, status: ok`),
                ( error ) => console.log( error ),
            ).execute( url )
            // new CheckService().execute( 'http://localhost:3000/posts' )
        })
        
    }

}