import { Repository } from 'typeorm';
import { UserLesson } from '../../entities/user-lesson.entity';

export type IUserLessonRepository = Repository<UserLesson>;
