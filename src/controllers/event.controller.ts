import { createFactory } from 'hono/factory';
import { BlankEnv } from 'hono/types';
// import { HTTPException } from 'hono/http-exception';

// import { ZodError } from 'zod';

import { eventService } from 'src/services';
import { CreateEventRequest } from 'src/models';
import { TPath } from 'src/constants';
import { logger } from 'src/providers';
import { TEnv } from 'src/types';
import { Controller } from './abstract';

export class EventController extends Controller {
  constructor() {
    super();
    this.eventService = eventService;
    this.logger = logger;
    this.logger.setLocation('event.controller');
  }

  create = createFactory<TEnv, TPath['CREATE']>().createHandlers(
    async (c) => {
      const req: CreateEventRequest = await c.req.json();
      const { id } = c.get('user');
      const data = { ...req, userId: id };

      this.logger.setLocation('event.controller.create');
      this.logger.info('creating...');
      this.logger.debug('request', data);

      const result = await this.eventService.create(data);
      this.logger.debug('response', result);

      return c.json(result, 201);
    },
  );

  get = createFactory<BlankEnv, TPath['GET_EVENT']>().createHandlers(
    async (c) => {
      this.logger.setLocation('event.controller.get');
      this.logger.info('getting...');

      const result = await this.eventService.get();
      this.logger.debug('response', result);

      return c.json(result);
    }
  );
}
export const eventController = new EventController();