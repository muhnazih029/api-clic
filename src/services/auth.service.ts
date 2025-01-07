import { Prisma, jwt, password, HTTPException, User } from './libs.import';
import { logger, LoggerProvider } from 'src/providers';
import { prisma } from 'src/providers';
import {
  LoginRequest,
  RegisterRequest,
  SuccessResponse,
  WebResponse,
} from 'src/models';
import { validationService, ValidationService } from './validation.service';
import { AuthValidation } from 'src/validations';
import { TPayload } from 'src/types';
import { ENV } from 'src/constants';

export class AuthService {
  private userRepository: Prisma.UserDelegate;
  private profileRepository: Prisma.ProfileDelegate;
  private validationService: ValidationService;
  private logger: LoggerProvider;

  constructor() {
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
    this.logger.info('validatedData', validatedData);

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
    this.logger.info('validatedData', validatedData);

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

    this.logger.info('USER KDAGJKAGJKG', user);

    const success = await this.verify(validatedData.password, user.password);

    if (!success) {
      this.logger.info('success KDAGJKAGJKG', success);

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

  async authenticate(user: User): Promise<Record<string, string>> {
    const role = user.role.toLowerCase() as 'admin' | 'user';

    const payload = {
      id: user.id,
      nim: user.nim,
      role,
    };

    const at = this.signJWT(payload, ENV.secret.AT, '15m');
    const rt = this.signJWT(payload, ENV.secret.RT, '7 days');

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

  // logout(accessToken: string): WebResponse<boolean> {
  //   this.logger.info('logout');
  //   return null;
  // }

  hash(data: string): Promise<string> {
    return password.hash(data, 'bcrypt');
  }

  verify(data: string, hash: string): Promise<boolean> {
    return password.verify(data, hash, 'bcrypt');
  }

  signJWT(data: TPayload, secret: string, expiresIn: string): string {
    return jwt.sign(data, secret, {
      expiresIn,
    });
  }

  verifyJWT(data: string, secret: string): TPayload {
    return jwt.verify(data, secret) as TPayload;
  }
}

export const authService = new AuthService();
