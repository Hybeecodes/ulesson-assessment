import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserCourse } from '../../../src/entities/user-course.entity';
import { IUserCourseRepository } from '../../../src/repositories/user-course/user-course.repository.interface';

@Injectable()
export class MockUserCourseRepository
  extends Repository<UserCourse>
  implements IUserCourseRepository
{
  enrollCourse(userId: string, courseId: string): Promise<UserCourse> {
    return Promise.resolve(undefined);
  }
}
