import { HTTPException } from '~/common/libs';
import { logger, prisma } from '~/common/providers';
import { WebResponse } from '~/common/models';
import { Service, validationService } from '~/common/services';
import { EventValidation } from './validation';
import { CreateEventRequest, EventSuccessResponse } from './model';

export class EventService extends Service {
  constructor() {
    super();
    this.eventRepository = prisma.event;
    this.validationService = validationService;
    this.logger = logger;
    this.logger.setLocation('event.service');
  }

  async create(
    data: CreateEventRequest,
  ): Promise<WebResponse<EventSuccessResponse>> {
    const validatedData = this.validationService.validate<CreateEventRequest>(
      EventValidation.CREATE,
      data,
    );

    this.logger.setLocation('event.service.create');
    this.logger.debug('validatedData', validatedData);

    const event = await this.eventRepository.create({
      data: {
        title: validatedData.title,
        description: validatedData.description,
        date: validatedData.date,
        image: validatedData.image || null,
        userId: validatedData.userId,
        location: validatedData.location || null,
        locationUrl: validatedData.locationUrl || null,
      },
    });

    console.log('event', event);
    if (!event) {
      throw new HTTPException(500, {
        message: 'Failed to create event',
      });
    }

    return {
      message: 'Created',
      data: event,
    };
  }

  // async get(): Promise<WebResponse<EventSuccessResponse>> {
  //   this.logger.setLocation('event.service.get');
  //   this.logger.info('getting...');

  //   const events = await this.eventRepository.findMany({
  //     select: {
  //       id: true,
  //       title: true,
  //       description: true,
  //       date: true,
  //       image: true,
  //       location: true,
  //       locationUrl: true,
  //     },
  //   });

  //   if (!events) {
  //     throw new HTTPException(500, {
  //       message: 'Failed to get events',
  //     });
  //   }

  //   return {
  //     message: 'OK',
  //     // data: events,
  //   };
  // }
}

export const eventService = new EventService();
