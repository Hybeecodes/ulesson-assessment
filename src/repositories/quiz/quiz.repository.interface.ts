import { Repository } from 'typeorm';
import { Quiz } from '../../entities/quiz.entity';

export type IQuizRepository = Repository<Quiz>;
