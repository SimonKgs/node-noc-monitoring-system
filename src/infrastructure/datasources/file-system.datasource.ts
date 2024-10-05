import fs from 'fs'; 

import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";


// this file will connect with the db or source  
export class FileSystemDataSource implements LogDataSource {

    private readonly logPath = 'logs/'
    private readonly allLogsPath = 'logs/logs-all.log'
    private readonly lowLogsPath = 'logs/logs-low.log'
    private readonly mediumLogsPath = 'logs/logs-medium.log'
    private readonly highLogsPath = 'logs/logs-high.log'


    constructor(){
        this.createLogsFiles()
    }
    
    

    // Create the folder and files if doesn't exist
    private createLogsFiles = () => {

        if (!fs.existsSync(this.logPath)){
            fs.mkdirSync(this.logPath)
        }

        [
            this.allLogsPath,
            this.lowLogsPath,
            this.mediumLogsPath,
            this.highLogsPath,
        ].forEach( path => {
            if ( fs.existsSync(path)) return;
            fs.writeFileSync(path, '');
        })
    }

    async saveLog(newLog: LogEntity): Promise<void> {

        const logAsJson = `${ JSON.stringify(newLog) }\n`;
        
        fs.appendFileSync( this.allLogsPath, logAsJson );

        let logFilePath: string | null = null;

        switch ( newLog.level ) {
            case LogSeverityLevel.low:
                logFilePath = this.lowLogsPath;
                break;
            case LogSeverityLevel.medium:
                logFilePath = this.mediumLogsPath;
                break;
            case LogSeverityLevel.high:
                logFilePath = this.highLogsPath;
                break;
            default:
                throw new Error(`${ newLog.level } not implemented`)
        }

        if (logFilePath)
            fs.appendFileSync( logFilePath, logAsJson);
    }

    private getLogsFromFile = ( path = 'logs/logs-all.log' ): LogEntity[] => {
        
        const fileContent = fs.readFileSync(path, 'utf-8');
        // const logs: LogEntity[] = fileContent.split('\n').map( log => LogEntity.fromJson(log));
        const logs: LogEntity[] = fileContent.split('\n').map(LogEntity.fromJson);

        return logs;
    }

    async getLogs():Promise<LogEntity[]>{
        return this.getLogsFromFile();
    }

    async getLogsByLevel(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        switch ( severityLevel ) {
            case LogSeverityLevel.low:
                return this.getLogsFromFile(this.lowLogsPath);

            case LogSeverityLevel.medium:
                return this.getLogsFromFile(this.mediumLogsPath);

            case LogSeverityLevel.high:
                return this.getLogsFromFile(this.highLogsPath);

            default:
                throw new Error(`${ severityLevel } not implemented`);
        }
    }
}