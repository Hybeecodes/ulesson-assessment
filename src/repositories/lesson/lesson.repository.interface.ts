import { Repository } from 'typeorm';
import { Lesson } from '../../entities/lesson.entity';

export type ILessonRepository = Repository<Lesson>;
