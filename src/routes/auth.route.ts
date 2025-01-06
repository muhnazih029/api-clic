import { Hono } from 'hono';
import { authController } from 'src/controllers';
import { PATH } from 'src/constants';

export const authRoute = new Hono();

authRoute.post(
  PATH.AUTH.REGISER,
  async (c) => await authController.register(c),
);
