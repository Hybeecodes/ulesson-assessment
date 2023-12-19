import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { IUserRepository } from '../repositories/user/user.repository.interface';
import { Components } from '../utils/constants/enumerations';
import { MockUserRepository } from '../../test/mocks/repositories/mock.user.repository';
import { SharedModule } from '../shared/shared.module';
import { LoginPayloadDto } from './dtos/login-payload.dto';
import { faker } from '@faker-js/faker';
import { UnauthorizedException } from '@nestjs/common';
import { getRecord as getUserRecord } from '../../test/mocks/fixtures/user';
import { ConfigModule } from '@nestjs/config';

describe('AuthService', () => {
  let service: AuthService;
  let userRepository: IUserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: ['test.env'],
        }),
        SharedModule,
      ],
      providers: [
        AuthService,
        {
          provide: Components.USER_REPOSITORY,
          useClass: MockUserRepository,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userRepository = module.get(Components.USER_REPOSITORY);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login', () => {
    it('should throw an unauthorized error if user is not found', async () => {
      const loginPayload = new LoginPayloadDto();
      loginPayload.email = faker.internet.email();
      loginPayload.password = faker.internet.password();
      // mock repository function response
      jest.spyOn(userRepository, 'findUserByEmail').mockResolvedValue(null);
      try {
        await service.login(loginPayload);
      } catch (e) {
        expect(e).toBeInstanceOf(UnauthorizedException);
        expect(e).toBeDefined();
        expect(e.message).toEqual('Invalid email or password');
      }
    });

    it('should throw an unauthorized error if password is invalid', async () => {
      const loginPayload = new LoginPayloadDto();
      loginPayload.email = faker.internet.email();
      loginPayload.password = faker.internet.password();
      // mock repository function response
      const stubbedUser = getUserRecord({ email: loginPayload.email });
      jest
        .spyOn(userRepository, 'findUserByEmail')
        .mockResolvedValue(stubbedUser);
      // mock user function response
      jest.spyOn(stubbedUser, 'isPasswordValid').mockReturnValue(false);
      try {
        await service.login(loginPayload);
      } catch (e) {
        expect(e).toBeInstanceOf(UnauthorizedException);
        expect(e).toBeDefined();
        expect(e.message).toEqual('Invalid email or password');
      }
    });

    it('should return a user object and token if login is successful', async () => {
      const loginPayload = new LoginPayloadDto();
      loginPayload.email = faker.internet.email();
      loginPayload.password = faker.internet.password();
      // mock repository function response
      const stubbedUser = getUserRecord({ email: loginPayload.email });
      jest
        .spyOn(userRepository, 'findUserByEmail')
        .mockResolvedValue(stubbedUser);
      // mock user function response
      jest.spyOn(stubbedUser, 'isPasswordValid').mockReturnValue(true);
      const response = await service.login(loginPayload);
      expect(response).toBeDefined();
      expect(response).toHaveProperty('user', stubbedUser.toResponseObject());
      expect(response).toHaveProperty('token');
      expect(response).toHaveProperty('tokenExpiry');
      expect(response.tokenExpiry).toBeInstanceOf(Date);
    });
  });
});
