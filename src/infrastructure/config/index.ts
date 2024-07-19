import dotenv from 'dotenv';

const env = process.env.NODE_ENV || 'local';

switch (env) {
  case 'production':
    dotenv.config({ path: '.env.production' });
    break;
  case 'staging':
    dotenv.config({ path: '.env.staging' });
    break;
  case 'local':
  default:
    dotenv.config({ path: '.env.local' });
    break;
}

if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined in the environment variables');
}

export const config = {
  nodeEnv: process.env.NODE_ENV,
  databaseUrl: process.env.DATABASE_URL,
  apiBaseUrl: process.env.API_BASE_URL,
  logLevel: process.env.LOG_LEVEL,
  port: process.env.PORT || 3000,
};
