import { BaseEntity } from './base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Chapter } from './chapter.entity';

@Entity()
export class Course extends BaseEntity {
  @Column('varchar', { nullable: false, length: 255 })
  title: string;

  @Column('varchar', { nullable: true, length: 255 })
  description: string;

  @Column('varchar', { nullable: true, length: 255 })
  imageUrl: string;

  @OneToMany(() => Chapter, (chapter) => chapter.course)
  chapters: Chapter[];

  lessonsCount: number; // not an actual column in the database
}
