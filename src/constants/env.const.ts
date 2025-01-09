import { ValidatedENV } from 'src/validations';

export const ENV = {
  NODE_ENV: ValidatedENV.NODE_ENV,
  PORT: ValidatedENV.PORT,
  secret: {
    AT: ValidatedENV.AT_SECRET,
    RT: ValidatedENV.RT_SECRET,
  },
} as const;
