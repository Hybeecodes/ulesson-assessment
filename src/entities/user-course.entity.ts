import { BaseEntity } from './base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Course } from './course.entity';

@Entity()
export class UserCourse extends BaseEntity {
  @ManyToOne(() => User, (user) => user.courses)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'user_id' })
  userId: string;

  @ManyToOne(() => Course)
  course: Course;

  @Column({ name: 'course_id' })
  courseId: string;
}
