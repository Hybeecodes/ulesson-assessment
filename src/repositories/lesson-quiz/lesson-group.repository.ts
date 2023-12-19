import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { LessonQuiz } from '../../entities/lesson-quiz.entity';
import { ILessonQuizRepository } from './lesson-quiz.repository.interface';

@Injectable()
export class LessonQuizRepository
  extends Repository<LessonQuiz>
  implements ILessonQuizRepository
{
  constructor(private readonly dataSource: DataSource) {
    super(LessonQuiz, dataSource.createEntityManager());
  }
}
