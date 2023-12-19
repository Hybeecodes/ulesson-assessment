import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { ServiceResponse } from '../utils/responses/service-response';
import { UserAuthGuard } from '../utils/guards/user-auth.guard';
import { ListCoursesQueryDto } from './dtos/list-courses-query.dto';
import { ListChaptersQueryDto } from './dtos/list-chapters-query.dto';
import { LoggedInUser } from '../utils/decorators/logged-in-user.decorator';

@Controller('courses')
@UseGuards(UserAuthGuard)
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @Get()
  async listAllCourses(
    @Query() query: ListCoursesQueryDto,
  ): Promise<ServiceResponse> {
    const courses = await this.lessonService.listAllCourses(query);
    return ServiceResponse.success('Courses fetched successfully', courses);
  }

  @Get(':courseId/chapters')
  async listCourseChapters(
    @Query() query: ListChaptersQueryDto,
    @Param('courseId') courseId: string,
  ): Promise<ServiceResponse> {
    const chapters = await this.lessonService.listCourseChapters(
      courseId,
      query,
    );
    return ServiceResponse.success(
      'Course chapters fetched successfully',
      chapters,
    );
  }

  //enroll in a course
  @Get(':courseId/enroll')
  async enrollInCourse(
    @Param('courseId') courseId: string,
    @LoggedInUser('id') userId: string,
  ): Promise<ServiceResponse> {
    await this.lessonService.enrollInCourse(userId, courseId);
    return ServiceResponse.success('Course enrollment successful');
  }

  //list enrolled courses
  @Get('enrolled')
  async listEnrolledCourses(
    @LoggedInUser('id') userId: string,
    @Query() query: ListCoursesQueryDto,
  ): Promise<ServiceResponse> {
    const courses = await this.lessonService.listEnrolledCourses(userId, query);
    return ServiceResponse.success(
      'Enrolled courses fetched successfully',
      courses,
    );
  }
}
