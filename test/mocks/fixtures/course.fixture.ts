import { Course } from '../../../src/entities/course.entity';
import { faker } from '@faker-js/faker';

export const getRecord = (overrides?: Partial<Course>): Course => {
  const course = new Course();
  course.id = faker.string.uuid();
  course.title = faker.lorem.sentence();
  course.description = faker.lorem.paragraph();
  course.imageUrl = faker.image.url();
  course.lessonsCount = faker.number.int({ min: 1, max: 20 });
  course.createdAt = new Date();
  course.updatedAt = new Date();
  course.deletedAt = null;
  if (overrides) {
    Object.assign(course, overrides);
  }
  return course;
};

export const getRecords = (count: number): Course[] => {
  const records = [];
  for (let i = 0; i < count; i++) {
    records.push(getRecord());
  }
  return records;
};
