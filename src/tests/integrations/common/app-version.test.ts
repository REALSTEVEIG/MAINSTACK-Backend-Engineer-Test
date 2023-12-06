import request from '@/tests/config/axios';

test('api should send server information', async () => {
  const result = await request.get('/api/version');
  expect(result.status).toEqual(200);
});
