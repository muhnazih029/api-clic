import { authService, type AuthService } from 'src/services';
import { Context } from 'hono';
import { RegisterRequest } from 'src/models';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = authService;
  }

  async register(c: Context) {
    const data: RegisterRequest = await c.req.json();

    const result = await this.authService.register(data);

    return c.json(result, 201);
  }
}

export const authController = new AuthController();
