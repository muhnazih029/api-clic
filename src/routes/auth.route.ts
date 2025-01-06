import { authController } from 'src/controllers';
import { Hono } from 'hono';

export const authRoute = new Hono();

authRoute.post('/register', async (c) => await authController.register(c));
