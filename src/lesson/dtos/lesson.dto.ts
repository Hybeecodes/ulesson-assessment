import { Chapter } from '../../entities/chapter.entity';
import { Lesson } from '../../entities/lesson.entity';
import { Note } from '../../entities/note.entity';

export class NoteDto {
  id: string;
  content: string;
  timestampInSeconds: string;
  userId: string;

  constructor(note: Note) {
    this.id = note.id;
    this.content = note.content;
    this.timestampInSeconds = note.timestampInSeconds;
    this.userId = note.userId;
  }
}
export class LessonDto {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  videoUrl: string;
  notes: NoteDto[]; // we can consider paginating this

  constructor(lesson: Lesson) {
    this.id = lesson.id;
    this.title = lesson.name;
    this.description = lesson.description;
    this.imageUrl = lesson.imageUrl;
    this.videoUrl = lesson.videoUrl;
    this.notes = lesson.notes.map((note) => new NoteDto(note));
  }
}
