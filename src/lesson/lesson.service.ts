import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Components } from '../utils/constants/enumerations';
import { ICourseRepository } from '../repositories/course/course.repository.interface';
import { ILessonRepository } from '../repositories/lesson/lesson.repository.interface';
import { IUserCourseRepository } from '../repositories/user-course/user-course.repository.interface';
import { PaginatedData } from '../shared/paginated-data';
import { CourseDto } from './dtos/course.dto';
import { ListCoursesQueryDto } from './dtos/list-courses-query.dto';
import { ChapterDto } from './dtos/chapter.dto';
import { ListChaptersQueryDto } from './dtos/list-chapters-query.dto';
import { IChapterRepository } from '../repositories/chapter/chapter.repository.interface';
import { UserCourse } from '../entities/user-course.entity';

@Injectable()
export class LessonService {
  private readonly logger: Logger;

  constructor(
    @Inject(Components.COURSE_REPOSITORY)
    private readonly courseRepository: ICourseRepository,
    @Inject(Components.LESSON_REPOSITORY)
    private readonly lessonRepository: ILessonRepository,
    @Inject(Components.USER_COURSE_REPOSITORY)
    private readonly userCourseRepository: IUserCourseRepository,
    @Inject(Components.CHAPTER_REPOSITORY)
    private readonly chapterRepository: IChapterRepository,
  ) {
    this.logger = new Logger(this.constructor.name);
  }

  async listAllCourses(
    query: ListCoursesQueryDto,
  ): Promise<PaginatedData<CourseDto>> {
    // fetch all available courses with lessons count
    const { page, perPage } = query;
    const limit = perPage || 10;
    const offset = page ? (page - 1) * limit : 0;
    try {
      const [courses, count] = await this.courseRepository
        .createQueryBuilder('course')
        .leftJoinAndSelect('course.chapters', 'chapter')
        .leftJoinAndSelect('chapter.groups', 'group')
        .leftJoinAndSelect('group.lessons', 'lesson')
        .select('course', 'course')
        .addSelect('COUNT(lesson.id)', 'lessonsCount')
        .groupBy('course.id')
        .skip(offset)
        .take(limit)
        .orderBy('course.createdAt', 'DESC') // sort by latest
        .getManyAndCount();

      const paginatedData = new PaginatedData<CourseDto>();
      paginatedData.data = courses.map((course) => {
        return new CourseDto(course);
      });
      paginatedData.page = Number(page || 1);
      paginatedData.perPage = Number(limit);
      paginatedData.total = count;
      paginatedData.totalPages = Math.ceil(count / limit);
      return paginatedData;
    } catch (e) {
      this.logger.error(`Unable to fetch courses: ${e.message}`);
      throw new InternalServerErrorException('Unable to fetch courses');
    }
  }

  async listEnrolledCourses(
    userId: string,
    query: ListCoursesQueryDto,
  ): Promise<PaginatedData<CourseDto>> {
    // fetch enrolled courses with lessons count
    const { page, perPage } = query;
    const limit = perPage || 10;
    const offset = page ? (page - 1) * limit : 0;
    try {
      const [courses, count] = await this.courseRepository
        .createQueryBuilder('course')
        .leftJoinAndSelect('course.chapters', 'chapter')
        .leftJoinAndSelect('chapter.groups', 'group')
        .leftJoinAndSelect('group.lessons', 'lesson')
        .leftJoinAndSelect(
          UserCourse,
          'enrollment',
          'enrollment.courseId = course.id AND enrollment.userId = :userId',
          { userId },
        )
        .select('course', 'course')
        .addSelect('COUNT(lesson.id)', 'lessonsCount')
        .where('enrolledUser.id = :userId', { userId })
        .groupBy('course.id')
        .skip(offset)
        .take(limit)
        .orderBy('course.createdAt', 'DESC') // sort by latest
        .getManyAndCount();

      const paginatedData = new PaginatedData<CourseDto>();
      paginatedData.data = courses.map((course) => {
        return new CourseDto(course);
      });
      paginatedData.page = Number(page || 1);
      paginatedData.perPage = Number(limit);
      paginatedData.total = count;
      paginatedData.totalPages = Math.ceil(count / limit);
      return paginatedData;
    } catch (e) {
      this.logger.error(`Unable to fetch courses: ${e.message}`);
      throw new InternalServerErrorException(
        'Unable to fetch enrolled courses',
      );
    }
  }

  async listCourseChapter(
    courseId: string,
    query: ListChaptersQueryDto,
  ): Promise<PaginatedData<ChapterDto>> {
    const { page, perPage } = query;
    const limit = perPage || 10;
    const offset = page ? (page - 1) * limit : 0;
    try {
      const [chapters, count] = await this.chapterRepository
        .createQueryBuilder('chapter')
        .leftJoinAndSelect('chapter.lesson', 'lesson')
        .addSelect('COUNT(lesson.id)', 'lessonsCount')
        .where('course.id = :courseId', { courseId })
        .skip(offset)
        .take(limit)
        .orderBy('chapter.createdAt', 'DESC')
        .getManyAndCount();

      const paginatedData = new PaginatedData<ChapterDto>();
      paginatedData.data = chapters.map((chapter) => {
        return new ChapterDto(chapter);
      });
      paginatedData.page = Number(page || 1);
      paginatedData.perPage = Number(limit);
      paginatedData.total = count;
      paginatedData.totalPages = Math.ceil(count / limit);
      return paginatedData;
    } catch (e) {
      this.logger.error(`Unable to fetch chapters: ${e.message}`);
      throw new InternalServerErrorException('Unable to fetch chapters');
    }
  }

  async enrollCourse(userId: string, courseId: string): Promise<void> {
    const course = await this.courseRepository.findOne({
      where: { id: courseId },
    });
    if (!course) {
      throw new NotFoundException('Course not found');
    }
    const userCourse = await this.userCourseRepository.findOne({
      where: { userId, courseId },
    });
    if (userCourse) {
      throw new BadRequestException('User already enrolled in this course');
    }
    try {
      await this.userCourseRepository.enrollCourse(userId, courseId);
    } catch (e) {
      this.logger.error(`Unable to enroll user in course: ${e.message}`);
      throw new InternalServerErrorException('Unable to enroll user in course');
    }
  }

  // async listCourseLessons(courseId: string): Promise<LessonDto> {}
  //
  // listChapterLessons(chapterId: string): Promise<PaginatedData<LessonDto>> {}
  //
  // async getLesson(lessonId: string): Promise<LessonDto> {}
  //
  // async getCourseProgress(
  //   userId: string,
  //   courseId: string,
  // ): Promise<CourseProgressDto> {}
  //
  // async markLessonAsComplete(userId: string, lessonId: string): Promise<void> {}
  //
  // async markLessonAsComplete(userId: string, lessonId: string): Promise<void> {}
  //
  // async addNoteToLesson(
  //   userId: string,
  //   lessonId: string,
  //   note: string,
  // ): Promise<void> {}
  //
  // async updateLessonProgress(
  //   userId: string,
  //   lessonId: string,
  //   progress: number,
  // ): Promise<void> {}
  //
  // async listLessonQuizzes(lessonId: string): Promise<PaginatedData<QuizDto>> {}
  //
  // async addLessonQuiz(
  //   lessonId: string,
  //   quiz: CreateQuizDto,
  // ): Promise<QuizDto> {}
}
