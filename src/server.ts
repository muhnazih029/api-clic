import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { serveStatic } from 'hono/bun';

import { authRoute, eventRoute } from 'src/routes';
import {
  customLogger,
  errorMiddleware,
  notFoundMiddleware,
} from './middlewares';
import { apiReference } from '@scalar/hono-api-reference';

const app = new Hono({
  strict: false,
})
  .use(logger(customLogger))
  .route('/api/auth', authRoute)
  .route('/api/event', eventRoute)
  .onError(errorMiddleware)
  .notFound(notFoundMiddleware)
  .get(
    '/yaml',
    serveStatic({
      path: './open-api/openapi.yaml',
    }),
  )
  .get(
    '/docs',
    apiReference({
      spec: {
        url: '/yaml',
      },
      layout: 'classic',
      theme: 'deepSpace',
      pageTitle: 'CLIC API >> Auth',
      // showSidebar: false,
      hideDownloadButton: true,
      defaultHttpClient: {
        targetKey: 'js',
        clientKey: 'axios',
      },
    }),
  )
  .get('/', (c) => c.text('Hello Hono!'));

export default app;
