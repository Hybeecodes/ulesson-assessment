import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Course } from '../../../src/entities/course.entity';
import { ICourseRepository } from '../../../src/repositories/course/course.repository.interface';

@Injectable()
export class MockCourseRepository
  extends Repository<Course>
  implements ICourseRepository
{
  createCourse(lesson: Partial<Course>): Promise<Course> {
    return Promise.resolve(undefined);
  }

  findCourseById(lessonId: string): Promise<Course> {
    return Promise.resolve(undefined);
  }
}
