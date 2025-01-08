import { logger } from 'src/providers';

export const customLogger = (message: string, ...rest: string[]) => {
  logger.setLocation('log.middleware');
  logger.info(message, ...rest);
};
