import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./services/cron-service";

export class Server {

    public static start() {

        console.log('Server started...');
        

        CronService.createJob('*/5 * * * * *', () => {
            const date = new Date();
            new CheckService().execute( 'https://google.com' )
            // new CheckService().execute( 'http://localhost:3000/posts' )
        })
        
    }

}