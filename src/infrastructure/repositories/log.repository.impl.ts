import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';
import { LogRepository } from '../../domain/repository/log.repository';
import { LogDataSource } from '../../domain/datasources/log.datasource';


export class LogRepositoryImpl implements LogRepository {

    // Injecting the logDataSource
    constructor(
        private readonly logDataSource: LogDataSource
    ){}

    // implementation of the methods of the datasource
    async saveLog(log: LogEntity): Promise<void> {
        this.logDataSource.saveLog(log)
    }
    async getLogs(): Promise<LogEntity[]> {
        return this.logDataSource.getLogs();
    }
    getLogsByLevel(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        return this.logDataSource.getLogsByLevel(severityLevel);
    }



}