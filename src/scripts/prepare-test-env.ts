/* eslint-disable import/first */
/* eslint-disable no-console */
/*
SET NODE_ENV=test before running this script otherwise env vars will not be loaded
*/
import '../loadEnv';
import childProcess from 'child_process';
import mongoose, { type Mongoose } from 'mongoose';
import chalk from 'chalk';
import util from 'util';
import MongoConnection from '@/config/mongo';
import usersMock from '@/tests/mocks/users.json';
import { UsersModel } from '@/models';
import { encryptString } from '@/utils/bcrypt';
import { getEnvironmentVariable } from '@/utils';
import { initServer, closeServer } from '@/server';

interface ExecMethods {
  db: null | Mongoose;
  initTestDb: () => Promise<ExecMethods>;
  runMigrations: () => Promise<ExecMethods>;
  seedTestUsers: () => Promise<ExecMethods>;
  initTestServer: () => Promise<void>;
  closeTestServer: () => Promise<void>;
}

const testEnv: ExecMethods = {
  db: null,
  async initTestDb() {
    /* This function will delete the entire database and then re-create it */
    const mongo = new MongoConnection();
    const testDbName = getEnvironmentVariable('DB_NAME');
    if (testDbName.length === 0) return process.exit(1);
    this.db = await mongo.connectDatabase();
    const collections = this.db.connection.db.listCollections();
    // eslint-disable-next-line no-restricted-syntax
    for await (const collection of collections) {
      await mongoose.connection
        .useDb(testDbName)
        .dropCollection(collection.name);
      console.log(chalk.yellow(`Collection ${collection.name} flushed`));
    }
    console.log(chalk.yellow(`Db ${testDbName} initialized`));
    return this;
  },
  async runMigrations() {
    console.log(chalk.yellow('Migrations execution started'));
    const runCommand = async (command: string): Promise<any> => {
      const promisifiedExec = util.promisify(childProcess.exec);
      try {
        const { stdout } = await promisifiedExec(command);
        return stdout;
      } catch (error) {
        throw new Error(error as any);
      }
    };

    /*
     This process needs MONGO_URI and DB_NAME env vars. We dont need to pass vars as those are already present in the process. We are already loading env vars in the top of script.
     */
    const stdout = await runCommand('npm run migration:up');

    console.log(stdout.toString());
    console.log(chalk.yellow('Migrations execution done'));
    return this;
  },

  async seedTestUsers() {
    console.log(chalk.yellow('Users seeding started'));
    // eslint-disable-next-line no-restricted-syntax
    for (const user of usersMock) {
      // eslint-disable-next-line no-await-in-loop
      const encryptedPassword = await encryptString(user.password);
      // eslint-disable-next-line no-await-in-loop
      await UsersModel.create({ ...user, password: encryptedPassword });
      console.log(`New user ${user.email} created`);
    }
    console.log(chalk.yellow('Users seed done'));
    return this;
  },
  async initTestServer() {
    await initServer();
  },
  async closeTestServer() {
    await closeServer();
  },
};

export default testEnv;
