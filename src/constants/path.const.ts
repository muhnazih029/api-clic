export const PATH = {
  REGISER: '/register',
  LOGIN: '/login',
  REFRESH: '/refresh',
  LOGOUT: '',
  GET_EVENT: '',
  CREATE: '/create',
  UPDATE: '/update',
  DELETE: '/delete',
} as const;

export type TPath = typeof PATH;
