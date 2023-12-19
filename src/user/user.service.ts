import { Inject, Injectable, Logger } from '@nestjs/common';
import { Components } from '../utils/constants/enumerations';
import { IUserRepository } from '../repositories/user/user.repository.interface';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @Inject(Components.USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  async getUserById(id: string): Promise<User> {
    return await this.userRepository.findUserById(id);
  }
}
