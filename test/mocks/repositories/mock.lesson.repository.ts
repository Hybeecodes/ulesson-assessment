import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Lesson } from '../../../src/entities/lesson.entity';
import { ILessonRepository } from '../../../src/repositories/lesson/lesson.repository.interface';

@Injectable()
export class MockLessonRepository
  extends Repository<Lesson>
  implements ILessonRepository {}
