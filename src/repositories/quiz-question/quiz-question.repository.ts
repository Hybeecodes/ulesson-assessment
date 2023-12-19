import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Quiz } from '../../entities/quiz.entity';
import { IQuizQuestionRepository } from './quiz-question.repository.interface';
import { QuizQuestion } from '../../entities/quiz-question.entity';

@Injectable()
export class QuizQuestionRepository
  extends Repository<QuizQuestion>
  implements IQuizQuestionRepository
{
  constructor(private readonly dataSource: DataSource) {
    super(Quiz, dataSource.createEntityManager());
  }
}
