import { User } from '../../../src/entities/user.entity';
import { faker } from '@faker-js/faker';
import { hashPassword } from '../../../src/utils/helpers';

export const getRecord = (overrides: Partial<User> = {}): User => {
  const user = new User();
  user.id = faker.string.uuid();
  user.email = faker.internet.email();
  user.password = hashPassword(faker.internet.password());
  user.name = faker.person.fullName();
  user.createdAt = new Date();
  user.updatedAt = new Date();
  user.deletedAt = null;
  if (overrides) {
    Object.assign(user, overrides);
  }
  return user;
};
