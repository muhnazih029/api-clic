export const ENV = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: +(process.env.PORT || 3000),
  secret: {
    AT: process.env.AT_SECRET,
    RT: process.env.RT_SECRET,
  },
} as const;
