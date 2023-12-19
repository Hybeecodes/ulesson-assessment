import { DataSource, Repository } from 'typeorm';
import { LessonGroup } from '../../entities/lesson-group.entity';
import { ILessonGroupRepository } from './lesson-group.repository.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LessonGroupRepository
  extends Repository<LessonGroup>
  implements ILessonGroupRepository
{
  constructor(private readonly dataSource: DataSource) {
    super(LessonGroup, dataSource.createEntityManager());
  }
}
