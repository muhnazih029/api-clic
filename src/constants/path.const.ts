export const PATH = {
  AUTH: {
    REGISER: '/register',
    LOGIN: '/login',
    REFRESH: '/refresh',
  },
} as const;

export type TPath = typeof PATH;
