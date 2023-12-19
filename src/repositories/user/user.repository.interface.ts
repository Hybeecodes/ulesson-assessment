import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';

export interface IUserRepository extends Repository<User> {
  findUserById(userId: string): Promise<User>;
  findUserByEmail(email: string): Promise<User>;
  createUser(user: Partial<User>): Promise<User>;
}
