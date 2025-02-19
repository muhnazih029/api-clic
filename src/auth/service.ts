import { jwt, password, HTTPException, User } from '~/common/libs';
import { logger, prisma } from '~/common/providers';
import { WebResponse } from '~/common/models';
import { LoginRequest, RegisterRequest, SuccessResponse } from './model';
import { validationService } from '~/common/services/validation.service';
import { AuthValidation } from '~/common/validations';
import { TPayload } from '~/types';
import { ENV } from '~/constants';
import { Service } from '~/common/services/service';

export class AuthService extends Service {
  constructor() {
    super();
    this.userRepository = prisma.user;
    this.profileRepository = prisma.profile;
    this.validationService = validationService;
    this.logger = logger;
    this.logger.setLocation('auth.service');
  }

  async register(data: RegisterRequest): Promise<WebResponse<SuccessResponse>> {
    const validatedData = this.validationService.validate<RegisterRequest>(
      AuthValidation.REGISTER,
      data,
    );

    this.logger.setLocation('auth.service.register');
    this.logger.debug('validatedData', validatedData);

    const userByNim = await this.userRepository.findFirst({
      where: {
        nim: validatedData.nim,
      },
      select: {
        id: true,
      },
    });

    const userByUsername =
      validatedData.username &&
      (await this.userRepository.findFirst({
        where: {
          username: validatedData.username,
        },
        select: {
          id: true,
        },
      }));

    if (userByNim || userByUsername) {
      throw new HTTPException(400, {
        message: 'The credential is already registered',
      });
    }

    validatedData.password = await this.hash(validatedData.password);

    const user = await this.userRepository.create({
      data: {
        nim: validatedData.nim,
        username: validatedData.username ?? null,
        password: validatedData.password,
      },
    });

    await this.profileRepository.create({
      data: {
        userId: user.id,
        fullname: validatedData.fullname,
      },
    });

    const { at, rt } = await this.authenticate(user);

    return {
      message: 'created',
      data: {
        at,
        rt,
      },
    };
  }

  async login(data: LoginRequest): Promise<WebResponse<SuccessResponse>> {
    const validatedData = this.validationService.validate<LoginRequest>(
      AuthValidation.LOGIN,
      data,
    );

    this.logger.setLocation('auth.service.login');
    this.logger.debug('validatedData', validatedData);

    const user = await this.userRepository.findFirst({
      where: {
        OR: [
          { nim: validatedData.identifier },
          { username: validatedData.identifier },
        ],
      },
    });

    if (!user)
      throw new HTTPException(404, {
        message: 'The credential is not registered',
      });

    this.logger.debug('USER', user);

    const success = await this.verify(validatedData.password, user.password);

    if (!success) {
      this.logger.debug('success KDAGJKAGJKG', success);

      throw new HTTPException(401, {
        message: 'The credential is invalid',
      });
    }

    const { at, rt } = await this.authenticate(user);

    return {
      message: 'OK',
      data: {
        at,
        rt,
      },
    };
  }
  async refresh(
    userId: string,
    refreshToken: string,
  ): Promise<WebResponse<SuccessResponse>> {
    this.logger.setLocation('auth.service.refresh');

    const user = await this.userRepository.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user)
      throw new HTTPException(401, {
        message: 'The credential is invalid',
      });

    const success = await this.verify(refreshToken, user.refresh);

    if (!success)
      throw new HTTPException(401, { message: 'The credential is invalid' });

    const { at, rt } = await this.authenticate(user);

    return {
      message: 'OK',
      data: {
        at,
        rt,
      },
    };
  }

  async logout(userId: string): Promise<WebResponse<boolean>> {
    this.logger.setLocation('auth.service.logout');

    const user = await this.userRepository.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user)
      throw new HTTPException(401, {
        message: 'The credential is invalid',
      });

    await this.userRepository.update({
      where: {
        id: user.id,
      },
      data: {
        refresh: null,
        updatedAt: new Date(),
      },
    });

    return {
      message: 'OK',
      data: true,
    };
  }

  private async authenticate(user: User): Promise<Record<string, string>> {
    const role = user.role.toLowerCase() as 'admin' | 'user';

    const payload = {
      id: user.id,
      nim: user.nim,
      role,
    };

    const at = AuthService.signJWT(payload, ENV.secret.AT, '15m');
    const rt = AuthService.signJWT(payload, ENV.secret.RT, '7 days');

    await this.userRepository.update({
      where: {
        id: user.id,
      },
      data: {
        refresh: await this.hash(rt),
        updatedAt: new Date(),
      },
    });
    return { at, rt };
  }

  private hash(data: string): Promise<string> {
    return password.hash(data, 'bcrypt');
  }

  private verify(data: string, hash: string): Promise<boolean> {
    return password.verify(data, hash, 'bcrypt');
  }

  static signJWT(data: TPayload, secret: string, expiresIn: string): string {
    return jwt.sign(data, secret, {
      expiresIn,
    });
  }

  static verifyJWT(data: string, secret: string): TPayload {
    return jwt.verify(data, secret) as TPayload;
  }
}

export const authService = new AuthService();
