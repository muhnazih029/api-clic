import { TPath } from '~/constants';
import { TEnv } from '~/types';
import { createFactory } from '~/common/libs';
import { logger } from '~/common/providers';
import { Controller } from '~/common/controller';
import { eventService } from './service';
import { CreateEventRequest } from './model';

export class EventController extends Controller {
  constructor() {
    super();
    this.eventService = eventService;
    this.logger = logger;
    this.logger.setLocation('event.controller');
  }

  create = createFactory<TEnv, TPath['CREATE']>().createHandlers(async (c) => {
    const req: CreateEventRequest = await c.req.json();
    const { id } = c.get('user');
    const data = { ...req, userId: id };

    this.logger.setLocation('event.controller.create');
    this.logger.info('creating...');
    this.logger.debug('request', data);

    const result = await this.eventService.create(data);
    this.logger.debug('response', result);

    return c.json(result, 201);
  });

  // get = createFactory<BlankEnv, TPath['GET_EVENT']>().createHandlers(
  //   async (c) => {
  //     this.logger.setLocation('event.controller.get');
  //     this.logger.info('getting...');

  //     const result = await this.eventService.get();
  //     this.logger.debug('response', result);

  //     return c.json(result);
  //   },
  // );
}
export const eventController = new EventController();
