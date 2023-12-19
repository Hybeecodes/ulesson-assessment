import { DataSource, Repository } from 'typeorm';
import { LessonGroup } from '../../entities/lesson-group.entity';
import { Lesson } from '../../entities/lesson.entity';
import { Injectable } from '@nestjs/common';
import { ILessonRepository } from './lesson.repository.interface';

@Injectable()
export class LessonRepository
  extends Repository<Lesson>
  implements ILessonRepository
{
  constructor(private readonly dataSource: DataSource) {
    super(LessonGroup, dataSource.createEntityManager());
  }
}
