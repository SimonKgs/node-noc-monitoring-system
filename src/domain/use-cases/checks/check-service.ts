import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceUseCase {
    execute( url: string ):Promise<boolean>
}

type SuccessCallback = (() => void) | undefined;
type ErrorCallback = (( error: string ) => void) | undefined ;


// this use case will check a service
export class CheckService implements CheckServiceUseCase{

    // Inject dependencies into the constructor
    // 'readonly' ensures that the callbacks cannot be reassigned within the class
    // Once declared, the user must provide these dependencies when instantiating the class 
    constructor (
        private readonly logRepository: LogRepository,
        private readonly successCalback: SuccessCallback,
        private readonly errorCalback: ErrorCallback,
    ) {}
    
    public async execute(url: string): Promise<boolean> {
        const origin = 'check-service';
        try {
            const req = await fetch(url);
            if ( !req.ok ) {
                // if enters here go to catch
                throw new Error( `Error on check service ${ url } `); 
            }

            const log = new LogEntity({
                message: `Service ${ url } working`, 
                level: LogSeverityLevel.low, 
                origin
            } 
            );
            this.logRepository.saveLog( log )
            this.successCalback && this.successCalback();
            
            return true;
        } catch (error) {

            const errorMessage = `${ url } ${ error }`;
            const log = new LogEntity({
                message: errorMessage, 
                level: LogSeverityLevel.high, 
                origin
            });
            this.logRepository.saveLog( log );
            this.errorCalback && this.errorCalback( errorMessage );

            return false; 
        }

    }

}