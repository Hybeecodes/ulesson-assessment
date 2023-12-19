import { BaseEntity } from './base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Lesson } from './lesson.entity';
import { User } from './user.entity';

@Entity()
export class Note extends BaseEntity {
  @Column('text', { nullable: false })
  content: string;

  @Column('varchar', { nullable: false, length: 255 })
  timestampInSeconds: string;

  @ManyToOne(() => Lesson, (lesson) => lesson.notes)
  @JoinColumn({ name: 'lesson_id' })
  lesson: Lesson;

  @Column({ name: 'lesson_id' })
  lessonId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'user_id' })
  userId: string;
}
