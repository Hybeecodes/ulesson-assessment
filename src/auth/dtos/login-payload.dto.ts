import { IsDefined, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginPayloadDto {
  @IsDefined()
  @IsEmail()
  email: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  password: string;
}
