import { LogEntity, LogSeverityLevel } from "../entities/log.entity";

// The repository will connect with the datasource
// the datasource will only be accessible from the repository
// for that reason the classes have the same abstract methods to link them
export abstract class LogRepository {

    abstract saveLog(log: LogEntity): Promise<void>
    abstract getLogs(): Promise<LogEntity[]>
    abstract getLogsByLevel( severityLevel: LogSeverityLevel): Promise<LogEntity[]>

}