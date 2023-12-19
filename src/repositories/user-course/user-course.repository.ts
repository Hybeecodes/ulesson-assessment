import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { LessonQuiz } from '../../entities/lesson-quiz.entity';
import { UserCourse } from '../../entities/user-course.entity';
import { IUserCourseRepository } from './user-course.repository.interface';

@Injectable()
export class CourseRepository
  extends Repository<UserCourse>
  implements IUserCourseRepository
{
  constructor(private readonly dataSource: DataSource) {
    super(LessonQuiz, dataSource.createEntityManager());
  }

  async enrollCourse(userId: string, courseId: string): Promise<UserCourse> {
    const newUserCourse = this.create({
      userId,
      courseId,
    });
    return await this.save(newUserCourse);
  }
}
