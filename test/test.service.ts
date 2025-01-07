import { User } from '@prisma/client';
import { prisma } from 'src/providers';

export class TestService {
  static async deleteAll() {
    await this.deleteUser();
  }
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
        password: await Bun.password.hash('test', 'bcrypt'),
      },
    });
  }
}
