import { Repository } from 'typeorm';
import { QuizResponse } from '../../entities/quiz-response';

export type IQuizResponseRepository = Repository<QuizResponse>;
