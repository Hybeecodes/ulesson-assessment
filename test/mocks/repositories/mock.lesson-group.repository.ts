import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { LessonGroup } from '../../../src/entities/lesson-group.entity';
import { ILessonGroupRepository } from '../../../src/repositories/lesson-group/lesson-group.repository.interface';

@Injectable()
export class MockLessonGroupRepository
  extends Repository<LessonGroup>
  implements ILessonGroupRepository {}
