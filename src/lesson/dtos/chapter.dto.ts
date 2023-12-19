import { Chapter } from '../../entities/chapter.entity';

export class ChapterDto {
  id: string;
  title: string;
  description: string;
  imageUrl: string;

  constructor(chapter: Chapter) {
    this.id = chapter.id;
    this.title = chapter.title;
    this.description = chapter.description;
    this.imageUrl = chapter.imageUrl;
  }
}
