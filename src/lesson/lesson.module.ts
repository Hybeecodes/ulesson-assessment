import { Module } from '@nestjs/common';
import { LessonController } from './lesson.controller';
import { LessonService } from './lesson.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chapter } from '../entities/chapter.entity';
import { Course } from '../entities/course.entity';
import { LessonGroup } from '../entities/lesson-group.entity';
import { LessonQuiz } from '../entities/lesson-quiz.entity';
import { UserLesson } from '../entities/user-lesson.entity';
import { UserCourse } from '../entities/user-course.entity';
import { Components } from '../utils/constants/enumerations';
import { ChapterRepository } from '../repositories/chapter/chapter.repository';
import { CourseRepository } from '../repositories/course/course.repository';
import { LessonGroupRepository } from '../repositories/lesson-group/lesson-group.repository';
import { LessonRepository } from '../repositories/lesson/lesson.repository';
import { Lesson } from '../entities/lesson.entity';
import { LessonQuizRepository } from '../repositories/lesson-quiz/lesson-group.repository';
import { UserLessonRepository } from '../repositories/user-lesson/user-lesson.repository';
import { SharedModule } from '../shared/shared.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    SharedModule,
    UserModule,
    TypeOrmModule.forFeature([
      Chapter,
      Course,
      Lesson,
      LessonGroup,
      LessonQuiz,
      UserLesson,
      UserCourse,
    ]),
  ],
  controllers: [LessonController],
  providers: [
    LessonService,
    {
      provide: Components.CHAPTER_REPOSITORY,
      useClass: ChapterRepository,
    },
    {
      provide: Components.COURSE_REPOSITORY,
      useClass: CourseRepository,
    },
    {
      provide: Components.LESSON_GROUP_REPOSITORY,
      useClass: LessonGroupRepository,
    },
    {
      provide: Components.LESSON_REPOSITORY,
      useClass: LessonRepository,
    },
    {
      provide: Components.LESSON_QUIZ_REPOSITORY,
      useClass: LessonQuizRepository,
    },
    {
      provide: Components.USER_LESSON_REPOSITORY,
      useClass: UserLessonRepository,
    },
    {
      provide: Components.USER_COURSE_REPOSITORY,
      useClass: UserLessonRepository,
    },
  ],
})
export class LessonModule {}
