import { ZodType } from 'zod';

export class ValidationService {
  validate<T>(zodType: ZodType<T>, data: T): T {
    return zodType.parse(data);
  }
}

export const validationService = new ValidationService();
