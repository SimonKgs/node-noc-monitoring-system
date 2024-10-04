interface CheckServiceUseCase {
    execute( url: string ):Promise<boolean>
}

// this service will check if any URL is available
export class CheckService implements CheckServiceUseCase{

    public async execute(url: string): Promise<boolean> {

        try {
            const req = await fetch(url);
            if ( !req.ok ) {
                // if enters here go to catch
                throw new Error( `Error on check service ${ url } `); 
            }
            console.log(`${url}, status: ok`);
            
            return true;
        } catch (error) {

            console.log(`${ error }`);
            
            return false; 
        }

    }

}