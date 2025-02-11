import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
} from 'bun:test';

import app from '~/server';

import { logger } from '~/common/providers';
import { PATH } from '~/constants';

import { TestService } from './test.service';

describe('AuthController (e2e)', () => {
  const baseUrl = '/api/auth';

  beforeAll(async () => {
    logger.setLocation('auth.e2e.spec');
  });
  afterAll(async () => {
    await TestService.deleteAll();
  });

  describe('[Register API] POST /api/auth/register', () => {
    beforeEach(async () => {
      await TestService.deleteUser();
    });
    afterEach(async () => {});

    it('should be able to register', async () => {
      const res = await app.request(`${baseUrl}${PATH.REGISER}`, {
        method: 'POST',
        body: JSON.stringify({
          nim: '12345',
          username: 'baru',
          password: 'rahasia',
          fullname: 'Test User',
        }),
      });
      logger.setLocation('auth.e2e.spec.register');
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
      const res = await app.request(`${baseUrl}${PATH.REGISER}`, {
        method: 'POST',
        body: JSON.stringify({
          nim: '12345',
          password: 'rahasia',
          fullname: 'Test User',
        }),
      });
      logger.setLocation('auth.e2e.spec.register');
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
      const res = await app.request(`${baseUrl}${PATH.REGISER}`, {
        method: 'POST',
        body: JSON.stringify({
          nim: '12345',
          username: '',
          password: '',
          fullname: '',
        }),
      });
      logger.setLocation('auth.e2e.spec.register');
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
      const res = await app.request(`${baseUrl}${PATH.REGISER}`, {
        method: 'POST',
        body: JSON.stringify({
          nim: '12345',
          username: 'tessss',
          password: 'tessss',
          fullname: 'tessss',
        }),
      });
      logger.setLocation('auth.e2e.spec.register');
      logger.info('REGISTER API error res', res);

      const body = await res.json();
      logger.info('REGISTER API error body', res);

      expect(res.status).toBe(400);
      expect(body).toBeDefined();
      expect(body.message).toBe('The credential is already registered');
      expect(body.errors).toBe(true);
    });

    it('should be rejected if register the same username', async () => {
      await TestService.createUser('username');
      const res = await app.request(`${baseUrl}${PATH.REGISER}`, {
        method: 'POST',
        body: JSON.stringify({
          nim: '27537128',
          username: 'test',
          password: 'tessss',
          fullname: 'tessss',
        }),
      });
      logger.setLocation('auth.e2e.spec.register');
      logger.info('REGISTER API error res', res);

      const body = await res.json();
      logger.info('REGISTER API error body', res);

      expect(res.status).toBe(400);
      expect(body).toBeDefined();
      expect(body.message).toBe('The credential is already registered');
      expect(body.errors).toBe(true);
    });
  });

  describe('[Login API] POST /api/auth/login', () => {
    beforeEach(async () => {
      await TestService.deleteUser();
      await TestService.createUser('nim');
      await TestService.createUser('username');
    });
    afterEach(async () => {});

    it('should be able to login using nim', async () => {
      const res = await app.request(`${baseUrl}${PATH.LOGIN}`, {
        method: 'POST',
        body: JSON.stringify({
          identifier: '12345',
          password: 'test',
        }),
      });
      logger.setLocation('auth.e2e.spec.login');
      logger.info('LOGIN API success res', res);

      const body = await res.json();
      logger.info('LOGIN API success body', res);

      expect(res.status).toBe(200);
      expect(body).toBeDefined();
      expect(body.message).toBe('OK');
      expect(body.data).toBeDefined();
      expect(body.data.at).toBeDefined();
      expect(body.data.rt).toBeDefined();
    });

    it('should be able to login using username', async () => {
      const res = await app.request(`${baseUrl}${PATH.LOGIN}`, {
        method: 'POST',
        body: JSON.stringify({
          identifier: 'test',
          password: 'test',
        }),
      });
      logger.setLocation('auth.e2e.spec.login');
      logger.info('LOGIN API success res', res);

      const body = await res.json();
      logger.info('LOGIN API success body', res);

      expect(res.status).toBe(200);
      expect(body).toBeDefined();
      expect(body.message).toBe('OK');
      expect(body.data).toBeDefined();
      expect(body.data.at).toBeDefined();
      expect(body.data.rt).toBeDefined();
    });

    it('should be rejected if password invalid', async () => {
      const res = await app.request(`${baseUrl}${PATH.LOGIN}`, {
        method: 'POST',
        body: JSON.stringify({
          identifier: 'test',
          password: 'rahasia',
        }),
      });
      logger.setLocation('auth.e2e.spec.login');
      logger.info('LOGIN API error res', res);

      const body = await res.json();
      logger.info('LOGIN API error body', res);

      expect(res.status).toBe(401);
      expect(body).toBeDefined();
      expect(body.message).toBe('The credential is invalid');
      expect(body.errors).toBe(true);
    });

    it('should be rejected if request is invalid', async () => {
      const res = await app.request(`${baseUrl}${PATH.LOGIN}`, {
        method: 'POST',
        body: JSON.stringify({
          identifier: '',
          password: '',
        }),
      });
      logger.setLocation('auth.e2e.spec.login');
      logger.info('LOGIN API error res', res);

      const body = await res.json();
      logger.info('LOGIN API error body', res);

      expect(res.status).toBe(400);
      expect(body).toBeDefined();
      expect(body.message).toBe('Validation error');
      expect(body.errors).toBe(true);
    });

    it('should be rejected if user not registered', async () => {
      const res = await app.request(`${baseUrl}${PATH.LOGIN}`, {
        method: 'POST',
        body: JSON.stringify({
          identifier: 'notfound',
          password: 'test',
        }),
      });
      logger.setLocation('auth.e2e.spec.login');
      logger.info('LOGIN API error res', res);

      const body = await res.json();
      logger.info('LOGIN API error body', res);

      expect(res.status).toBe(404);
      expect(body).toBeDefined();
      expect(body.message).toBe('The credential is not registered');
      expect(body.errors).toBe(true);
    });
  });

  describe('[AuthRefresh API] GET /api/auth/refresh', () => {
    beforeEach(async () => {
      await TestService.deleteUser();
      await TestService.createUser('nim');
      await TestService.createUser('username');
    });
    afterEach(async () => {});

    it('should be able to refresh token', async () => {
      const refreshToken = await TestService.getRefreshToken();
      const headers = new Headers();
      headers.set('Authorization', `Bearer ${refreshToken}`);
      const res = await app.request(`${baseUrl}${PATH.REFRESH}`, {
        method: 'GET',
        headers,
      });

      logger.setLocation('auth.e2e.spec.refresh');
      logger.info('REFRESH API success refreshtoken', refreshToken);
      logger.info('REFRESH API success res', res);

      const body = await res.json();
      logger.info('REFRESH API success body', body);

      expect(res.status).toBe(200);
      expect(body).toBeDefined();
      expect(body.message).toBe('OK');
      expect(body.data).toBeDefined();
      expect(body.data.at).toBeDefined();
      expect(body.data.rt).toBeDefined();
    });

    it('should be rejected if refresh token is invalid', async () => {
      const refreshToken = 'invalid';
      const headers = new Headers();
      headers.set('Authorization', `Bearer ${refreshToken}`);
      const res = await app.request(`${baseUrl}${PATH.REFRESH}`, {
        method: 'GET',
        headers,
      });

      logger.setLocation('auth.e2e.spec.refresh');
      logger.info('REFRESH API error res', res);

      const body = await res.json();
      logger.info('REFRESH API error body', res);

      expect(res.status).toBe(401);
      expect(body).toBeDefined();
      expect(body.message).toBe('The credential is invalid');
      expect(body.errors).toBe(true);
    });
  });

  describe('[Logout API] DELETE /api/auth/', () => {
    beforeEach(async () => {
      await TestService.deleteUser();
      await TestService.createUser('nim');
      await TestService.createUser('username');
    });
    afterEach(async () => {});

    it('should be able to logout', async () => {
      let res = await app.request(`${baseUrl}${PATH.LOGIN}`, {
        method: 'POST',
        body: JSON.stringify({
          identifier: '12345',
          password: 'test',
        }),
      });

      const accessToken = await res.json().then((res) => res.data.at);

      const headers = new Headers();
      headers.set('Authorization', `Bearer ${accessToken}`);
      logger.setLocation('auth.e2e.spec.logout');
      logger.info('LOGOUT API success accessToken', accessToken);

      res = await app.request(`${baseUrl}${PATH.LOGOUT}`, {
        method: 'DELETE',
        headers,
      });

      logger.info('LOGOUT API success res', res);

      const body = await res.json();
      logger.info('LOGOUT API success body', body);

      expect(res.status).toBe(200);
      expect(body).toBeDefined();
      expect(body.message).toBe('OK');
      expect(body.data).toBe(true);
    });

    it('should be rejected if access token is invalid', async () => {
      const accessToken = 'invalid';

      const headers = new Headers();
      headers.set('Authorization', `Bearer ${accessToken}`);
      logger.setLocation('auth.e2e.spec.logout');
      logger.info('LOGOUT API success accessToken', accessToken);

      const res = await app.request(`${baseUrl}${PATH.LOGOUT}`, {
        method: 'DELETE',
        headers,
      });

      const body = await res.json();
      logger.info('LOGOUT API error body', res);

      expect(res.status).toBe(401);
      expect(body).toBeDefined();
      expect(body.message).toBe('The credential is invalid');
      expect(body.errors).toBe(true);
    });
  });
});
