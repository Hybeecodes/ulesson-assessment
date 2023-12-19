import { Repository } from 'typeorm';
import { Course } from '../../entities/course.entity';

export interface ICourseRepository extends Repository<Course> {
  findCourseById(lessonId: string): Promise<Course>;
  createCourse(lesson: Partial<Course>): Promise<Course>;
}
