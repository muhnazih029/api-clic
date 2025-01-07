import { Hono } from 'hono';
import { PATH, TPath } from 'src/constants';
import { authController } from 'src/controllers';
import { refreshMidleware } from 'src/middlewares/auth.middleware';
import { TAuthorizeContext } from 'src/types';

export const authRoute = new Hono();

// new TestController(authRoute);

authRoute.post(
  PATH.AUTH.REGISER,
  async (c) => await authController.register(c),
);

authRoute.post(PATH.AUTH.LOGIN, async (c) => await authController.login(c));
authRoute.get(
  PATH.AUTH.REFRESH,
  refreshMidleware,
  async (c: TAuthorizeContext<TPath['AUTH']['REFRESH']>) =>
    await authController.refresh(c),
);
