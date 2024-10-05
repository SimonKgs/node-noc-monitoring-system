import 'dotenv/config';
import * as env from 'env-var';


// this package env-var is good to validate .env variables
// I use them from here instead of .env having them validated
export const envs = {
    PORT: env.get('PORT').required().asPortNumber(),
    EMAIL: env.get('MAILER_EMAIL').required().asEmailString(),
    PROD: env.get('PROD').required().asBool(),
    MAIL_SECRET_KEY: env.get('MAIL_SECRET_KEY').required().asString()
}

