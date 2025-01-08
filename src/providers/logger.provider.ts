import { createLogger, format, type Logger, transports } from 'winston';
import { type ConsoleTransportOptions } from 'winston/lib/winston/transports';
import { ENV } from 'src/constants';

// import { environment } from '../../shared/constants';

type TMessage = {
  text: string;
  location: string;
  timestamp: string;
  meta: object;
};

type TInfo = {
  level: string;
  message: TMessage;
};

export class LoggerProvider {
  private location: string;
  private readonly logger: Logger;

  public setLocation(locationName: string) {
    this.location = locationName;
  }

  constructor() {
    const transportOptions: ConsoleTransportOptions = {
      level: 'debug',
    };

    const { errors, json, combine, prettyPrint, colorize, printf } = format;

    if (ENV.NODE_ENV === 'development') {
      transportOptions.format = combine(
        colorize(),
        printf(({ level, message }: TInfo) => {
          return `[${level}]: (${message.timestamp}) ${message.text} (at ${message.location})`;
        }),
      );
    } else if (ENV.NODE_ENV === 'test') {
      transportOptions.format = combine(errors({ stack: true }), json());
    } else {
      transportOptions.format = combine(prettyPrint());
    }
    this.logger = createLogger({
      transports: [new transports.Console(transportOptions)],
    });
  }

  error<T>(message: string, meta?: T): Logger {
    return this.format<T>(message, meta, 'error');
  }

  warn<T>(message: string, meta?: T): Logger {
    return this.format<T>(message, meta, 'warn');
  }

  debug<T>(message: string, meta?: T): Logger {
    return this.format<T>(message, meta, 'debug');
  }

  verbose<T>(message: string, meta?: T): Logger {
    return this.format<T>(message, meta, 'verbose');
  }

  info<T>(message: string, meta?: T): Logger {
    return this.format<T>(message, meta, 'info');
  }

  private format<T>(text: string, meta: T, variant: string): Logger {
    const timestamp = new Date().toISOString();

    return this.logger[variant]({
      text,
      location: this.location,
      timestamp,
      meta,
    });
  }
}

export const logger = new LoggerProvider();
