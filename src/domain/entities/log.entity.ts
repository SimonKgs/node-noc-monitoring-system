// import { LogEntity } from './log.entity';

export enum LogSeverityLevel {
    low = 'low',
    medium = 'medium',
    high = 'high',
}


export interface LogEntityptions {
    level: LogSeverityLevel;
    message: string;
    createdAt?: Date;
    origin: string;
}

export class LogEntity {

    public level: LogSeverityLevel;
    public message: string;
    public createdAt: Date;
    public origin: string;


    constructor( options: LogEntityptions ) {

        this.message = options.message;
        this.level = options.level;
        this.createdAt = options.createdAt || new Date();
        this.origin = options.origin;

    }

    // method to create instances from a string json
    // "{ "level": "high", "message": "hello world", "createdAt":"12893TZ12378123"}"
    static fromJson = ( json:string ):LogEntity => {
        // getting the values from the string
        const { message, level, createdAt, origin } = JSON.parse(json)
        // adding some validations
        if ( !message ) throw new Error('Message is required');
        if ( !level ) throw new Error('level is required');
        // creating the instance keeping the date
        const log = new LogEntity({ 
            message, 
            level,
            createdAt,
            origin
        });
        
        return log;
    }

}