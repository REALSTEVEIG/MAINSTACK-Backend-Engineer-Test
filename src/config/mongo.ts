import mongoose, { type Mongoose } from 'mongoose';
import chalk from 'chalk';
import { DB } from '@config/index';
import MongoStore from 'connect-mongo';
import { type IMongoConn } from '../types';

class MongoConnection implements IMongoConn {
  private readonly status: string;

  private readonly uri: string;

  client: Mongoose | null;

  sessionStore: MongoStore | null;

  dbName: string;

  constructor() {
    this.status = '';
    this.uri = DB.MONGO_URI;
    this.client = null;
    this.sessionStore = null;
    this.dbName = DB.NAME;
  }

  async connectDatabase(): Promise<Mongoose> {
    const dbClient = await mongoose.connect(this.uri, {
      dbName: this.dbName,
    });
    this.client = dbClient;
    // eslint-disable-next-line no-console
    console.log(
      chalk.white.bgGreen(`DB Connection established to ${this.dbName}`),
    );
    return dbClient;
  }

  // eslint-disable-next-line class-methods-use-this
  getSessionStore(): MongoStore {
    const sessionStore = MongoStore.create({
      client: this.client?.connection.getClient() as any,
      stringify: false,
      dbName: this.dbName,
      autoRemove: 'disabled',
      mongoOptions: {
        maxConnecting: 1,
        maxPoolSize: 1,
      },
    });

    this.sessionStore = sessionStore;
    // eslint-disable-next-line no-console
    console.log(chalk.bgYellow(`Session storage connected to ${this.dbName}`));
    return sessionStore;
  }

  // eslint-disable-next-line class-methods-use-this
  async closeDatabase(): Promise<void> {
    await mongoose.disconnect();
    // eslint-disable-next-line no-console
    console.log(chalk.bgYellow('DB Connection abolished!'));
  }
}

export default MongoConnection;
