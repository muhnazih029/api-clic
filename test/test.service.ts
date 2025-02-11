import { User } from '@prisma/client';
import { sign } from 'jsonwebtoken';
import { ENV } from '~/constants';
import { prisma } from '~/common/providers';
import { TPayload } from '~/types';

export class TestService {
  static async deleteAll() {
    await this.deleteEvent();
    await this.deleteUser();
  }
  // User
  static async getUser(): Promise<User> {
    return await prisma.user.findUnique({
      where: {
        nim: '12345',
      },
    });
  }
  static async deleteUser(): Promise<void> {
    await prisma.profile.deleteMany({
      where: {
        user: {
          OR: [
            {
              nim: '12345',
            },
            {
              username: 'test',
            },
          ],
        },
      },
    });
    await prisma.user.deleteMany({
      where: {
        OR: [
          {
            nim: '12345',
          },
          {
            username: 'test',
          },
        ],
      },
    });
  }
  static async createUser(identifier: 'nim' | 'username') {
    await prisma.user.create({
      data: {
        nim: identifier === 'nim' ? '12345' : '54231',
        username: identifier === 'username' ? 'test' : 'tessss',
        password: await this.hash('test'),
      },
    });
  }

  static async getRefreshToken() {
    const user = await this.getUser();

    const token = this.generateJWT(
      { id: user.id, nim: user.nim, role: user.role as 'admin' | 'user' },
      'RT',
    );

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        refresh: await this.hash(token),
      },
    });

    return token;
  }
  // await this.hash(this.generateJWT({id}, 'RT')),

  static hash(data: string) {
    return Bun.password.hash(data, 'bcrypt');
  }

  static generateJWT(data: TPayload, schema: 'AT' | 'RT') {
    return sign(data, ENV.secret[schema], {
      expiresIn: schema === 'AT' ? '15m' : '7 days',
    });
  }

  // Event
  static async deleteEvent(): Promise<void> {
    await prisma.event.deleteMany({
      where: {
        creator: {
          OR: [
            {
              nim: '12345',
            },
            {
              username: 'test',
            },
          ],
        },
      },
    });
  }
}
