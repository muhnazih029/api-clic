export const PATH = {
  REGISER: '/register',
  LOGIN: '/login',
  REFRESH: '/refresh',
  LOGOUT: '',
} as const;

export type TPath = typeof PATH;
