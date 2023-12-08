import './loadEnv';
import chalk from 'chalk';
import * as config from '@config/index';
import MongoConnection from '@config/mongo';
import { type Server, type IncomingMessage, type ServerResponse } from 'http';
import session from 'express-session';
import { requestLogger } from '@middlewares/index';
import compression from 'compression';
import express from 'express';
import cors from 'cors';
import {
  commonRoutes,
  userAuthRoutes,
  userRoutes,
  productRoutes,
} from '@routes/index';
import _ from 'lodash';
import { getEnvironmentVariable } from './utils';
import logRoutes from './utils/routes-logger';
import { type Request } from './types';
import { requiredEnvVars } from './constants/constants';
/* Declartions file */
import '@/types/d';

const app = express();

let server: Server<typeof IncomingMessage, typeof ServerResponse>;

const mongo = new MongoConnection();
const env = getEnvironmentVariable('NODE_ENV');

process.on('unhandledRejection', (reason, promise) => {
  // eslint-disable-next-line no-console
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

const initServer = async (): Promise<void> => {
  /* Connect database */
  await mongo.connectDatabase();
  app.use(
    cors({
      credentials: true,
      origin: config.ALLOWED_HOSTNAMES
        ? config.ALLOWED_HOSTNAMES.split(',')
        : [],
    }),
  );
  app.use((req: Request<any>, res: any, next: any) => {
    req.ctx = {};
    next();
  });
  app.use(express.json());
  /* Session middleware must be executed after connection to mongo is established because reusable connections from mongoose are used here */
  app.use(
    session({
      resave: false,
      saveUninitialized: false,
      store: mongo.getSessionStore(),
      secret: '!@#',
    }),
  );
  app.use(compression());
  app.use(requestLogger());
  app.use('/api', commonRoutes);
  app.use('/api/auth', userAuthRoutes);
  app.use('/api/user', userRoutes);
  app.use('/api/product', productRoutes);

  server = app.listen(config.PORT, () => {
    // eslint-disable-next-line no-console
    console.log(chalk.yellow(`Application is running on port ${config.PORT}`));
    logRoutes(app);
  });
};

const closeServer = async (): Promise<void> => {
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (server) {
    await mongo.closeDatabase();
    server.close();
  }
};

const validateEnvVars = (): void => {
  const missingVars = requiredEnvVars.filter((k) => _.isEmpty(process.env[k]));
  if (missingVars.length > 0) {
    // eslint-disable-next-line no-console
    console.log(
      chalk.red('Missing environment variables:', missingVars.toString()),
    );
    process.exit(1);
  }
};

if (env === 'development' || env === 'production') {
  validateEnvVars();
  void initServer();
}

export { initServer, closeServer };
