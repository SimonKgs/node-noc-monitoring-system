
export enum LogSeverityLevel {
    low = 'low',
    medium = 'medium',
    high = 'high',
}

export class LogEntity {

    public level: LogSeverityLevel;
    public message: string;
    public createdAt: Date;


    constructor( message:string, level: LogSeverityLevel) {

        this.message = message;
        this.level = level;
        this.createdAt = new Date();

    }

    // method to create instances from a string json
    // "{ "level": "high", "message": "hello world", "createdAt":"12893TZ12378123"}"
    static fromJson = ( json:string ):LogEntity => {
        // getting the values from the string
        const { message, level, createdAt } = JSON.parse(json)
        // adding some validations
        if ( !message ) throw new Error('Message is required');
        if ( !level ) throw new Error('level is required');
        // creating the instance keeping the date
        const log = new LogEntity(message, level);
        log.createdAt = new Date(createdAt);
        return log;
    }

}