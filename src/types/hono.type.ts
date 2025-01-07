import { Context } from 'hono';
import { BlankEnv, BlankInput } from 'hono/types';
import { TPayload } from './jwt.type';

interface TUser extends TPayload {
  token: string;
}
type TEnv = {
  user: TUser;
};

export type TCustomContext<T extends string> = Context<BlankEnv, T, BlankInput>;
export type TAuthorizeContext<T extends string> = Context<
  { Variables: TEnv },
  T,
  BlankInput
>;
