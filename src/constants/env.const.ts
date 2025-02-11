import { ValidatedENV } from '~/common/validations';

export const ENV = {
  NODE_ENV: ValidatedENV.NODE_ENV,
  LOG_LEVEL: ValidatedENV.LOG_LEVEL,
  PORT: ValidatedENV.PORT,
  secret: {
    AT: ValidatedENV.AT_SECRET,
    RT: ValidatedENV.RT_SECRET,
  },
} as const;
