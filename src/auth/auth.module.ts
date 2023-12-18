import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Components } from '../utils/constants/enumerations';
import { UserRepository } from '../repositories/user/user.repository';
import { SharedModule } from '../shared/shared.module';
import { Course } from '../entities/course.entity';
import { UserCourse } from '../entities/user-course.entity';
import { Chapter } from '../entities/chapter.entity';
import { LessonGroup } from '../entities/lesson-group.entity';
import { Lesson } from '../entities/lesson.entity';
import { LessonQuiz } from '../entities/lesson-quiz.entity';
import { Quiz } from '../entities/quiz.entity';
import { Note } from '../entities/note.entity';
import { QuizQuestion } from '../entities/quiz-question.entity';
import { QuizResponse } from '../entities/quiz-response';
import { UserLesson } from '../entities/user-lesson.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Course,
      UserCourse,
      Chapter,
      LessonGroup,
      Lesson,
      LessonQuiz,
      Quiz,
      Note,
      QuizQuestion,
      QuizResponse,
      UserLesson,
    ]),
    SharedModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: Components.USER_REPOSITORY,
      useClass: UserRepository,
    },
  ],
})
export class AuthModule {}
