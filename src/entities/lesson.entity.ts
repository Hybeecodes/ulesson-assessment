import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Note } from './note.entity';
import { LessonQuiz } from './lesson-quiz.entity';
import { LessonGroup } from './lesson-group.entity';

@Entity()
export class Lesson extends BaseEntity {
  @Column('varchar', { nullable: false, length: 255 })
  name: string;

  @Column('varchar', { nullable: true, length: 255 })
  description: string;

  @Column('varchar', { nullable: true, length: 255 })
  image_url: string;

  @Column('varchar', { nullable: false, length: 255 })
  video_url: string;

  @OneToMany(() => Note, (note) => note.lesson)
  notes: Note[];

  @OneToMany(() => LessonQuiz, (lessonQuiz) => lessonQuiz.lesson)
  quizzes: LessonQuiz[];

  @ManyToOne(() => LessonGroup, (lessonGroup) => lessonGroup.lessons)
  group: LessonGroup;
}
