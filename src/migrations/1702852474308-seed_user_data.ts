import { MigrationInterface, QueryRunner } from 'typeorm';
import { faker } from '@faker-js/faker';
import { User } from '../entities/user.entity';
import { hashPassword } from "../utils/helpers";

export class SeedUserData1702852474308 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // seed 10 users using faker
    const users: Partial<User>[] = [];
    const staticPasword = 'password';
    for (let i = 0; i < 10; i++) {
      users.push({
        name: faker.name.fullName(),
        email: faker.internet.email(),
        password: hashPassword(staticPasword),
      });
    }
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into(User)
      .values(users)
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // delete all users
    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from(User)
      .execute();
  }
}
