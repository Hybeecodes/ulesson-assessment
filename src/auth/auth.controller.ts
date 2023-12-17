import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SkipAuth } from '../utils/meta/skip-auth';
import { LoginPayloadDto } from './dtos/login-payload.dto';
import { ServiceResponse } from '../utils/responses/service-response';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @SkipAuth()
  @Post('login')
  async login(@Body() payload: LoginPayloadDto): Promise<ServiceResponse> {
    const response = await this.authService.login(payload);
    return ServiceResponse.success('Login Successful', response);
  }
}
