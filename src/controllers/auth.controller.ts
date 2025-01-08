import { TPath } from 'src/constants';
import { authService, type AuthService } from 'src/services';
import { RegisterRequest } from 'src/models';
import { logger, type LoggerProvider } from 'src/providers';
import { TAuthorizeContext, TCustomContext } from 'src/types';
import { ZodError } from 'zod';
import { HTTPException } from 'hono/http-exception';

export class AuthController {
  private authService: AuthService;
  private logger: LoggerProvider;

  constructor() {
    this.authService = authService;
    this.logger = logger;
    this.logger.setLocation('auth.controller');
  }

  async register(c: TCustomContext<TPath['AUTH']['REGISER']>) {
    const data: RegisterRequest = await c.req.json();

    this.logger.setLocation('auth.controller.register');
    this.logger.info('registering...');
    this.logger.debug('request', data);

    const result = await this.authService.register(data);
    this.logger.debug('response', result);

    return c.json(result, 201);
  }

  async login(c: TCustomContext<TPath['AUTH']['LOGIN']>) {
    try {
      const data = await c.req.json();

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
  }

  async refresh(c: TAuthorizeContext<TPath['AUTH']['REFRESH']>) {
    const { id, token } = c.get('user');

    this.logger.setLocation('auth.controller.refresh');
    this.logger.info(`generating... ${id}`);
    this.logger.debug('request', { id, token });

    const result = await this.authService.refresh(id, token);

    this.logger.debug('response', result);

    return c.json(result, 200);
  }

  async logout(c: TAuthorizeContext<''>) {
    //buat logout dia ga punya tambahan url
    const { id } = c.get('user');

    this.logger.setLocation('auth.controller.logout');
    this.logger.info(`logouting... ${id}`);
    this.logger.debug('request', { id });

    const result = await this.authService.logout(id);

    this.logger.debug('response', result);

    return c.json(result, 200);
  }
}

export const authController = new AuthController();
