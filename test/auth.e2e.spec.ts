import { logger } from 'src/providers/logger.provider';
import {
  afterAll,
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
} from 'bun:test';
import app from 'src';
import { TestService } from './test.service';

describe('AuthController (e2e)', () => {
  afterAll(async () => {
    await TestService.deleteAll();
  });

  describe('[Register API] POST /api/auth/register', () => {
    beforeEach(async () => {
      await TestService.deleteUser();
    });
    afterEach(async () => {});

    it('should be able to register', async () => {
      const res = await app.request('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          nim: '12345',
          username: 'baru',
          password: 'rahasia',
          fullname: 'Test User',
        }),
      });
      console.log(res);
      logger.info('REGISTER API success res', res);

      const body = await res.json();
      logger.info('REGISTER API success body', res);

      expect(res.status).toBe(201);
      expect(body).toBeDefined();
      expect(body.message).toBe('created');
      expect(body.data).toBeDefined();
      expect(body.data.at).toBeDefined();
      expect(body.data.rt).toBeDefined();
    });

    it('should be able to register if username undifined', async () => {
      const res = await app.request('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          nim: '12345',
          password: 'rahasia',
          fullname: 'Test User',
        }),
      });
      console.log(res);
      logger.info('REGISTER API success res', res);

      const body = await res.json();
      logger.info('REGISTER API success body', res);

      expect(res.status).toBe(201);
      expect(body).toBeDefined();
      expect(body.message).toBe('created');
      expect(body.data).toBeDefined();
      expect(body.data.at).toBeDefined();
      expect(body.data.rt).toBeDefined();
    });

    it('should be rejected if request invalid', async () => {
      const res = await app.request('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          nim: '12345',
          username: '',
          password: '',
          fullname: '',
        }),
      });
      console.log(res);
      logger.info('REGISTER API error res', res);

      const body = await res.json();
      logger.info('REGISTER API error body', res);

      expect(res.status).toBe(400);
      expect(body).toBeDefined();
      expect(body.message).toBe('Validation error');
      expect(body.errors).toBe(true);
      expect(body.data).toBeDefined();
    });

    it('should be rejected if register the same nim', async () => {
      await TestService.createUser('nim');
      const res = await app.request('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          nim: '12345',
          username: 'tessss',
          password: 'tessss',
          fullname: 'tessss',
        }),
      });
      console.log(res);
      logger.info('REGISTER API error res', res);

      const body = await res.json();
      logger.info('REGISTER API error body', res);

      expect(res.status).toBe(400);
      expect(body).toBeDefined();
      expect(body.message).toBe('The credential is  already registered');
      expect(body.errors).toBe(true);
    });

    it('should be rejected if register the same username', async () => {
      await TestService.createUser('username');
      const res = await app.request('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          nim: '27537128',
          username: 'test',
          password: 'tessss',
          fullname: 'tessss',
        }),
      });
      console.log(res);
      logger.info('REGISTER API error res', res);

      const body = await res.json();
      logger.info('REGISTER API error body', res);

      expect(res.status).toBe(400);
      expect(body).toBeDefined();
      expect(body.message).toBe('The credential is  already registered');
      expect(body.errors).toBe(true);
    });
  });
});
