import { z, ZodType } from 'zod';

export class AuthValidation {
  static REGISTER: ZodType = z.object({
    nim: z.string().min(1).max(10),
    username: z.string().min(1).max(10).optional(),
    password: z.string().min(1).max(20),
    fullname: z.string().min(1).max(25),
  });

  static LOGIN: ZodType = z.object({
    identifier: z.string().min(1).max(10),
    password: z.string().min(1).max(20),
  });
}
