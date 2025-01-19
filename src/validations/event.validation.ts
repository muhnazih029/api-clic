import { z, ZodType } from 'zod';

export class EventValidation {
  static CREATE: ZodType = z.object({
    title: z.string().min(1).max(100),
    description: z.string().min(1).max(255),
    date: z.string().min(1).max(255),
    image: z.string().optional(),
    userId: z.string(),
    location: z.string().min(1).max(255).optional(),
    locationUrl: z.string().min(1).max(255).optional(),
  });
}
