import { createFactory } from 'hono/factory';
import { BlankEnv } from 'hono/types';
import { HTTPException } from 'hono/http-exception';

import { ZodError } from 'zod';

import { authService, type AuthService } from 'src/services';
import { LoginRequest, RegisterRequest } from 'src/models';
import { TPath } from 'src/constants';
import { logger, type LoggerProvider } from 'src/providers';
import { TEnv } from 'src/types';

export class AuthController {
  private authService: AuthService;
  private logger: LoggerProvider;

  constructor() {
    this.authService = authService;
    this.logger = logger;
    this.logger.setLocation('auth.controller');
  }

  register = createFactory<BlankEnv, TPath['REGISER']>().createHandlers(
    async (c) => {
      const data: RegisterRequest = await c.req.json();

      this.logger.setLocation('auth.controller.register');
      this.logger.info('registering...');
      this.logger.debug('request', data);

      const result = await this.authService.register(data);
      this.logger.debug('response', result);

      return c.json(result, 201);
    },
  );

  login = createFactory<BlankEnv, TPath['LOGIN']>().createHandlers(
    async (c) => {
      try {
        const data: LoginRequest = await c.req.json();

        this.logger.setLocation('auth.controller.login');
        this.logger.info('loggingin...');
        this.logger.debug('request ', data);

        const result = await this.authService.login(data);

        this.logger.debug('response', result);

        return c.json(result, 200);
      } catch (err) {
        if (err instanceof ZodError)
          throw new HTTPException(400, {
            message: 'Validation error',
          });

        throw err;
      }
    },
  );

  refresh = createFactory<TEnv, TPath['REFRESH']>().createHandlers(
    async (c) => {
      const { id, token } = c.get('user');

      this.logger.setLocation('auth.controller.refresh');
      this.logger.info(`generating... ${id}`);
      this.logger.debug('request', { id, token });

      const result = await this.authService.refresh(id, token);
      this.logger.debug('response', result);

      return c.json(result, 200);
    },
  );

  logout = createFactory<TEnv, TPath['LOGOUT']>().createHandlers(async (c) => {
    const { id } = c.get('user');

    this.logger.setLocation('auth.controller.logout');
    this.logger.info(`logouting... ${id}`);
    this.logger.debug('request', { id });

    const result = await this.authService.logout(id);

    this.logger.debug('response', result);

    return c.json(result, 200);
  });
}

export const authController = new AuthController();
