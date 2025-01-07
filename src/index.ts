import { Hono } from 'hono';
import { authRoute } from 'src/routes';
import { errorMiddleware } from './middlewares';
// import { json } from 'hono/';

const app = new Hono();

// app.use('/*', json());

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

app.route('/api/auth', authRoute);

app.onError(errorMiddleware);

export default app;
