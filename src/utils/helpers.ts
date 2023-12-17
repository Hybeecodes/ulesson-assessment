import * as Bcrypt from 'bcryptjs';
import * as randomString from 'randomstring';

export function hashPassword(password: string): string {
  const saltRounds = Bcrypt.genSaltSync(12);
  return Bcrypt.hashSync(password, saltRounds);
}

export function hashTransferPin(transferPin: string): string {
  const saltRounds = 8;
  return Bcrypt.hashSync(transferPin, saltRounds);
}

export function comparePassword(password: string, hash: string): boolean {
  return Bcrypt.compareSync(password, hash);
}

export function generateRandomString(length = 10): string {
  return randomString.generate(length);
}
