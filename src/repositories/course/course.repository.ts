import { DataSource, Repository } from 'typeorm';
import { ICourseRepository } from './course.repository.interface';
import { Course } from '../../entities/course.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CourseRepository
  extends Repository<Course>
  implements ICourseRepository
{
  constructor(private readonly dataSource: DataSource) {
    super(Course, dataSource.createEntityManager());
  }
  findCourseById(lessonId: string): Promise<Course> {
    throw new Error('Method not implemented.');
  }
  createCourse(lesson: Partial<Course>): Promise<Course> {
    throw new Error('Method not implemented.');
  }
}
