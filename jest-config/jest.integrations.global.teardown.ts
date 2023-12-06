import testEnv from '../src/scripts/prepare-test-env';

export default async (): Promise<void> => {
  await testEnv.closeTestServer();
};
