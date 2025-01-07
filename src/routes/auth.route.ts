import { Hono } from 'hono';
import { PATH } from 'src/constants';
import { authController } from 'src/controllers';

export const authRoute = new Hono();

// new TestController(authRoute);

authRoute.post(
  PATH.AUTH.REGISER,
  async (c) => await authController.register(c),
);

authRoute.post(PATH.AUTH.LOGIN, async (c) => await authController.login(c));
