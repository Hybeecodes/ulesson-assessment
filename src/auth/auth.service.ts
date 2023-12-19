import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger, UnauthorizedException
} from "@nestjs/common";
import { LoginPayloadDto } from './dtos/login-payload.dto';
import { UserDto } from '../entities/user.entity';
import { Components } from '../utils/constants/enumerations';
import { IUserRepository } from '../repositories/user/user.repository.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    @Inject(Components.USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async login(
    input: LoginPayloadDto,
  ): Promise<{ user: UserDto; token: string; tokenExpiry: Date }> {
    const { email, password } = input;
    const user = await this.userRepository.findUserByEmail(email);
    if (!user || !user.isPasswordValid(password)) {
      throw new UnauthorizedException('Invalid email or password');
    }
    try {
      const token = this.jwtService.sign({ email: user.email });
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);
      // TODO:: update user last login
      return {
        user: user.toResponseObject(),
        token,
        tokenExpiry: expiryDate,
      };
    } catch (e) {
      this.logger.error(`Login Failed: ${JSON.stringify(e.message)}`);
      throw new InternalServerErrorException('Login Failed');
    }
  }
}
