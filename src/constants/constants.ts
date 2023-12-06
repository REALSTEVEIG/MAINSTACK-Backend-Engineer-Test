import { type EnvVars } from '@/types';

type EnvVarsKey = keyof EnvVars;

const requiredEnvVars: EnvVarsKey[] = [
  'APP_VERSION',
  'DB_NAME',
  'MONGO_URI',
  'NODE_ENV',
  'PORT',
  'ALLOWED_HOSTNAMES',
];

export { requiredEnvVars };
