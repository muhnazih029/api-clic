import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { authRoute } from 'src/routes';
import { ZodError } from 'zod';

const app = new Hono();

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

app.route('/api/auth', authRoute);

app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return c.json(
      {
        errors: true,
        message: err.message,
      },
      400,
    );
  }
  if (err instanceof ZodError) {
    return c.json(
      {
        errors: true,
        message: 'Validation error',
        data: err.errors,
      },
      400,
    );
  }
  return c.json(
    {
      errors: true,
      message: 'Something went wrong. Call developer',
    },
    500,
  );
});

export default app;
