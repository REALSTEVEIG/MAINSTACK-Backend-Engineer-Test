import path from 'path';
import dotenv from 'dotenv-flow';
import { getEnvironmentVariable, setEnvironmentVariable } from './utils';

/* Set default node env */
const env = getEnvironmentVariable('NODE_ENV');
if (env === undefined || env.length === 0)
  setEnvironmentVariable('NODE_ENV', 'development');

const envFilesPath = path.join(__dirname, '../');
dotenv.config({ path: envFilesPath });
