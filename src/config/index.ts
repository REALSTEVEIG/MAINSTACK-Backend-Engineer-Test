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
  SENDGRID: {
    API_KEY: getEnvironmentVariable('SENDGRID_API_KEY'),
  },
  OAUTH: {
    MS: {
      CLIENT_ID: getEnvironmentVariable('MS_CLIENT_ID'),
      CLIENT_SECRET: getEnvironmentVariable('MS_CLIENT_SECRET'),
      CALLBACK_URI: getEnvironmentVariable('MS_CALLBACK_URI'),
    },
    GOOGLE: {
      CLIENT_ID: getEnvironmentVariable('GOOGLE_CLIENT_ID'),
      CLIENT_SECRET: getEnvironmentVariable('GOOGLE_CLIENT_SECRET'),
      AUTH_URL: getEnvironmentVariable('GOOGLE_AUTH_URL'),
      EVENTS_WATCH_URL: getEnvironmentVariable('GOOGLE_EVENTS_WATCH_URL'),
    },
  },
  AZURE: {
    STORAGE: {
      ACCOUNT: getEnvironmentVariable('AZURE_STORAGE_ACCOUNT_NAME'),
      ACCOUNT_KEY: getEnvironmentVariable('AZURE_STORAGE_ACCOUNT_ACCESS_KEY'),
      CONTAINER_NAME: getEnvironmentVariable('AZURE_STORAGE_CONTAINER_NAME'),
    },
  },
};

export const {
  ALLOWED_HOSTNAMES,
  PORT,
  NODE_ENV,
  APP_VERSION,
  DB,
  SENDGRID,
  OAUTH,
  AZURE,
} = config;
