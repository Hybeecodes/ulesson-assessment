import { DataSource, Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { IUserRepository } from './user.repository.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository
  extends Repository<User>
  implements IUserRepository
{
  constructor(private readonly dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }
  async findUserById(userId: number): Promise<User> {
    return this.createQueryBuilder('user')
      .where('user.id = :userId', { userId })
      .andWhere('user.deletedAt IS NULL')
      .getOne();
  }

  async findUserByEmail(email: string): Promise<User> {
    return this.createQueryBuilder('user')
      .where('user.email = :email', { email })
      .andWhere('user.deletedAt IS NULL')
      .getOne();
  }

  async createUser(user: Partial<User>): Promise<User> {
    const newUser = this.create(user);
    return await this.save(newUser);
  }
}
