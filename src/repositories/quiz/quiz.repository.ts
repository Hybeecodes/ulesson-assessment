import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Quiz } from '../../entities/quiz.entity';
import { IQuizRepository } from './quiz.repository.interface';

@Injectable()
export class QuizRepository
  extends Repository<Quiz>
  implements IQuizRepository
{
  constructor(private readonly dataSource: DataSource) {
    super(Quiz, dataSource.createEntityManager());
  }
}
