import { BaseEntity } from './base.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Lesson } from './lesson.entity';
import { Chapter } from './chapter.entity';

@Entity()
export class LessonGroup extends BaseEntity {
  @Column('varchar', { nullable: false, length: 255 })
  name: string;

  @Column('varchar', { nullable: true, length: 255 })
  description: string;

  @Column('varchar', { nullable: true, length: 255 })
  image_url: string;

  @OneToMany(() => Lesson, (lesson) => lesson.group)
  lessons: Lesson[];

  @ManyToOne(() => Chapter, (chapter) => chapter.groups)
  @JoinColumn({ name: 'chapter_id' })
  chapter: Chapter;
}
