import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserLesson } from '../../../src/entities/user-lesson.entity';
import { IUserLessonRepository } from '../../../src/repositories/user-lesson/user-lesson.repository.interface';

@Injectable()
export class MockUserLessonRepository
  extends Repository<UserLesson>
  implements IUserLessonRepository {}
