import { TPath } from 'src/constants';
import { authService, type AuthService } from 'src/services';
import { RegisterRequest } from 'src/models';
import { logger, type LoggerProvider } from 'src/providers';
import { TAuthorizeContext, TCustomContext } from 'src/types';
// import { hideZodErrorDataMiddleware } from 'src/middlewares';
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
    this.logger.info('request', data);

    const result = await this.authService.register(data);
    this.logger.info('response', result);

    return c.json(result, 201);
  }

  async login(c: TCustomContext<TPath['AUTH']['LOGIN']>) {
    try {
      const data = await c.req.json();

      this.logger.setLocation('auth.controller.login');
      this.logger.info('request ', data);

      const result = await this.authService.login(data);

      this.logger.info('response', result);

      console.log('🚀 ~ AuthController ~ login ~ logger:');
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
    this.logger.info('request', { id, token });

    const result = await this.authService.refresh(id, token);

    this.logger.info('response', result);

    return c.json(result, 200);
  }
}

export const authController = new AuthController();
