import { Hono } from 'hono';
import { logger } from 'hono/logger';

import { authRoute } from 'src/routes';
import { customLogger, errorMiddleware } from './middlewares';
import { ENV } from './constants';

const app = new Hono()
  .use(logger(customLogger))
  .get('/', (c) => {
    return c.text('Hello Hono!');
  })
  .route('/api/auth', authRoute)
  .onError(errorMiddleware);

export default {
  fetch: app.fetch,
  port: ENV.PORT,
  ...app
};
