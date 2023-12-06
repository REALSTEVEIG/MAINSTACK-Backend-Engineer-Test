import { getEnvironmentVariable } from '../utils';

const config = {
  ALLOWED_HOSTNAMES: getEnvironmentVariable('ALLOWED_HOSTNAMES'),
  PORT: getEnvironmentVariable('PORT'),
  NODE_ENV: getEnvironmentVariable('NODE_ENV'),
  APP_VERSION: getEnvironmentVariable('APP_VERSION'),
  DB: {
    NAME: getEnvironmentVariable('DB_NAME'),
    MONGO_URI: getEnvironmentVariable('MONGO_URI'),
  },
};

export const { ALLOWED_HOSTNAMES, PORT, NODE_ENV, APP_VERSION, DB } = config;
