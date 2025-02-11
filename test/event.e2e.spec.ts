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

describe('EventController (e2e)', () => {
  const baseUrl = '/api/event';

  beforeAll(async () => {
    logger.setLocation('event.e2e.spec');
  });
  afterAll(async () => {
    await TestService.deleteAll();
  });

  describe('[CREATE EVENT] POST /api/event/create', () => {
    beforeEach(async () => {
      await TestService.deleteUser();
      await TestService.deleteEvent();
      await TestService.createUser('nim');
    });
    afterEach(async () => {
      await TestService.deleteAll();
    });

    it('should be able to create event', async () => {
      let res = await app.request(`/api/auth${PATH.LOGIN}`, {
        method: 'POST',
        body: JSON.stringify({
          identifier: '12345',
          password: 'test',
        }),
      });

      const accessToken = await res.json().then((res) => res.data.at);

      const headers = new Headers();
      headers.set('Authorization', `Bearer ${accessToken}`);
      logger.setLocation('event.e2e.spec.create');
      logger.info('CREATE EVENT API success accessToken', accessToken);

      res = await app.request(`${baseUrl}${PATH.CREATE}`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          title: 'test',
          description: 'test',
          date: 'test',
          image: 'test',
          location: 'test',
          locationUrl: 'test',
        }),
      });

      logger.info('CREATE EVENT API success res', res);

      const body = await res.json();
      logger.info('CREATE EVENT API success body', body);

      expect(res.status).toBe(201);
      expect(body).toBeDefined();
      expect(body.message).toBe('Created');
      expect(body.data).toBeDefined();
    });

    it('should not be able to create event without authorization', async () => {
      const res = await app.request(`${baseUrl}${PATH.CREATE}`, {
        method: 'POST',
        body: JSON.stringify({
          title: 'test',
          description: 'test',
          date: 'test',
          image: 'test',
          location: 'test',
          locationUrl: 'test',
        }),
      });

      logger.setLocation('event.e2e.spec.create');
      logger.info('CREATE EVENT API fail res', res);

      const body = await res.json();
      logger.info('CREATE EVENT API fail body', body);

      expect(res.status).toBe(401);
      expect(body).toBeDefined();
      expect(body.message).toBe('The credential is invalid');
      // expect(body.error).toBe(true);
    });

    it('should not be able to create event with invalid data', async () => {
      let res = await app.request(`/api/auth${PATH.LOGIN}`, {
        method: 'POST',
        body: JSON.stringify({
          identifier: '12345',
          password: 'test',
        }),
      });

      const accessToken = await res.json().then((res) => res.data.at);

      const headers = new Headers();
      headers.set('Authorization', `Bearer ${accessToken}`);
      logger.setLocation('event.e2e.spec.create');

      res = await app.request(`${baseUrl}${PATH.CREATE}`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          title: '',
          description: 'test',
          date: 'test',
          image: 'test',
          location: 'test',
          locationUrl: 'test',
        }),
      });

      logger.info('CREATE EVENT API error res', res);
      const body = await res.json();
      logger.info('CREATE EVENT API error body', body);

      expect(res.status).toBe(400);
      expect(body).toBeDefined();
      expect(body.message).toBe('Validation error');
      expect(body.errors).toBe(true);
    });

    it('should be able to create event if optional field is empty', async () => {
      let res = await app.request(`/api/auth${PATH.LOGIN}`, {
        method: 'POST',
        body: JSON.stringify({
          identifier: '12345',
          password: 'test',
        }),
      });

      const accessToken = await res.json().then((res) => res.data.at);

      const headers = new Headers();
      headers.set('Authorization', `Bearer ${accessToken}`);
      logger.setLocation('event.e2e.spec.create');

      res = await app.request(`${baseUrl}${PATH.CREATE}`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          title: 'test',
          description: 'test',
          date: 'test',
        }),
      });

      logger.info('CREATE EVENT API success res', res);
      const body = await res.json();
      logger.info('CREATE EVENT API success body', body);

      expect(res.status).toBe(201);
      expect(body).toBeDefined();
      expect(body.message).toBe('Created');
      expect(body.data).toBeDefined();
    });
  });
});
