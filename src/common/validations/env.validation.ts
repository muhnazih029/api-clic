import { z } from 'zod';

const EnvSchema = z.object({
  NODE_ENV: z.string().default('development'),
  LOG_LEVEL: z
    .enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent'])
    .default('info'),
  DATABASE_URL: z.string(),
  AT_SECRET: z.string(),
  RT_SECRET: z.string(),
  PORT: z.coerce.number().default(3000),
});

export type TEnv = z.infer<typeof EnvSchema>;

const { data, error } = EnvSchema.safeParse(Bun.env);

if (error) {
  console.error('❌ Invalid Environment Variables');
  console.error(JSON.stringify(error.flatten().fieldErrors, null, 2));
  process.exit(1);
}

export const ValidatedENV = data;
