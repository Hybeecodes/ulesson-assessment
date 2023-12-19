import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { QuizResponse } from '../../entities/quiz-response';
import { IQuizResponseRepository } from "./quiz-response.repository.interface";

@Injectable()
export class QuizResponseRepository
  extends Repository<QuizResponse>
  implements IQuizResponseRepository
{
  constructor(private readonly dataSource: DataSource) {
    super(QuizResponse, dataSource.createEntityManager());
  }
}
