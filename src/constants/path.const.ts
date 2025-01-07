export const PATH = {
  AUTH: {
    REGISER: '/register',
    LOGIN: '/login',
  },
} as const;

export type TPath = typeof PATH;
