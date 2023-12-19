import { Test, TestingModule } from '@nestjs/testing';
import { LessonService } from './lesson.service';
import { ICourseRepository } from '../repositories/course/course.repository.interface';
import { IChapterRepository } from '../repositories/chapter/chapter.repository.interface';
import { ILessonGroupRepository } from '../repositories/lesson-group/lesson-group.repository.interface';
import { ILessonRepository } from '../repositories/lesson/lesson.repository.interface';
import { ILessonQuizRepository } from '../repositories/lesson-quiz/lesson-quiz.repository.interface';
import { IUserLessonRepository } from '../repositories/user-lesson/user-lesson.repository.interface';
import { IUserCourseRepository } from '../repositories/user-course/user-course.repository.interface';
import { Components } from '../utils/constants/enumerations';
import { MockCourseRepository } from '../../test/mocks/repositories/mock.course.repository';
import { MockChapterRepository } from '../../test/mocks/repositories/mock.chapter.repository';
import { MockLessonGroupRepository } from '../../test/mocks/repositories/mock.lesson-group.repository';
import { MockLessonRepository } from '../../test/mocks/repositories/mock.lesson.repository';
import { MockLessonQuizRepository } from '../../test/mocks/repositories/mock.lesson-quiz.repository';
import { MockUserLessonRepository } from '../../test/mocks/repositories/mock.user-lesson.repository';
import { MockUserCourseRepository } from '../../test/mocks/repositories/mock.user-course.repository';
import { ListCoursesQueryDto } from './dtos/list-courses-query.dto';
import { getRecords as getCourseRecords } from '../../test/mocks/fixtures/course.fixture';
import { CourseDto } from './dtos/course.dto';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from '../shared/shared.module';

describe('LessonService', () => {
  let service: LessonService;
  let courseRepository: ICourseRepository;
  let chapterRepository: IChapterRepository;
  let lessonGroupRepository: ILessonGroupRepository;
  let lessonRepository: ILessonRepository;
  let lessonQuizRepository: ILessonQuizRepository;
  let userLessonRepository: IUserLessonRepository;
  let userCourseRepository: IUserCourseRepository;
  let mockCreateQueryBuilder: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: ['test.env'],
        }),
        SharedModule,
      ],
      providers: [
        LessonService,
        {
          provide: Components.COURSE_REPOSITORY,
          useClass: MockCourseRepository,
        },
        {
          provide: Components.CHAPTER_REPOSITORY,
          useClass: MockChapterRepository,
        },
        {
          provide: Components.LESSON_GROUP_REPOSITORY,
          useClass: MockLessonGroupRepository,
        },
        {
          provide: Components.LESSON_REPOSITORY,
          useClass: MockLessonRepository,
        },
        {
          provide: Components.LESSON_QUIZ_REPOSITORY,
          useClass: MockLessonQuizRepository,
        },
        {
          provide: Components.USER_LESSON_REPOSITORY,
          useClass: MockUserLessonRepository,
        },
        {
          provide: Components.USER_COURSE_REPOSITORY,
          useClass: MockUserCourseRepository,
        },
      ],
    }).compile();

    service = module.get<LessonService>(LessonService);
    courseRepository = module.get(Components.COURSE_REPOSITORY);
    chapterRepository = module.get(Components.CHAPTER_REPOSITORY);
    lessonGroupRepository = module.get(Components.LESSON_GROUP_REPOSITORY);
    lessonRepository = module.get(Components.LESSON_REPOSITORY);
    lessonQuizRepository = module.get(Components.LESSON_QUIZ_REPOSITORY);
    userLessonRepository = module.get(Components.USER_LESSON_REPOSITORY);
    userCourseRepository = module.get(Components.USER_COURSE_REPOSITORY);
    mockCreateQueryBuilder = {
      select: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      take: jest.fn().mockReturnThis(),
      getManyAndCount: jest.fn().mockReturnThis(),
      leftJoinAndSelect: jest.fn().mockReturnThis(),
      addSelect: jest.fn().mockReturnThis(),
      groupBy: jest.fn().mockReturnThis(),
    };
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('listCourses', () => {
    const query = new ListCoursesQueryDto();
    query.page = 1;
    query.perPage = 10;

    it('should return a list of courses', async () => {
      // mock repository function response
      const stubbedCount = 2;
      const stubbedCourses = getCourseRecords(stubbedCount);
      jest
        .spyOn(courseRepository, 'createQueryBuilder')
        .mockReturnValue(mockCreateQueryBuilder as any);
      mockCreateQueryBuilder.getManyAndCount.mockResolvedValue([
        stubbedCourses,
        stubbedCount,
      ]);
      const response = await service.listAllCourses(query);
      expect(response).toBeDefined();
      expect(response.data).toHaveLength(stubbedCount);
      const expectedCourses = stubbedCourses.map((course) => {
        return new CourseDto(course);
      });
      expect(response.data).toEqual(expectedCourses);
      expect(response.perPage).toEqual(query.perPage);
      expect(response.page).toEqual(query.page || 1);
      expect(response.total).toEqual(stubbedCount);
      const limit = query.perPage || 10;
      const offset = query.page ? (query.page - 1) * limit : 0;
      // assert skip and take were called with the right values
      expect(mockCreateQueryBuilder.skip).toHaveBeenCalledWith(offset);
      expect(mockCreateQueryBuilder.take).toHaveBeenCalledWith(limit);
      // assert orderBy was called with the right values
      expect(mockCreateQueryBuilder.orderBy).toHaveBeenCalledWith(
        'course.createdAt',
        'DESC',
      );
    });
  });
});
