import { Course } from '../../entities/course.entity';

export class CourseDto {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  lessonsCount: number;

  constructor(course: Course) {
    this.id = course.id;
    this.title = course.title;
    this.description = course.description;
    this.imageUrl = course.imageUrl;
    this.lessonsCount = course.lessonsCount;
  }
}
