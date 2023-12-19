import { IUserRepository } from '../../../src/repositories/user/user.repository.interface';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../../../src/entities/user.entity';

@Injectable()
export class MockUserRepository
  extends Repository<User>
  implements IUserRepository
{
  createUser(user: Partial<User>): Promise<User> {
    return Promise.resolve(undefined);
  }

  findUserByEmail(email: string): Promise<User> {
    return Promise.resolve(undefined);
  }

  findUserById(userId: number): Promise<User> {
    return Promise.resolve(undefined);
  }
}
