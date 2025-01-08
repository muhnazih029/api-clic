import { logger } from 'src/providers';

export const customLogger = (message: string, ...rest: string[]) => {
  logger.setLocation('log.middlewar');
  logger.info(message, ...rest);
};
