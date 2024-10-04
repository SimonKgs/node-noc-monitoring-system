import { CronJob } from "cron";


type CronTime = string | Date;
// cronTime: '*/5 * * * * *', // */5 every 5 seconds

type OnTick = () => void;


export class CronService {

    static createJob( cronTime: CronTime, onTick: OnTick ): CronJob {

        const job = CronJob.from({
            cronTime,
            onTick,
        });
        job.start()

        // to stop the proccess if needed
        return job;

    }

}