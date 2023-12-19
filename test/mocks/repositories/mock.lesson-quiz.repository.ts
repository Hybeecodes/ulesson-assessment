import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { LessonQuiz } from '../../../src/entities/lesson-quiz.entity';
import { ILessonQuizRepository } from '../../../src/repositories/lesson-quiz/lesson-quiz.repository.interface';

@Injectable()
export class MockLessonQuizRepository
  extends Repository<LessonQuiz>
  implements ILessonQuizRepository {}
