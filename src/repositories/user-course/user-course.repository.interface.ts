import { Repository } from 'typeorm';
import { UserCourse } from '../../entities/user-course.entity';

export interface IUserCourseRepository extends Repository<UserCourse> {
  enrollCourse(userId: string, courseId: string): Promise<UserCourse>;
}
