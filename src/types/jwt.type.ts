import { JwtPayload } from 'jsonwebtoken';

export interface TPayload extends JwtPayload {
  id: string;
  nim: string;
  role: 'admin' | 'user';
}
