import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IS_PUBLIC_KEY } from '../meta/skip-auth';
import { Reflector } from '@nestjs/core';
import { Logger, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class UserAuthGuard implements CanActivate {
  private readonly logger = new Logger(UserAuthGuard.name);
  constructor(
    private readonly jwtService: JwtService,
    private reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    request.user = await this.validateRequest(request);
    return true;
  }

  async validateRequest(request: {
    headers: { authorization: string };
  }): Promise<any> {
    const { authorization } = request.headers;
    console.log('authorization', authorization);
    if (!authorization) {
      throw new UnauthorizedException('No Authorization Token');
    }
    const authArr = authorization.split(' ');
    if (authArr[0] !== 'Bearer') {
      throw new UnauthorizedException('Invalid Authorization Token');
    }
    const token = authArr[1];
    try {
      const { id: userId } = this.jwtService.decode(token) as { id: string };
      console.log('userId', userId);
      const user = null;
      if (!user) {
        throw new UnauthorizedException('Invalid Authorization Token');
      }
      return user;
    } catch (error) {
      this.logger.error(`Validate Request Failed: ${JSON.stringify(error)}`);
      throw new HttpException(
        'Invalid Authorization Token',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
