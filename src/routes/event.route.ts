import { Hono } from 'hono';

import { PATH } from 'src/constants';
import { eventController } from '~/event/controller';
import { accessMidleware } from '~/middlewares';
// import { accessMidleware, refreshMidleware } from 'src/middlewares';

export const eventRoute = new Hono().post(
  PATH.CREATE,
  accessMidleware,
  ...eventController.create,
);
// .get(PATH.GET_EVENT, ...eventController.get);
