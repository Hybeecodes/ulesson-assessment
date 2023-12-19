import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { IUserLessonRepository } from './user-lesson.repository.interface';
import { UserLesson } from '../../entities/user-lesson.entity';

@Injectable()
export class UserLessonRepository
  extends Repository<UserLesson>
  implements IUserLessonRepository
{
  constructor(private readonly dataSource: DataSource) {
    super(UserLesson, dataSource.createEntityManager());
  }
}
