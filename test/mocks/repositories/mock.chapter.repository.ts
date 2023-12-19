import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Chapter } from '../../../src/entities/chapter.entity';
import { IChapterRepository } from '../../../src/repositories/chapter/chapter.repository.interface';

@Injectable()
export class MockChapterRepository
  extends Repository<Chapter>
  implements IChapterRepository {}
