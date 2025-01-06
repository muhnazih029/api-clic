import { Prisma, PrismaClient } from '@prisma/client';
import { logger } from './logger.provider';

export class PrismaProvider extends PrismaClient<
  Prisma.PrismaClientOptions,
  string
> {
  private logger = logger;
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
