import { logger, LoggerProvider } from 'src/providers';
import { prisma } from 'src/providers';
import {
  // LoginRequest,
  RegisterRequest,
  SuccessResponse,
  WebResponse,
} from 'src/models';
import { validationService, ValidationService } from './validation.service';
import { AuthValidation } from 'src/validations';
import { payload } from 'src/types';
import { type Prisma, jwt, password } from './libs';
import { env } from 'src/constants';
import { HTTPException } from 'hono/http-exception';

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
  }

  async register(data: RegisterRequest): Promise<WebResponse<SuccessResponse>> {
    this.logger.info('register');

    const validatedData = this.validationService.validate<RegisterRequest>(
      AuthValidation.REGISTER,
      data,
    );

    let user = await this.userRepository.findFirst({
      where: {
        nim: validatedData.nim,
      },
    });

    user = await this.userRepository.findFirst({
      where: {
        username: validatedData.username,
      },
    });

    if (user)
      throw new HTTPException(400, {
        message: 'The credential is  already registered',
      });

    validatedData.password = await this.hash(validatedData.password);

    user = await this.userRepository.create({
      data: {
        nim: validatedData.nim,
        username: validatedData.username,
        password: validatedData.password,
      },
    });

    const profile = await this.profileRepository.create({
      data: {
        userId: user.id,
        fullname: validatedData.fullname,
      },
    });

    const payload: payload = {
      id: user.id,
      nim: user.nim,
      fullname: profile.fullname,
    };

    const at = this.signJWT(payload, env.secret.AT, '15m');
    const rt = this.signJWT(payload, env.secret.RT, '7 days');

    await this.userRepository.update({
      where: {
        id: user.id,
      },
      data: {
        refresh: await this.hash(rt),
        updatedAt: new Date(),
      },
    });

    return {
      message: 'created',
      data: {
        at,
        rt,
      },
    };
  }

  // login(data: LoginRequest): WebResponse<SuccessResponse> {
  //   this.logger.info('login');
  //   return null;
  // }

  // refresh(refreshToken: string): WebResponse<SuccessResponse> {
  //   this.logger.info('refresh');
  //   return null;
  // }

  // logout(accessToken: string): WebResponse<boolean> {
  //   this.logger.info('logout');
  //   return null;
  // }

  hash(data: string): Promise<string> {
    return password.hash(data, 'bcrypt');
  }

  verify(data: string, hash: string): Promise<boolean> {
    return password.verify(data, hash);
  }

  signJWT(data: payload, secret: string, expiresIn: string): string {
    return jwt.sign(data, secret, {
      expiresIn,
    });
  }

  verifyJWT(data: string, secret: string): payload {
    return jwt.verify(data, secret) as payload;
  }
}

export const authService = new AuthService();
