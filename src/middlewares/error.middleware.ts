import { ErrorHandler } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { logger } from 'src/providers';
import { ZodError } from 'zod';

export const errorMiddleware: ErrorHandler = (err, c) => {
  const status = err instanceof HTTPException ? err.status : 500;
  logger.error(
    `[${c.req.method}] ${c.req.path} >> StatusCode:: ${status}, Message:: ${err.message}`,
    err,
  );
  if (err instanceof HTTPException) {
    return c.json(
      {
        errors: true,
        message: err.message,
      },
      status,
    );
  } else if (err instanceof ZodError) {
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
};
