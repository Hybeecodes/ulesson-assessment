import { Repository } from 'typeorm';
import { Note } from '../../entities/note.entity';

export type INoteRepository = Repository<Note>;
