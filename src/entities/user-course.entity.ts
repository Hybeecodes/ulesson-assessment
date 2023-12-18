import { BaseEntity } from './base.entity';
import { Entity, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Course } from './course.entity';

@Entity()
export class UserCourse extends BaseEntity {
  @ManyToOne(() => User, (user) => user.courses)
  user: User;

  @ManyToOne(() => Course)
  course: Course;
}
