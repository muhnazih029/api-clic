import { Env } from 'hono/types';

import { TPayload } from './jwt.type';

export interface TUser extends TPayload {
  token: string;
}

export interface TEnv extends Env {
  Variables: {
    user: TUser;
  };
}
