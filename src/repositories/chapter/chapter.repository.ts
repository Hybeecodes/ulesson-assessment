import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Chapter } from '../../entities/chapter.entity';
import { IChapterRepository } from './chapter.repository.interface';

@Injectable()
export class ChapterRepository
  extends Repository<Chapter>
  implements IChapterRepository
{
  constructor(private readonly dataSource: DataSource) {
    super(Chapter, dataSource.createEntityManager());
  }
}
