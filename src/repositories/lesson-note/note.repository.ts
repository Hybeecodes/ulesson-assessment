import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Note } from '../../entities/note.entity';
import { INoteRepository } from './note.repository.interface';

@Injectable()
export class NoteRepository
  extends Repository<Note>
  implements INoteRepository
{
  constructor(private readonly dataSource: DataSource) {
    super(Note, dataSource.createEntityManager());
  }
}
