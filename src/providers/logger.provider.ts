import { createLogger, format, type Logger, transports } from 'winston';
import { type ConsoleTransportOptions } from 'winston/lib/winston/transports';
import { ENV } from 'src/constants';

// import { environment } from '../../shared/constants';

export class LoggerProvider {
  private location: string;
  private readonly logger: Logger;

  public setLocation(locationName: string) {
    this.location = locationName;
  }

  constructor() {
    const transportOptions: ConsoleTransportOptions = {};

    if (ENV.NODE_ENV === 'development') {
      transportOptions.format = format.combine(format.prettyPrint());
    } else {
      transportOptions.format = format.combine(
        format.errors({ stack: true }),
        format.json(),
      );
    }

    this.logger = createLogger({
      transports: [new transports.Console(transportOptions)],
    });
  }

  error<T>(message: string, meta?: T): Logger {
    const timestamp = new Date().toISOString();

    return this.logger.error({
      message,
      location: this.location,
      timestamp,
      meta,
    });
  }

  warn<T>(message: string, meta?: T): Logger {
    const timestamp = new Date().toISOString();

    return this.logger.warn({
      message,
      location: this.location,
      timestamp,
      meta,
    });
  }

  debug<T>(message: string, meta?: T): Logger {
    const timestamp = new Date().toISOString();

    return this.logger.debug({
      message,
      location: this.location,
      timestamp,
      meta,
    });
  }

  verbose<T>(message: string, meta?: T): Logger {
    const timestamp = new Date().toISOString();

    return this.logger.verbose({
      message,
      location: this.location,
      timestamp,
      meta,
    });
  }

  info<T>(message: string, meta?: T): Logger {
    const timestamp = new Date().toISOString();

    return this.logger.info({
      message,
      location: this.location,
      timestamp,
      meta,
    });
  }
}

export const logger = new LoggerProvider();
