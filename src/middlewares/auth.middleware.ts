import { createFactory } from 'hono/factory';
import { HTTPException } from 'hono/http-exception';

import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

import { ENV } from 'src/constants';
import { logger, prisma } from 'src/providers';
import { AuthService } from 'src/services';
import { TEnv, TPayload } from 'src/types';

const userExist = async (id: string) => {
  const userCount = await prisma.user.count({
    where: {
      id,
    },
  });
  if (userCount === 0) {
    throw new HTTPException(404, { message: 'The Credential is invalid' });
  }
};

const factory = createFactory<TEnv>();

export const accessMidleware = factory.createMiddleware(async (c, next) => {
  try {
    logger.setLocation('auth.middleware.access');
    const header = c.req.header('Authorization');
    const token = header ? header.split(' ')[1] : '';
    logger.debug('token', token);

    logger.debug('AT', ENV.secret.AT);
    const payload = AuthService.verifyJWT(token, ENV.secret.AT) as TPayload;
    logger.debug('token', payload);

    userExist(payload.id);

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
    logger.debug('token', token);

    logger.debug('RT', ENV.secret.RT);
    const payload = AuthService.verifyJWT(token, ENV.secret.RT) as TPayload;
    logger.debug('token', payload);

    userExist(payload.id);

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
