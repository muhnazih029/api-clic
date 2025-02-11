import { ErrorHandler, NotFoundHandler } from 'hono';
import { HTTPException } from 'hono/http-exception';

import { ZodError } from 'zod';

import { logger } from '~/common/providers';
import { WebResponse } from '~/common/models';

export const errorMiddleware: ErrorHandler = (err, c) => {
  let statusCode = err instanceof HTTPException ? err.status : 500;

  logger.setLocation('error.middleware');
  logger.error(
    `[${c.req.method}] ${c.req.path} >> StatusCode:: ${statusCode}, Message:: ${err.message}`,
    err,
  );

  const errorResponse: WebResponse<object> = {
    errors: true,
    message: err.message,
  };

  if (err instanceof ZodError) {
    errorResponse.message = 'Validation error';
    errorResponse.data = err.errors;
    statusCode = 400;
  } else if (statusCode === 500) {
    errorResponse.message = 'Something went wrong. Call developer';
  }

  logger.info('Handling Error...');

  return c.json(errorResponse, statusCode);
};

export const notFoundMiddleware: NotFoundHandler = (c) => {
  return c.json(
    {
      errors: true,
      message: 'Path Not Found',
    },
    404,
  );
};
