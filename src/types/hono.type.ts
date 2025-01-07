import { Context } from 'hono';
import { BlankEnv, BlankInput } from 'hono/types';

export type TCustomContext<T extends string> = Context<BlankEnv, T, BlankInput>;
