import { authService, type AuthService } from 'src/services';
import { Context } from 'hono';
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

  async register(c: Context) {
    const data: RegisterRequest = await c.req.json();

    const result = await this.authService.register(data);

    this.logger.info('register', result);

    return c.json(result, 201);
  }
}

export const authController = new AuthController();
