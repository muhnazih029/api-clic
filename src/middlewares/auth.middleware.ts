import { createFactory } from 'hono/factory';
import { HTTPException } from 'hono/http-exception';
import { JsonWebTokenError, TokenExpiredError, verify } from 'jsonwebtoken';
import { ENV } from 'src/constants';
import { logger } from 'src/providers';
import { TPayload } from 'src/types';

const factory = createFactory();
export const accessMidleware = factory.createMiddleware(async (c, next) => {
  try {
    logger.setLocation('auth.middleware.access');
    const header = c.req.header('Authorization');
    const token = header ? header.split(' ')[1] : '';
    logger.info('token', token);

    logger.info('AT', ENV.secret.AT);
    const payload = verify(token, ENV.secret.AT) as TPayload;
    logger.info('token', payload);

    c.set('user', { token, ...payload });

    await next();
  } catch (err) {
    if (err instanceof TokenExpiredError || err instanceof JsonWebTokenError) {
      throw new HTTPException(401, {
        message: 'The credential is invalid',
        cause: err.name,
      });
    } else {
      throw err;
    }
  }
});

export const refreshMidleware = factory.createMiddleware(async (c, next) => {
  try {
    logger.setLocation('auth.middleware.refresh');
    const header = c.req.header('Authorization');
    const token = header ? header.split(' ')[1] : '';
    logger.info('token', token);

    logger.info('RT', ENV.secret.RT);
    const payload = verify(token, ENV.secret.RT) as TPayload;
    logger.info('token', payload);

    c.set('user', { token, ...payload });

    await next();
  } catch (err) {
    if (err instanceof TokenExpiredError || err instanceof JsonWebTokenError) {
      throw new HTTPException(401, {
        message: 'The credential is invalid',
        cause: err.name,
      });
    } else {
      throw err;
    }
  }
});
