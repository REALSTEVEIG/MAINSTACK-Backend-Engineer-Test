import { delay } from '@/utils';
import testEnv from '../src/scripts/prepare-test-env';
import { getSessionCookie } from '@/tests/setup';

export default async (): Promise<void> => {
  await testEnv.initTestDb();
  await testEnv.runMigrations();
  await testEnv.seedTestUsers();
  await testEnv.seedMarketplaceApps();
  await testEnv.initTestServer();
  await delay(5000);
  global.sessionCookie = await getSessionCookie();
};
