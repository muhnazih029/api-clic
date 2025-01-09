import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { serveStatic } from 'hono/bun';

import { authRoute } from 'src/routes';
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
  .onError(errorMiddleware)
  .notFound(notFoundMiddleware)
  .get('/doc/openapi.json', serveStatic({ path: './doc/openapi.json' }))
  .get(
    '/docs',
    apiReference({
      spec: {
        url: '/doc/openapi.json',
      },
      theme: 'moon',
      pageTitle: 'CLIC API >> Auth',
      // showSidebar: false,
      hideDownloadButton: true,
    }),
  )
  .get('/', (c) => c.text('Hello Hono!'));

export default app;
