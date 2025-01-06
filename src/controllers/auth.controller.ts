import { Context } from 'hono';
import { BlankEnv, BlankInput } from 'hono/types';
import { TPath } from 'src/constants';
import { authService, type AuthService } from 'src/services';
import { RegisterRequest } from 'src/models';
import { logger, type LoggerProvider } from 'src/providers';

export class AuthController {
  private authService: AuthService;
  private logger: LoggerProvider;

  constructor() {
    this.authService = authService;
    this.logger = logger;
    this.logger.setLocation('auth.controller');
  }

  async register(c: Context<BlankEnv, TPath['AUTH']['REGISER'], BlankInput>) {
    const data: RegisterRequest = await c.req.json();

    const result = await this.authService.register(data);

    this.logger.info('register', result);

    return c.json(result, 201);
  }
}

export const authController = new AuthController();
