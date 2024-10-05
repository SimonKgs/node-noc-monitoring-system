interface CheckServiceUseCase {
    execute( url: string ):Promise<boolean>
}

type SuccessCallback = () => void;
type ErrorCallback = ( error: string ) => void;


// this service will check if any URL is available
export class CheckService implements CheckServiceUseCase{

    // Inject dependencies into the constructor
    // 'readonly' ensures that the callbacks cannot be reassigned within the class
    // Once declared, the user must provide these dependencies when instantiating the class 
    constructor (
        private readonly successCalback: SuccessCallback,
        private readonly errorCalback: ErrorCallback,
    ) {}
    
    public async execute(url: string): Promise<boolean> {

        try {
            const req = await fetch(url);
            if ( !req.ok ) {
                // if enters here go to catch
                throw new Error( `Error on check service ${ url } `); 
            }

            this.successCalback();
            
            return true;
        } catch (error) {

            console.log(`${ error }`);
            
            this.errorCalback( `${ error }` )
            return false; 
        }

    }

}