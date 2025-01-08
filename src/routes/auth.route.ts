import { Hono } from 'hono';

import { PATH } from 'src/constants';
import { authController } from 'src/controllers';
import { accessMidleware, refreshMidleware } from 'src/middlewares';

export const authRoute = new Hono()
  .post(PATH.REGISER, ...authController.register)
  .post(PATH.LOGIN, ...authController.login)
  .get(PATH.REFRESH, refreshMidleware, ...authController.refresh)
  .delete(PATH.LOGOUT, accessMidleware, ...authController.logout);
