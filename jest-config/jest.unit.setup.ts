import '../src/loadEnv';
// eslint-disable-next-line import/first
import MongoConnection from '../src/config/mongo';

jest.setTimeout(30000);

beforeAll(async () => {
  // eslint-disable-next-line no-console
  await new MongoConnection().connectDatabase();
});

afterAll(async () => {
  await new MongoConnection().closeDatabase();
});
