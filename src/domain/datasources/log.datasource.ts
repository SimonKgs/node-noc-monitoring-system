import { LogEntity, LogSeverityLevel } from "../entities/log.entity";

// business rules
export abstract class LogDataSource {

    abstract saveLog(log: LogEntity): Promise<void> // save log
    abstract getLogs(): Promise<LogEntity[]> // get all logs
    abstract getLogsByLevel( severityLevel: LogSeverityLevel): Promise<LogEntity[]> // get logs by level
    // abstract getLog( date: Date): Promise<LogEntity[]>

}