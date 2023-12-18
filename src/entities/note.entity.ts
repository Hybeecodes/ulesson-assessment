import { BaseEntity } from './base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Lesson } from './lesson.entity';
import { User } from './user.entity';

@Entity()
export class Note extends BaseEntity {
  @Column('text', { nullable: false })
  content: string;

  @Column('varchar', { nullable: false, length: 255 })
  timestampInSeconds: string;

  @ManyToOne(() => Lesson, (lesson) => lesson.notes)
  lesson: Lesson;

  @ManyToOne(() => User)
  user: User;
}
