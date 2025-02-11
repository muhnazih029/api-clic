import { logger } from '~/common/providers';
import { beforeAll, describe, expect, it } from 'bun:test';
import app from '~/server';

describe('example', () => {
  beforeAll(async () => {
    logger.setLocation('example.e2e.spec');
  });
  it('should pass', () => {
    logger.info('test');
    expect(1 + 1).toBe(2);
  });
  describe('[Example API] GET /', () => {
    it('should get output', async () => {
      const res = await app.request('/', {
        method: 'GET',
      });
      logger.info('Example API', res);

      expect(res.status).toBe(200);
      expect(await res.text()).toBe('Hello Hono!');
    });
  });
});
