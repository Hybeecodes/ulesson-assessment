import { Repository } from 'typeorm';
import { QuizQuestion } from '../../entities/quiz-question.entity';

export type IQuizQuestionRepository = Repository<QuizQuestion>;
