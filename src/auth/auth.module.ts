import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Components } from '../utils/constants/enumerations';
import { UserRepository } from '../repositories/user/user.repository';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), SharedModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: Components.USER_REPOSITORY,
      useClass: UserRepository,
    },
  ],
})
export class AuthModule {}
