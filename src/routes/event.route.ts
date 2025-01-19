import { Hono } from 'hono';

import { PATH } from 'src/constants';
import { eventController } from 'src/controllers';
import { accessMidleware } from 'src/middlewares';
// import { accessMidleware, refreshMidleware } from 'src/middlewares';

export const eventRoute = new Hono()
  .post(PATH.CREATE, accessMidleware, ...eventController.create)
  .get(PATH.GET_EVENT, ...eventController.get);
