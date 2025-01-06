import { Prisma, PrismaClient } from '@prisma/client';
import { logger, LoggerProvider } from './logger.provider';

export class PrismaProvider extends PrismaClient<
  Prisma.PrismaClientOptions,
  string
> {
  private logger: LoggerProvider;
  constructor() {
    super({
      log: [
        {
          emit: 'event',
          level: 'info',
        },
        {
          emit: 'event',
          level: 'warn',
        },
        {
          emit: 'event',
          level: 'error',
        },
        {
          emit: 'event',
          level: 'query',
        },
      ],
    });
    this.logger = logger;
    this.logger.setLocation('prisma.provider');
    this.$on('info', (e) => {
      this.logger.info('prisma info', e);
    });
    this.$on('warn', (e) => {
      this.logger.warn('prisma warn', e);
    });
    this.$on('error', (e) => {
      this.logger.error('prisma error', e);
    });
    this.$on('query', (e) => {
      this.logger.info('prisma query', e);
    });
  }
}

export const prisma = new PrismaProvider();
