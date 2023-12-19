import { Repository } from 'typeorm';
import { LessonQuiz } from '../../entities/lesson-quiz.entity';

export type ILessonQuizRepository = Repository<LessonQuiz>;
