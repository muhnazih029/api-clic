import { Prisma } from '@prisma/client';
import { LoggerProvider } from 'src/providers';
import { ValidationService } from './validation.service';

export abstract class Service {
  protected logger: LoggerProvider;
  protected userRepository: Prisma.UserDelegate;
  protected profileRepository: Prisma.ProfileDelegate;
  protected eventRepository: Prisma.EventDelegate;
  protected threadRepository: Prisma.ThreadDelegate;
  protected commentRepository: Prisma.CommentDelegate;
  protected photoRepository: Prisma.PhotoDelegate;
  protected validationService: ValidationService;
}
