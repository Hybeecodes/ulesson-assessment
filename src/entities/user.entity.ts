import { BaseEntity } from './base.entity';
import { BeforeInsert, Column, Entity, OneToMany } from 'typeorm';
import { comparePassword, hashPassword } from '../utils/helpers';
import { UserCourse } from './user-course.entity';
import { UserLesson } from './user-lesson.entity';

@Entity()
export class User extends BaseEntity {
  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  password: string;

  @OneToMany(() => UserCourse, (userCourse) => userCourse.user)
  courses: UserCourse[];

  @OneToMany(() => UserCourse, (userLesson) => userLesson.user)
  lessons: UserLesson[];

  @BeforeInsert()
  hashPassword() {
    this.password = hashPassword(this.password);
  }

  toResponseObject(): UserDto {
    const { id, name, email } = this;
    return { id, name, email };
  }

  isPasswordValid(password: string): boolean {
    return comparePassword(password, this.password);
  }
}

export interface UserDto {
  id: string;
  name: string;
  email: string;
}
