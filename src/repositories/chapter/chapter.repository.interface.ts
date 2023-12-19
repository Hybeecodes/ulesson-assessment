import { Repository } from 'typeorm';
import { Chapter } from '../../entities/chapter.entity';

export type IChapterRepository = Repository<Chapter>;
